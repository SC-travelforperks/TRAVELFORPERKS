"use client";
import { InternalPageShell } from "@/app/components/InternalPageShell";

type ContentSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

function renderInlineLink(text: string) {
  const separatorIndex = text.indexOf(": ");
  if (separatorIndex === -1) return text;

  const label = text.slice(0, separatorIndex + 2);
  const value = text.slice(separatorIndex + 2).trim();

  if (/^https?:\/\//i.test(value)) {
    return (
      <>
        {label}
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 transition-colors hover:text-accent"
        >
          {value}
        </a>
      </>
    );
  }

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return (
      <>
        {label}
        <a
          href={`mailto:${value}`}
          className="underline underline-offset-4 transition-colors hover:text-accent"
        >
          {value}
        </a>
      </>
    );
  }

  return text;
}

export function ContentPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro?: string;
  sections: ContentSection[];
}) {
  return (
    <InternalPageShell>
      <main className="min-h-screen bg-background pb-20 sm:pb-24">
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-3xl">
              <h1
                className="mb-6 text-4xl tracking-[0.01em] sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {title}
              </h1>
              {intro && (
                <p
                  className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {intro}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <section key={`${section.heading ?? "section"}-${index}`} className="space-y-4">
                {section.heading && (
                  <h2
                    className="text-2xl tracking-[0.01em] text-primary sm:text-3xl"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="text-sm leading-7 text-muted-foreground sm:text-base"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-3">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex gap-3 text-sm leading-7 text-muted-foreground sm:text-base"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <span className="mt-3 h-px w-4 flex-shrink-0 bg-accent" />
                        <span>{renderInlineLink(bullet)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </section>
      </main>
    </InternalPageShell>
  );
}
