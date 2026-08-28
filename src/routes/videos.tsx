import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { FeaturedVideos } from "@/components/sections/FeaturedVideos";
import { SocialLinks } from "@/components/sections/SocialLinks";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "वीडियो — DPS DARSHAN कथा एवं भजन संग्रह" },
      {
        name: "description",
        content:
          "DPS DARSHAN के चुनिंदा वीडियो — श्रीराम कथा, भागवत कथा, भजन एवं धार्मिक आयोजनों की HD रिकॉर्डिंग।",
      },
      { property: "og:title", content: "वीडियो संग्रह — DPS DARSHAN" },
      { property: "og:description", content: "कथा, भजन एवं सत्संग के चुनिंदा वीडियो देखें।" },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  return (
    <SiteLayout>
      <FeaturedVideos limit={24} />
      <SocialLinks />
    </SiteLayout>
  );
}
