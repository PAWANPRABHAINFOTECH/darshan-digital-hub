import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { AdsAndPrograms } from "@/components/sections/AdsAndPrograms";
import { KathaBookingCta } from "@/components/sections/KathaBookingCta";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "आगामी कार्यक्रम — DPS DARSHAN" },
      {
        name: "description",
        content:
          "DPS DARSHAN के आगामी श्रीराम कथा, भागवत कथा, भजन संध्या एवं धार्मिक आयोजनों की तिथि, समय एवं स्थान की जानकारी।",
      },
      { property: "og:title", content: "आगामी कार्यक्रम — DPS DARSHAN" },
      {
        property: "og:description",
        content: "आने वाली कथाओं एवं धार्मिक आयोजनों की पूरी सूची देखें।",
      },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  return (
    <SiteLayout>
      <AdsAndPrograms />
      <KathaBookingCta />
    </SiteLayout>
  );
}
