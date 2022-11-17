import React from 'react';
import { CacheProvider } from '@emotion/react';
//  ----
import { EmotionCacheContext } from '../context';
import createCache from './create';

// --- CLIENT

export function MUIEmotionProvider({ children }: { children?: React.ReactNode | React.ReactNode[] }) {
  const [cache, setCache] = React.useState(createCache());

  const { reset } = React.useMemo(
    () => ({
      reset: () => setCache(createCache()),
    }),
    [],
  );

  return (
    <EmotionCacheContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </EmotionCacheContext.Provider>
  );
}
