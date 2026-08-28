import type { ReactNode } from "react";
import { TopStrip } from "./TopStrip";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BrandBar, FloatingActions, MobileBottomNav } from "./FloatingActions";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopStrip />
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <BrandBar />
      <Footer />
      <FloatingActions />
      <MobileBottomNav />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 text-center">
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.25em] text-saffron uppercase">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl">
        <span className="gold-text">{title}</span>
      </h2>
      {description && (
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">{description}</p>
      )}
      <span className="mx-auto mt-4 block h-px w-24 gold-gradient" aria-hidden />
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface/60 p-10 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}
