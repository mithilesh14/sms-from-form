import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";

export default function Rentals() {
  const { t } = useTranslation();

  const options = [
    {
      title: t("nav.shortTerm"),
      href: "/short-term",
    },
    {
      title: t("nav.longTerm"),
      href: "/long-term",
    },
  ];

  return (
    <PageShell title={t("nav.rentals")}>
      <div className="grid gap-6 md:grid-cols-2">
        {options.map((o) => (
          <Link key={o.href} to={o.href} className="group">
            <div className="luxury-card p-6 h-full">
              <h2 className="font-serif text-2xl text-primary mb-2">{o.title}</h2>
              <p className="text-muted-foreground mb-4">{t("common.comingSoon")}</p>
              <span className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors">
                {t("common.learnMore")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
