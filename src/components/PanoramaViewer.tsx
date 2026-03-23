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
  const previousMouse = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ lon: 0, lat: 0 });
  const targetFov = useRef(75);

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
      e.preventDefault();
      targetFov.current = THREE.MathUtils.clamp(
        targetFov.current + e.deltaY * 0.05, 30, 100
      );
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      e.preventDefault();
      const dx = e.touches[0].clientX - previousMouse.current.x;
      const dy = e.touches[0].clientY - previousMouse.current.y;
      rotationRef.current.lon -= dx * 0.2;
      rotationRef.current.lat = THREE.MathUtils.clamp(
        rotationRef.current.lat + dy * 0.2, -85, 85
      );
      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => { isDragging.current = false; };

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
}

export function PanoramaViewer({ images }: PanoramaViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-secondary overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-secondary">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border border-accent/30 border-t-accent rounded-full animate-spin" />
            <p className="text-muted-foreground text-caption">Loading panorama…</p>
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

      {/* Controls overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 glass-panel px-5 py-2.5">
        <Move className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-muted-foreground text-caption hidden sm:inline">Drag to look around</span>
      </div>

      {/* Scene selector */}
      {images.length > 1 && (
        <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 flex-wrap justify-center max-w-[90%]">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setIsLoading(true); setActiveIndex(i); }}
              className={`px-5 py-2.5 text-caption transition-all min-h-[40px] ${
                i === activeIndex
                  ? "bg-accent text-accent-foreground"
                  : "glass-panel text-foreground/60 hover:text-foreground"
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
