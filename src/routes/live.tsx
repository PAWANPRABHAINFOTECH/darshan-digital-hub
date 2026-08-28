import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { LiveDarshan } from "@/components/sections/LiveDarshan";
import { SocialLinks } from "@/components/sections/SocialLinks";
import { FeaturedVideos } from "@/components/sections/FeaturedVideos";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "लाइव दर्शन — DPS DARSHAN Live Katha & Bhajan" },
      {
        name: "description",
        content:
          "DPS DARSHAN का लाइव प्रसारण — YouTube Live एवं Facebook Live पर श्रीराम कथा, भागवत कथा एवं भजन संध्या के सीधे दर्शन।",
      },
      { property: "og:title", content: "लाइव दर्शन — DPS DARSHAN" },
      {
        property: "og:description",
        content: "कथा, भजन एवं धार्मिक कार्यक्रमों का सीधा प्रसारण देखें।",
      },
    ],
  }),
  component: LivePage,
});

function LivePage() {
  return (
    <SiteLayout>
      <LiveDarshan />
      <SocialLinks />
      <FeaturedVideos limit={8} />
    </SiteLayout>
  );
}
