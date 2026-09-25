import { slug } from 'github-slugger';

// Rendering hands components marked text nested under mark nodes, so a span
// may carry children instead of text.
interface Span {
  text?: string;
  children?: Span[];
}

interface Block {
  _type: string;
  style?: string;
  children?: Span[];
  code?: string;
}

const blockText = (node: Block | Span): string =>
  (node.children ?? []).map(span => span.text ?? blockText(span)).join('');

/**
 * Matches the ids Astro's Markdown pipeline gave headings, so `/blog/x#section`
 * links written against the MDX version keep landing.
 */
export const headingId = (block: Block) => slug(blockText(block));

export function headings(blocks: Block[]) {
  return blocks
    .filter(block => block._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
    .map(block => ({ depth: Number(block.style!.slice(1)), slug: headingId(block), text: blockText(block) }));
}

export function plainText(blocks: Block[]) {
  return blocks.map(block => (block._type === 'code' ? block.code ?? '' : blockText(block))).join('\n');
}
