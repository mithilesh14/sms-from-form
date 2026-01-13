import { useTranslation } from "react-i18next";
import { PageShell } from "@/components/layout/PageShell";

const images = [
  {
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&auto=format&fit=crop&q=80",
    alt: "Sunlit living room with modern finishes",
  },
  {
    src: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=1200&auto=format&fit=crop&q=80",
    alt: "Luxury bedroom with neutral palette",
  },
  {
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop&q=80",
    alt: "Designer kitchen with marble countertop",
  },
  {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop&q=80",
    alt: "Elegant bathroom with premium fixtures",
  },
  {
    src: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=80",
    alt: "Cozy reading corner with city view",
  },
  {
    src: "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1200&auto=format&fit=crop&q=80",
    alt: "Contemporary dining area with warm lighting",
  },
];

export default function Gallery() {
  const { t } = useTranslation();

  return (
    <PageShell title={t("nav.gallery")}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img) => (
          <div key={img.src} className="luxury-card overflow-hidden">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        ))}
      </div>
    </PageShell>
  );
}
