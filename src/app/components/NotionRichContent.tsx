import type { ReactNode } from "react";
import Image from "next/image";
import type { BlogBlock, RichTextSpan } from "@/lib/notion";

function RichText({ spans }: { spans: RichTextSpan[] }) {
  return (
    <>
      {spans.map((span, index) => {
        let node: ReactNode = span.href ? (
          <a
            href={span.href}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {span.text}
          </a>
        ) : (
          span.text
        );

        if (span.code) {
          node = (
            <code className="rounded bg-secondary/60 px-1.5 py-0.5 text-[0.9em] text-foreground">
              {node}
            </code>
          );
        }
        if (span.bold) node = <strong>{node}</strong>;
        if (span.italic) node = <em>{node}</em>;
        if (span.underline) node = <span className="underline underline-offset-4">{node}</span>;
        if (span.strikethrough) node = <span className="line-through">{node}</span>;

        return <span key={`${span.text}-${index}`}>{node}</span>;
      })}
    </>
  );
}

function MediaLinkCard({
  href,
  title,
  caption,
}: {
  href: string;
  title: string;
  caption?: string;
}) {
  return (
    <div className="border border-border bg-secondary/20 p-5 sm:p-6">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex text-sm tracking-[0.16em] text-accent transition-colors hover:text-foreground"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {title}
      </a>
      {caption ? (
        <p
          className="mt-3 text-sm leading-7 text-muted-foreground"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function renderBlock(block: BlogBlock, titleFallback: string) {
  if (block.type === "image" && block.image) {
    return (
      <figure key={block.id} className="space-y-3">
        <div className="overflow-hidden border border-border bg-secondary/20">
          <Image
            src={block.image}
            alt={block.caption || titleFallback}
            width={1400}
            height={900}
            sizes="(max-width: 1024px) 100vw, 896px"
            className="h-auto w-full object-cover"
          />
        </div>
        {block.caption ? (
          <figcaption
            className="text-xs leading-6 text-muted-foreground sm:text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (block.type === "heading_1") {
    return (
      <h2
        key={block.id}
        className="text-3xl tracking-[0.02em] sm:text-4xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        <RichText spans={block.content} />
      </h2>
    );
  }

  if (block.type === "heading_2") {
    return (
      <h3
        key={block.id}
        className="text-2xl tracking-[0.02em] sm:text-3xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        <RichText spans={block.content} />
      </h3>
    );
  }

  if (block.type === "heading_3") {
    return (
      <h4
        key={block.id}
        className="text-xl tracking-[0.02em] sm:text-2xl"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        <RichText spans={block.content} />
      </h4>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        key={block.id}
        className="border-l border-accent/40 pl-6 text-lg italic leading-8 text-foreground/85"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        <RichText spans={block.content} />
      </blockquote>
    );
  }

  if (block.type === "divider") {
    return <hr key={block.id} className="border-border" />;
  }

  if (block.type === "callout") {
    return (
      <div key={block.id} className="flex gap-4 border border-border bg-secondary/20 p-5 sm:p-6">
        <span className="mt-0.5 text-xl">{block.icon || "•"}</span>
        <p
          className="text-sm leading-8 text-muted-foreground sm:text-base"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <RichText spans={block.content} />
        </p>
      </div>
    );
  }

  if (block.type === "code") {
    return (
      <div key={block.id} className="space-y-2">
        {block.language ? (
          <p
            className="text-[11px] uppercase tracking-[0.22em] text-accent"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {block.language}
          </p>
        ) : null}
        <pre className="overflow-x-auto border border-border bg-secondary/30 p-5 text-sm leading-7 text-foreground">
          <code>{block.content.map((span) => span.text).join("")}</code>
        </pre>
      </div>
    );
  }

  if (block.type === "table" && block.table) {
    return (
      <div key={block.id} className="overflow-x-auto border border-border bg-secondary/10">
        <table className="min-w-full border-collapse">
          <tbody>
            {block.table.rows.map((row, rowIndex) => {
              const isHeaderRow = block.table?.hasColumnHeader && rowIndex === 0;

              return (
                <tr key={`${block.id}-row-${rowIndex}`} className="border-b border-border last:border-b-0">
                  {row.map((cell, cellIndex) => {
                    const isRowHeader =
                      block.table?.hasRowHeader && cellIndex === 0 && !isHeaderRow;
                    const Tag = isHeaderRow || isRowHeader ? "th" : "td";

                    return (
                      <Tag
                        key={`${block.id}-cell-${rowIndex}-${cellIndex}`}
                        className="border-r border-border px-4 py-3 text-left align-top last:border-r-0"
                        style={{
                          fontFamily:
                            isHeaderRow || isRowHeader ? "'Instrument Serif', serif" : "'Inter', sans-serif",
                        }}
                      >
                        <span
                          className={
                            isHeaderRow || isRowHeader
                              ? "text-base text-foreground sm:text-lg"
                              : "text-sm leading-7 text-muted-foreground sm:text-base"
                          }
                        >
                          <RichText spans={cell} />
                        </span>
                      </Tag>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  if (block.type === "bookmark" && block.url) {
    return <MediaLinkCard key={block.id} href={block.url} title="Open bookmark" />;
  }

  if (block.type === "embed" && block.url) {
    return <MediaLinkCard key={block.id} href={block.url} title="Open embedded content" />;
  }

  if ((block.type === "video" || block.type === "file" || block.type === "pdf") && block.url) {
    const title =
      block.type === "video" ? "Open video" : block.type === "pdf" ? "Open PDF" : "Open file";
    return <MediaLinkCard key={block.id} href={block.url} title={title} caption={block.caption} />;
  }

  return (
    <p
      key={block.id}
      className="text-sm leading-8 text-muted-foreground sm:text-base"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <RichText spans={block.content} />
    </p>
  );
}

export function getBlocksPlainText(blocks: BlogBlock[]): string {
  return blocks
    .flatMap((block) => {
      if (block.type === "image" || block.type === "divider") return [];
      if (block.type === "table" && block.table) {
        return block.table.rows.flatMap((row) =>
          row.flatMap((cell) => cell.map((span) => span.text).join(""))
        );
      }
      return [block.content.map((span) => span.text).join("")];
    })
    .map((text) => text.trim())
    .filter(Boolean)
    .join(" ");
}

export function NotionRichContent({
  blocks,
  titleFallback,
}: {
  blocks: BlogBlock[];
  titleFallback: string;
}) {
  if (!blocks.length) return null;

  const elements: ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (block.type === "bullet" || block.type === "numbered") {
      const items: BlogBlock[] = [];
      const listType = block.type;

      while (index < blocks.length && blocks[index].type === listType) {
        items.push(blocks[index]);
        index += 1;
      }

      index -= 1;

      if (listType === "bullet") {
        elements.push(
          <ul key={block.id} className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-3 text-sm leading-8 text-muted-foreground sm:text-base"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>
                  <RichText spans={item.content} />
                </span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      elements.push(
        <ol
          key={block.id}
          className="space-y-3 pl-5 text-sm leading-8 text-muted-foreground sm:text-base"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {items.map((item) => (
            <li key={item.id}>
              <RichText spans={item.content} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    elements.push(renderBlock(block, titleFallback));
  }

  return <div className="space-y-8">{elements}</div>;
}
