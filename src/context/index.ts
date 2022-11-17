import React from 'react';

interface StylesContextData {
  reset: Function;
}

export const EmotionCacheContext = React.createContext<StylesContextData>({
  reset: () => {},
});
