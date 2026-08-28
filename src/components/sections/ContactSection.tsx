import { useState } from "react";
import { MessageCircle, Phone, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { siteConfig, telHref, waHref } from "@/config/site";
import { useI18n } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/layout/SiteLayout";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/),
  email: z.string().trim().email().max(255).or(z.literal("")),
  message: z.string().trim().min(1).max(1000),
});

export function ContactSection() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        next[key] =
          key === "mobile"
            ? t("common.invalidMobile")
            : key === "email"
              ? t("common.invalidEmail")
              : t("common.required");
      }
      setErrors(next);
      return;
    }
    setErrors({});
    toast.success(t("contact.sent"));
    setForm({ name: "", mobile: "", email: "", message: "" });
  };

  const field = (
    key: keyof typeof form,
    label: string,
    type = "text",
    textarea = false,
  ) => (
    <div className={textarea ? "sm:col-span-2" : ""}>
      <label htmlFor={`c-${key}`} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={`c-${key}`}
          rows={4}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          aria-invalid={!!errors[key]}
          className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />
      ) : (
        <input
          id={`c-${key}`}
          type={type}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          aria-invalid={!!errors[key]}
          className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />
      )}
      {errors[key] && <p className="mt-1 text-xs text-destructive">{errors[key]}</p>}
    </div>
  );

  return (
    <section className="section-pad bg-surface" id="contact">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading eyebrow="Contact" title={t("contact.title")} />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <ul className="space-y-2">
              {[siteConfig.phone1, siteConfig.phone2].map((p) => (
                <li key={p}>
                  <a
                    href={telHref(p)}
                    className="inline-flex items-center gap-2 font-display text-xl gold-text"
                  >
                    {p}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={telHref(siteConfig.phone1)}
                className="inline-flex items-center gap-2 rounded-full brand-gradient px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                <Phone className="size-4" aria-hidden /> {t("contact.callNow")}
              </a>
              <a
                href={waHref(siteConfig.whatsapp)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-success px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                <MessageCircle className="size-4" aria-hidden /> {t("contact.whatsapp")}
              </a>
            </div>
          </div>

          <form
            onSubmit={submit}
            noValidate
            className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft sm:grid-cols-2"
          >
            {field("name", t("contact.formName"))}
            {field("mobile", t("contact.formMobile"), "tel")}
            {field("email", t("contact.formEmail"), "email")}
            <div className="hidden sm:block" />
            {field("message", t("contact.formMessage"), "text", true)}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-bold text-primary-foreground sm:col-span-2"
            >
              <Send className="size-4" aria-hidden /> {t("contact.send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
