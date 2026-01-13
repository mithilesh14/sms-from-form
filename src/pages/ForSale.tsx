import { useTranslation } from "react-i18next";
import { PageShell } from "@/components/layout/PageShell";

export default function ForSale() {
  const { t } = useTranslation();

  return (
    <PageShell title={t("nav.forSale")}>
      <p className="text-muted-foreground">{t("common.comingSoon")}</p>
    </PageShell>
  );
}
