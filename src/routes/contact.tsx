import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ContactSection } from "@/components/sections/ContactSection";
import { SocialLinks } from "@/components/sections/SocialLinks";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "संपर्क करें — DPS DARSHAN | 9755864233" },
      {
        name: "description",
        content:
          "DPS DARSHAN से कथा बुकिंग, लाइव प्रसारण एवं रिकॉर्डिंग सेवाओं हेतु संपर्क करें — कॉल, WhatsApp या संपर्क फॉर्म द्वारा।",
      },
      { property: "og:title", content: "संपर्क करें — DPS DARSHAN" },
      { property: "og:description", content: "कॉल, WhatsApp या फॉर्म द्वारा हमसे जुड़ें।" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <ContactSection />
      <SocialLinks />
    </SiteLayout>
  );
}
