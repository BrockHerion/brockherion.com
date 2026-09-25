import { slug } from 'github-slugger';

interface Span {
  text?: string;
}

interface Block {
  _type: string;
  style?: string;
  children?: Span[];
  code?: string;
}

const blockText = (block: Block) => (block.children ?? []).map(span => span.text ?? '').join('');

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
