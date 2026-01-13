import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <PageShell title={t("nav.contact")}>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="luxury-card p-6">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Mail className="h-5 w-5" />
            <h2 className="font-medium">{t("contact.emailUs")}</h2>
          </div>
          <a className="text-muted-foreground hover:underline" href="mailto:info@luxeresidences.com">
            info@luxeresidences.com
          </a>
        </div>

        <div className="luxury-card p-6">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Phone className="h-5 w-5" />
            <h2 className="font-medium">{t("contact.callUs")}</h2>
          </div>
          <a className="text-muted-foreground hover:underline" href="tel:+1234567890">
            +1 (234) 567-890
          </a>
        </div>

        <div className="luxury-card p-6">
          <div className="flex items-center gap-2 text-primary mb-3">
            <MapPin className="h-5 w-5" />
            <h2 className="font-medium">{t("contact.address")}</h2>
          </div>
          <p className="text-muted-foreground">
            123 Luxury Avenue
            <br />
            City, State 12345
          </p>
        </div>
      </div>
    </PageShell>
  );
}
