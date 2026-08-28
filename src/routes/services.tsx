import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { KathaBookingCta } from "@/components/sections/KathaBookingCta";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "हमारी सेवाएँ — DPS DARSHAN लाइव प्रसारण एवं रिकॉर्डिंग" },
      {
        name: "description",
        content:
          "लाइव प्रसारण, HD वीडियो रिकॉर्डिंग, ड्रोन कवरेज, साउंड-लाइट, सोशल मीडिया प्रमोशन एवं धार्मिक आयोजनों की सम्पूर्ण मीडिया सेवाएँ।",
      },
      { property: "og:title", content: "हमारी सेवाएँ — DPS DARSHAN" },
      {
        property: "og:description",
        content: "धार्मिक आयोजनों के लिए प्रीमियम डिजिटल मीडिया सेवाएँ।",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <Services />
      <About />
      <KathaBookingCta />
    </SiteLayout>
  );
}
