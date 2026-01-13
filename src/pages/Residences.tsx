import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";

export default function Residences() {
  const { t } = useTranslation();

  const cards = [
    {
      title: t("nav.shortTerm"),
      description: t("properties.subtitle"),
      href: "/short-term",
    },
    {
      title: t("nav.longTerm"),
      description: t("properties.subtitle"),
      href: "/long-term",
    },
    {
      title: t("nav.forSale"),
      description: t("properties.subtitle"),
      href: "/for-sale",
    },
  ];

  return (
    <PageShell title={t("nav.residences")}>
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} to={c.href} className="group">
            <div className="luxury-card p-6 h-full">
              <h2 className="font-serif text-2xl text-primary mb-2">{c.title}</h2>
              <p className="text-muted-foreground mb-4">{c.description}</p>
              <span className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors">
                {t("properties.viewDetails")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
