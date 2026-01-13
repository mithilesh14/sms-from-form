import { useTranslation } from "react-i18next";
import { PageShell } from "@/components/layout/PageShell";

export default function ShortTerm() {
  const { t } = useTranslation();
  return (
    <PageShell title={t("nav.shortTerm")}>
      <p className="text-muted-foreground">{t("common.comingSoon")}</p>
    </PageShell>
  );
}
