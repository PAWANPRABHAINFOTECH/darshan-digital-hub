import { galleryItems } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { EmptyState, SectionHeading } from "@/components/layout/SiteLayout";

export function Gallery({ limit = 8 }: { limit?: number }) {
  const { t } = useI18n();
  const items = galleryItems.slice(0, limit);

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Gallery" title={t("gallery.title")} />
        {items.length === 0 ? (
          <EmptyState text={t("gallery.empty")} />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <figure
                key={item.id}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
              >
                <div className="aspect-video w-full bg-surface">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.caption}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}
                </div>
                <figcaption className="p-3 text-xs text-muted-foreground">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
