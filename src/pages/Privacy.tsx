import { useTranslation } from "react-i18next";
import { PageShell } from "@/components/layout/PageShell";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <PageShell title={t("footer.privacyPolicy")}>
      <p className="text-muted-foreground">{t("common.comingSoon")}</p>
    </PageShell>
  );
}
