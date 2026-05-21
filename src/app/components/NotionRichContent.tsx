import type { CSSProperties, ReactNode } from "react";
import type { BlogBlock, RichTextSpan } from "@/lib/notion";
import { isEmbeddableUrl } from "@/lib/embeds";
import { NotionEmbed } from "./NotionEmbed";

const notionColorStyles: Record<string, CSSProperties> = {
  gray: { color: "rgb(120, 119, 116)" },
  brown: { color: "rgb(159, 107, 83)" },
  orange: { color: "rgb(217, 115, 13)" },
  yellow: { color: "rgb(203, 145, 47)" },
  green: { color: "rgb(68, 131, 97)" },
  blue: { color: "rgb(51, 126, 169)" },
  purple: { color: "rgb(144, 101, 176)" },
  pink: { color: "rgb(193, 76, 138)" },
  red: { color: "rgb(212, 76, 71)" },
  gray_background: { backgroundColor: "rgb(241, 241, 239)" },
  brown_background: { backgroundColor: "rgb(244, 238, 238)" },
  orange_background: { backgroundColor: "rgb(251, 236, 221)" },
  yellow_background: { backgroundColor: "rgb(251, 243, 219)" },
  green_background: { backgroundColor: "rgb(237, 243, 236)" },
  blue_background: { backgroundColor: "rgb(231, 243, 248)" },
  purple_background: { backgroundColor: "rgb(244, 240, 247)" },
  pink_background: { backgroundColor: "rgb(249, 238, 243)" },
  red_background: { backgroundColor: "rgb(253, 235, 236)" },
};

function getNotionColorStyle(color?: string): CSSProperties | undefined {
  if (!color || color === "default") return undefined;
  return notionColorStyles[color];
}

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

        return (
          <span key={`${span.text}-${index}`} style={getNotionColorStyle(span.color)}>
            {node}
          </span>
        );
      })}
    </>
  );
}

