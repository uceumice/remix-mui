import React from 'react';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { withEmotionCache } from '@emotion/react';

// ----

import { EmotionCacheContext } from './context';

// ---- CLIENT >> `root.ts`

export const MUIStylesProvider = withEmotionCache(
  ({ children }: { children?: React.ReactNode | React.ReactNode[] }, cache) => {
    const context = React.useContext(EmotionCacheContext);

    // ?? only executed on client
    useEnhancedEffect(() => {
      // re-link sheet container
      cache.sheet.container = document.head;
      // re-inject tags
      const tags = cache.sheet.tags;
      cache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line no-underscore-dangle
        (cache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      context.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{children}</>;
  },
);
