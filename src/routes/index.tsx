import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { LiveDarshan } from "@/components/sections/LiveDarshan";
import { SocialLinks } from "@/components/sections/SocialLinks";
import { AdsAndPrograms } from "@/components/sections/AdsAndPrograms";
import { FeaturedVideos } from "@/components/sections/FeaturedVideos";
import { Gallery } from "@/components/sections/Gallery";
import { Services } from "@/components/sections/Services";
import { KathaBookingCta } from "@/components/sections/KathaBookingCta";
import { About } from "@/components/sections/About";
import { Support } from "@/components/sections/Support";
import { ContactSection } from "@/components/sections/ContactSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DPS DARSHAN — संतों का संग • सत्संग का प्रसंग • भक्ति का प्रसारण" },
      {
        name: "description",
        content:
          "DPS DARSHAN पर श्रीराम कथा, भागवत कथा, भजन संध्या एवं धार्मिक आयोजनों का लाइव दर्शन, HD रिकॉर्डिंग और कथा बुकिंग सुविधा।",
      },
      { property: "og:title", content: "DPS DARSHAN — भक्ति का प्रसारण" },
      {
        property: "og:description",
        content: "लाइव दर्शन, कथा बुकिंग, भजन एवं धार्मिक कार्यक्रमों का प्रीमियम डिजिटल प्रसारण।",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <LiveDarshan />
      <SocialLinks />
      <AdsAndPrograms />
      <FeaturedVideos limit={8} />
      <Gallery limit={8} />
      <Services />
      <KathaBookingCta />
      <About />
      <Support />
      <ContactSection />
    </SiteLayout>
  );
}