function MediaLinkCard({
  href,
  title,
  caption,
  captionRichText,
}: {
  href: string;
  title: string;
  caption?: string;
  captionRichText?: RichTextSpan[];
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
      {captionRichText?.length ? (
        <p
          className="mt-3 text-sm leading-7 text-muted-foreground"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <RichText spans={captionRichText} />
        </p>
      ) : caption ? (
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

function isRenderableBlock(block: BlogBlock): boolean {
  if (block.type === "divider") return true;
  if (block.type === "image") return Boolean(block.image);
  if (block.type === "table") return Boolean(block.table?.rows.length);
  if (block.type === "table_of_contents") return true;
  if (block.type === "bookmark" || block.type === "embed") return Boolean(block.url);
  if (block.type === "audio" || block.type === "video" || block.type === "file" || block.type === "pdf") {
    return Boolean(block.url);
  }
  if (block.type === "column_list") {
    return Boolean(block.columns?.some((column) => column.blocks.some(isRenderableBlock)));
  }
  if (block.children?.some(isRenderableBlock)) return true;
  return block.content.length > 0;
}

function getColumnTemplate(columns: NonNullable<BlogBlock["columns"]>): string {
  return columns.map((column) => `${column.widthRatio ?? 1}fr`).join(" ");
}

function isHeadingBlock(block: BlogBlock): boolean {
  return ["heading_1", "heading_2", "heading_3", "heading_4"].includes(block.type);
}

function getHeadingLevel(type: BlogBlock["type"]): number {
  if (type === "heading_1") return 1;
  if (type === "heading_2") return 2;
  if (type === "heading_3") return 3;
  return 4;
}

function collectHeadings(blocks: BlogBlock[]): BlogBlock[] {
  return blocks.flatMap((block) => {
    const nested = [
      ...(block.children ? collectHeadings(block.children) : []),
      ...(block.columns ? block.columns.flatMap((column) => collectHeadings(column.blocks)) : []),
    ];

    return isHeadingBlock(block) ? [block, ...nested] : nested;
  });
}

function rendersChildrenInside(block: BlogBlock): boolean {
  return block.type === "toggle" || block.type === "to_do" || block.type === "synced_block";
}

function renderCaption(block: BlogBlock) {
  if (block.captionRichText?.length) {
    return (
      <figcaption
        className="text-xs leading-6 text-muted-foreground sm:text-sm"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <RichText spans={block.captionRichText} />
      </figcaption>
    );
  }

  if (!block.caption) return null;

  return (
    <figcaption
      className="text-xs leading-6 text-muted-foreground sm:text-sm"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {block.caption}
    </figcaption>
  );
}

function renderBlock(block: BlogBlock, titleFallback: string) {
  if (block.type === "image" && block.image) {
    return (
      <figure key={block.id} className="w-fit max-w-full space-y-3">
        <img
          src={block.image}
          alt={block.caption || titleFallback}
          loading="lazy"
          decoding="async"
          className="block h-auto w-auto max-w-full object-contain"
          style={{
            maxHeight: "min(62vh, 560px)",
          }}
        />
        {renderCaption(block)}
      </figure>
    );
  }

  if (block.type === "column_list" && block.columns?.length) {
    return (
      <div
        key={block.id}
        className="grid grid-cols-1 gap-6 sm:[grid-template-columns:var(--notion-columns)] sm:gap-8"
        style={{ "--notion-columns": getColumnTemplate(block.columns) } as CSSProperties}
      >
        {block.columns.map((column) => {
          const hasContent = column.blocks.some(isRenderableBlock);

          return (
            <div
              key={column.id}
              className={`min-w-0 ${hasContent ? "" : "hidden sm:block"}`}
            >
              {hasContent ? (
                <div className="space-y-7 [overflow-wrap:anywhere] sm:space-y-8">
                  {renderBlocks(column.blocks, titleFallback)}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  if (block.type === "heading_1") {
    return (
      <h2
        id={block.id}
        key={block.id}
        className="text-2xl tracking-[0.02em] sm:text-4xl"
        style={{ fontFamily: "'Instrument Serif', serif", ...getNotionColorStyle(block.color) }}
      >
        <RichText spans={block.content} />
      </h2>
    );
  }

  if (block.type === "heading_2") {
    return (
      <h3
        id={block.id}
        key={block.id}
        className="text-xl tracking-[0.02em] sm:text-3xl"
        style={{ fontFamily: "'Instrument Serif', serif", ...getNotionColorStyle(block.color) }}
      >
        <RichText spans={block.content} />
      </h3>
    );
  }

  if (block.type === "heading_3") {
    return (
      <h4
        id={block.id}
        key={block.id}
        className="text-lg tracking-[0.02em] sm:text-2xl"
        style={{ fontFamily: "'Instrument Serif', serif", ...getNotionColorStyle(block.color) }}
      >
        <RichText spans={block.content} />
      </h4>
    );
  }

  if (block.type === "heading_4") {
    return (
      <h5
        id={block.id}
        key={block.id}
        className="text-base leading-7 sm:text-xl"
        style={{ fontFamily: "'Inter', sans-serif", ...getNotionColorStyle(block.color) }}
      >
        <RichText spans={block.content} />
      </h5>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        key={block.id}
        className="border-l border-accent/40 pl-4 text-base italic leading-8 text-foreground/85 sm:pl-6 sm:text-lg"
        style={{ fontFamily: "'Instrument Serif', serif", ...getNotionColorStyle(block.color) }}
      >
        <RichText spans={block.content} />
      </blockquote>
    );
  }

  if (block.type === "divider") {
    return <hr key={block.id} className="border-border" />;
  }

  if (block.type === "to_do") {
    return (
      <div key={block.id} className="space-y-3">
        <label
          className="flex items-start gap-3 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
          style={{ fontFamily: "'Inter', sans-serif", ...getNotionColorStyle(block.color) }}
        >
          <input
            type="checkbox"
            checked={block.checked ?? false}
            readOnly
            className="mt-2.5 h-4 w-4 shrink-0 accent-primary"
          />
          <span className={block.checked ? "line-through opacity-70" : undefined}>
            <RichText spans={block.content} />
          </span>
        </label>
        {block.children?.length ? (
          <div className="ml-7 space-y-7 border-l border-border pl-5 sm:space-y-8">
            {renderBlocks(block.children, titleFallback)}
          </div>
        ) : null}
      </div>
    );
  }

  if (block.type === "toggle") {
    return (
      <details key={block.id} className="border border-border bg-secondary/10 p-4 sm:p-5">
        <summary
          className="cursor-pointer text-sm leading-7 text-foreground sm:text-base"
          style={{ fontFamily: "'Inter', sans-serif", ...getNotionColorStyle(block.color) }}
        >
          <RichText spans={block.content} />
        </summary>
        {block.children?.length ? (
          <div className="mt-4 space-y-7 border-t border-border pt-4 sm:space-y-8">
            {renderBlocks(block.children, titleFallback)}
          </div>
        ) : null}
      </details>
    );
  }

  if (block.type === "synced_block") {
    return block.children?.length ? (
      <div key={block.id} className="space-y-7 border-l border-border pl-5 sm:space-y-8">
        {renderBlocks(block.children, titleFallback)}
      </div>
    ) : null;
  }

  if (block.type === "callout") {
    return (
      <div key={block.id} className="flex gap-3 border border-border bg-secondary/20 p-4 sm:gap-4 sm:p-6">
        <span className="mt-0.5 text-xl">{block.icon || "•"}</span>
        <p
          className="text-sm leading-8 text-muted-foreground sm:text-base"
          style={{ fontFamily: "'Inter', sans-serif", ...getNotionColorStyle(block.color) }}
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
    if (isEmbeddableUrl(block.url)) {
      return (
        <NotionEmbed
          key={block.id}
          url={block.url}
          title={block.caption || titleFallback}
          caption={renderCaption(block)}
        />
      );
    }

    return (
      <MediaLinkCard
        key={block.id}
        href={block.url}
        title="Open bookmark"
        caption={block.caption}
        captionRichText={block.captionRichText}
      />
    );
  }

  if ((block.type === "embed" || block.type === "video") && block.url) {
    return (
      <NotionEmbed
        key={block.id}
        url={block.url}
        title={block.caption || titleFallback}
        caption={renderCaption(block)}
      />
    );
  }

  if (block.type === "audio" && block.url) {
    return (
      <figure key={block.id} className="w-full max-w-2xl space-y-3">
        <audio className="w-full" controls preload="metadata">
          <source src={block.url} />
          <a href={block.url} target="_blank" rel="noreferrer">
            Open audio
          </a>
        </audio>
        {renderCaption(block)}
      </figure>
    );
  }

  if (block.type === "pdf" && block.url) {
    return (
      <figure key={block.id} className="w-full max-w-3xl space-y-3">
        <iframe
          src={block.url}
          title={block.caption || titleFallback}
          className="h-[70vh] min-h-[420px] w-full border border-border bg-secondary/10"
        />
        <div className="flex items-center justify-between gap-4">
          {renderCaption(block)}
          <a
            href={block.url}
            target="_blank"
            rel="noreferrer"
            className="ml-auto shrink-0 text-[11px] uppercase tracking-[0.18em] text-accent hover:text-foreground"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Open PDF
          </a>
        </div>
      </figure>
    );
  }

  if (block.type === "file" && block.url) {
    return (
      <MediaLinkCard
        key={block.id}
        href={block.url}
        title="Open file"
        caption={block.caption}
        captionRichText={block.captionRichText}
      />
    );
  }

  return (
    <p
      key={block.id}
      className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
      style={{ fontFamily: "'Inter', sans-serif", ...getNotionColorStyle(block.color) }}
    >
      <RichText spans={block.content} />
    </p>
  );
}

function renderTableOfContents(block: BlogBlock, blocks: BlogBlock[]) {
  const headings = collectHeadings(blocks).filter((heading) => heading.id !== block.id);
  if (!headings.length) return null;

  return (
    <nav
      key={block.id}
      className="border border-border bg-secondary/10 p-5 sm:p-6"
      style={getNotionColorStyle(block.color)}
    >
      <ol className="space-y-2">
        {headings.map((heading) => {
          const level = getHeadingLevel(heading.type);
          const text = heading.content.map((span) => span.text).join("");

          return (
            <li
              key={`${block.id}-${heading.id}`}
              className="text-sm leading-7 text-muted-foreground sm:text-base"
              style={{
                fontFamily: "'Inter', sans-serif",
                paddingLeft: `${Math.max(0, level - 1) * 1}rem`,
              }}
            >
              <a href={`#${heading.id}`} className="transition-colors hover:text-accent">
                {text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function getBlocksPlainText(blocks: BlogBlock[]): string {
  return blocks
    .flatMap((block) => {
      if (block.type === "image" || block.type === "divider" || block.type === "table_of_contents") {
        return [];
      }
      if (block.type === "table" && block.table) {
        return block.table.rows.flatMap((row) =>
          row.flatMap((cell) => cell.map((span) => span.text).join(""))
        );
      }
      if (block.type === "column_list" && block.columns) {
        return block.columns.flatMap((column) => getBlocksPlainText(column.blocks));
      }
      if (block.children?.length) {
        return [
          block.content.map((span) => span.text).join(""),
          getBlocksPlainText(block.children),
        ];
      }
      return [block.content.map((span) => span.text).join("")];
    })
    .map((text) => text.trim())
    .filter(Boolean)
    .join(" ");
}

function renderBlocks(blocks: BlogBlock[], titleFallback: string): ReactNode[] {
  const elements: ReactNode[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (block.type === "table_of_contents") {
      elements.push(renderTableOfContents(block, blocks));
      continue;
    }

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
                className="flex items-start gap-3 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
                style={{ fontFamily: "'Inter', sans-serif", ...getNotionColorStyle(item.color) }}
              >
                <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="min-w-0">
                  <RichText spans={item.content} />
                  {item.children?.length ? (
                    <div className="mt-3 space-y-3">
                      {renderBlocks(item.children, titleFallback)}
                    </div>
                  ) : null}
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
          className="space-y-3 pl-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8"
          style={{ fontFamily: "'Inter', sans-serif", ...getNotionColorStyle(block.color) }}
        >
          {items.map((item) => (
            <li key={item.id}>
              <RichText spans={item.content} />
              {item.children?.length ? (
                <div className="mt-3 space-y-3">
                  {renderBlocks(item.children, titleFallback)}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    elements.push(renderBlock(block, titleFallback));

    if (block.children?.length && !rendersChildrenInside(block)) {
      elements.push(
        <div key={`${block.id}-children`} className="space-y-7 sm:space-y-8">
          {renderBlocks(block.children, titleFallback)}
        </div>
      );
    }
  }

  return elements;
}

export function NotionRichContent({
  blocks,
  titleFallback,
}: {
  blocks: BlogBlock[];
  titleFallback: string;
}) {
  if (!blocks.length) return null;

  const elements = renderBlocks(blocks, titleFallback);

  return <div className="space-y-7 [overflow-wrap:anywhere] sm:space-y-8">{elements}</div>;
}
