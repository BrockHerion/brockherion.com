import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

// Posts now highlight at request time, inside the Worker. Astro's <Code> would
// bundle all of Shiki's grammars, about 1.7 MB gzipped, so this loads only the
// languages the archive uses. Anything else renders as plain text.
const highlighter = createHighlighterCore({
  themes: [import('shiki/themes/github-dark.mjs')],
  langs: [
    import('shiki/langs/astro.mjs'),
    import('shiki/langs/bash.mjs'),
    import('shiki/langs/javascript.mjs'),
    import('shiki/langs/json.mjs'),
    import('shiki/langs/jsx.mjs'),
    import('shiki/langs/markdown.mjs'),
    import('shiki/langs/prisma.mjs'),
    import('shiki/langs/tsx.mjs'),
    import('shiki/langs/typescript.mjs'),
    import('shiki/langs/yaml.mjs'),
  ],
  engine: createJavaScriptRegexEngine(),
});

/** The same markup Astro's <Code> produces, so the existing styles apply. */
export async function highlight(code: string, language = 'plaintext') {
  const shiki = await highlighter;
  const lang = shiki.getLoadedLanguages().includes(language) ? language : 'plaintext';
  return shiki.codeToHtml(code.replace(/(?:\r\n|\r|\n)$/, ''), {
    lang,
    theme: 'github-dark',
    transformers: [
      {
        pre(node) {
          node.properties.class = String(node.properties.class).replace(/shiki/g, 'astro-code');
          node.properties.style = `${node.properties.style}; overflow-x: auto;`;
          node.properties.dataLanguage = language;
        },
      },
    ],
  });
}
