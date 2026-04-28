"use client";

import { Typography, Box } from "@mui/material";
import Link from "next/link";
import { colors, fontFamily } from "@/theme/theme";

interface TextChild {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkChild {
  type: "link";
  url: string;
  children: TextChild[];
}

type InlineNode = TextChild | LinkChild;

interface Block {
  type: string;
  level?: number;
  format?: string;
  children: (InlineNode | Block)[];
  image?: { url: string; alternativeText?: string };
}

function renderInline(node: InlineNode, key: number) {
  if (node.type === "link") {
    return (
      <Link key={key} href={node.url} style={{ color: colors.primary, textDecoration: "underline" }}>
        {node.children?.map((c, i) => renderInline(c, i))}
      </Link>
    );
  }

  let text: React.ReactNode = node.text;
  if (!text) return null;
  if (node.bold) text = <strong key={key}>{text}</strong>;
  if (node.italic) text = <em>{text}</em>;
  if (node.underline) text = <u>{text}</u>;
  if (node.strikethrough) text = <s>{text}</s>;
  if (node.code) text = <code>{text}</code>;
  return <span key={key}>{text}</span>;
}

function renderBlock(block: Block, key: number): React.ReactNode {
  const children = block.children?.map((child, i) => {
    if ("type" in child && (child.type === "text" || child.type === "link")) {
      return renderInline(child as InlineNode, i);
    }
    return renderBlock(child as Block, i);
  });

  switch (block.type) {
    case "heading": {
      const variant = `h${block.level || 2}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Typography key={key} variant={variant} sx={{ fontFamily: fontFamily.heading, fontWeight: 700, mt: 4, mb: 1.5 }}>
          {children}
        </Typography>
      );
    }
    case "paragraph":
      return (
        <Typography key={key} sx={{ fontFamily: fontFamily.body, fontSize: "1rem", lineHeight: 1.8, mb: 2, color: colors.text.primary }}>
          {children}
        </Typography>
      );
    case "list": {
      const Tag = block.format === "ordered" ? "ol" : "ul";
      return <Tag key={key} style={{ paddingLeft: 24, marginBottom: 16 }}>{children}</Tag>;
    }
    case "list-item":
      return (
        <li key={key} style={{ marginBottom: 8, fontFamily: "'Manrope', sans-serif", lineHeight: 1.8 }}>
          {children}
        </li>
      );
    case "image":
      return (
        <Box key={key} component="img" src={block.image?.url} alt={block.image?.alternativeText || ""} sx={{ maxWidth: "100%", my: 2, borderRadius: 1 }} />
      );
    case "quote":
      return (
        <Box key={key} component="blockquote" sx={{ borderLeft: `4px solid ${colors.primary}`, pl: 3, my: 2, fontStyle: "italic", color: colors.grey }}>
          {children}
        </Box>
      );
    default:
      return <Box key={key}>{children}</Box>;
  }
}

export default function RichText({ content }: { content: any[] }) {
  if (!content || !Array.isArray(content)) return null;
  return <>{content.map((block, i) => renderBlock(block as Block, i))}</>;
}
