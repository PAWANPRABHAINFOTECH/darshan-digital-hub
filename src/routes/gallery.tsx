import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Gallery } from "@/components/sections/Gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "गैलरी — DPS DARSHAN धार्मिक आयोजन तस्वीरें" },
      {
        name: "description",
        content:
          "DPS DARSHAN द्वारा कवर किए गए कथा, भजन संध्या एवं धार्मिक आयोजनों की चुनिंदा तस्वीरें एवं झलकियाँ।",
      },
      { property: "og:title", content: "गैलरी — DPS DARSHAN" },
      { property: "og:description", content: "धार्मिक आयोजनों की झलकियाँ देखें।" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <SiteLayout>
      <Gallery limit={36} />
    </SiteLayout>
  );
}
