import React from 'react';
import createServer from '@emotion/server/create-instance';
import { CacheProvider } from '@emotion/react';
// ----
import createEmotionCache from './create';
// ----

export function withMUI() {
  const cache = createEmotionCache();

  // --- Cache Provider
  function MUIEmotionProvider({ children }: { children?: React.ReactNode | React.ReactNode[] }) {
    return <CacheProvider value={cache}>{children}</CacheProvider>;
  }

  // --- HTML Modifier
  const { extractCriticalToChunks: extract } = createServer(cache);

  function withMUIStyles(html: string) {
    // [1] grab the CSS from emotion
    const { styles } = extract(html);

    // [2] create coreresponding emotion style tags
    let estyles = styles.reduce((prv, { key, ids, css }) => {
      const ekey = `${key} ${ids.join(' ')}`;
      const tag = `<style data-emotion="${ekey}">${css}</style>`;
      return `${prv}${tag}`;
    }, '');

    // [3] add the Emotion style tags after the insertion point meta tag
    const ehtml = html.replace(
      /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
      `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${estyles}`,
    );

    return ehtml;
  }

  return { MUIEmotionProvider, withMUIStyles };
}
