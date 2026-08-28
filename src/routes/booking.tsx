import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, SectionHeading } from "@/components/layout/SiteLayout";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "कथा बुकिंग — DPS DARSHAN | Book Katha & Bhajan" },
      {
        name: "description",
        content:
          "श्रीराम कथा, श्रीमद्भागवत कथा, भजन संध्या एवं धार्मिक आयोजनों की ऑनलाइन बुकिंग — विवरण भरें, भुगतान विकल्प चुनें और पुष्टि प्राप्त करें।",
      },
      { property: "og:title", content: "कथा बुकिंग — DPS DARSHAN" },
      {
        property: "og:description",
        content: "कथा एवं धार्मिक कार्यक्रम की ऑनलाइन बुकिंग करें।",
      },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const { bt } = useI18n();
  return (
    <SiteLayout>
      <section className="py-12 md:py-16">
        <SectionHeading
          eyebrow="Booking"
          title={bt("booking.ctaTitle")}
          description={bt("booking.ctaText")}
        />
        <BookingWizard />
        <div className="mt-6 text-center text-sm">
          <Link to="/status" className="font-semibold text-primary hover:underline dark:text-gold">
            {bt("status.title")} →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
