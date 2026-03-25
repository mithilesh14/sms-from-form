import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Move } from "lucide-react";

function PanoramaSphere({ url }: { url: string }) {
  const texture = useTexture(url);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 64, 32]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

function CameraControls() {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const isPinching = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ lon: 0, lat: 0 });
  const targetFov = useRef(75);
  const lastPinchDist = useRef(0);
  const touchIntent = useRef<'undecided' | 'pan' | 'scroll'>('undecided');

  useFrame(() => {
    const { lon, lat } = rotationRef.current;
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);

    const target = new THREE.Vector3(
      500 * Math.sin(phi) * Math.cos(theta),
      500 * Math.cos(phi),
      500 * Math.sin(phi) * Math.sin(theta)
    );

    camera.lookAt(target);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, 0.1);
      camera.updateProjectionMatrix();
    }
  });

  useEffect(() => {
    const el = gl.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      previousMouse.current = { x: e.clientX, y: e.clientY };
      el.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - previousMouse.current.x;
      const dy = e.clientY - previousMouse.current.y;
      rotationRef.current.lon -= dx * 0.15;
      rotationRef.current.lat = THREE.MathUtils.clamp(
        rotationRef.current.lat + dy * 0.15, -85, 85
      );
      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging.current = false;
      el.style.cursor = "grab";
    };

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return; // plain scroll passes through to page
      e.preventDefault();
      targetFov.current = THREE.MathUtils.clamp(
        targetFov.current + e.deltaY * 0.05, 30, 100
      );
    };

    const getTouchDist = (t: TouchList) => {
      const dx = t[0].clientX - t[1].clientX;
      const dy = t[0].clientY - t[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        isPinching.current = true;
        isDragging.current = false;
        lastPinchDist.current = getTouchDist(e.touches);
      } else if (e.touches.length === 1) {
        isDragging.current = true;
        isPinching.current = false;
        previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (isPinching.current && e.touches.length === 2) {
        const dist = getTouchDist(e.touches);
        const delta = lastPinchDist.current - dist;
        targetFov.current = THREE.MathUtils.clamp(targetFov.current + delta * 0.15, 30, 100);
        lastPinchDist.current = dist;
        return;
      }
      if (!isDragging.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - previousMouse.current.x;
      const dy = e.touches[0].clientY - previousMouse.current.y;
      rotationRef.current.lon -= dx * 0.2;
      rotationRef.current.lat = THREE.MathUtils.clamp(
        rotationRef.current.lat + dy * 0.2, -85, 85
      );
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => { isDragging.current = false; isPinching.current = false; };

    el.style.cursor = "grab";
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointerleave", onPointerUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointerleave", onPointerUp);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [gl]);

  return null;
}

interface PanoramaViewerProps {
  images: { url: string; label: string }[];
  className?: string;
  showControls?: boolean;
}

export function PanoramaViewer({ images, className = '', showControls = true }: PanoramaViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative w-full h-full min-h-[60dvh] bg-muted overflow-hidden ${className}`}>
      {/* Loading */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
          <div className="flex flex-col items-center gap-3">
            <div className="w-7 h-7 border-2 border-border border-t-foreground rounded-full animate-spin" />
            <p className="text-muted-foreground text-[12px] tracking-[0.1em]">Loading panorama…</p>
          </div>
        </div>
      )}

      <Canvas
        camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 0.1] }}
        onCreated={() => setIsLoading(false)}
        style={{ touchAction: "none" }}
      >
        <PanoramaSphere url={images[activeIndex].url} />
        <CameraControls />
      </Canvas>

      {/* Drag hint — subtle bottom pill */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
        <Move className="w-3.5 h-3.5 text-foreground/40" />
        <span className="text-foreground/50 text-[11px] tracking-[0.05em] hidden sm:inline">Drag to explore</span>
      </div>

      {/* Scene selector — only on dedicated pages, not hero */}
      {showControls && images.length > 1 && (
        <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 flex-wrap justify-center max-w-[90%]">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setIsLoading(true); setActiveIndex(i); }}
              className={`px-5 py-2.5 text-[11px] tracking-[0.1em] uppercase transition-all min-h-[40px] rounded-full ${
                i === activeIndex
                  ? "bg-white text-foreground shadow-md"
                  : "bg-white/60 backdrop-blur-md text-foreground/50 hover:text-foreground hover:bg-white/80"
              }`}
            >
              {img.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
