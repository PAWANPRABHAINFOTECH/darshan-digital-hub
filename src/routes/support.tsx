import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Support } from "@/components/sections/Support";
import { About } from "@/components/sections/About";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "सहयोग करें — DPS DARSHAN सेवा में योगदान" },
      {
        name: "description",
        content:
          "DPS DARSHAN की भक्ति सेवा एवं निःशुल्क लाइव प्रसारण को जारी रखने में UPI या बैंक ट्रांसफर द्वारा सहयोग करें।",
      },
      { property: "og:title", content: "सहयोग करें — DPS DARSHAN" },
      { property: "og:description", content: "भक्ति प्रसारण सेवा में अपना योगदान दें।" },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <SiteLayout>
      <Support />
      <About />
    </SiteLayout>
  );
}
