'use client';
/* eslint-disable @next/next/no-img-element */

import React from 'react';
import { getAssetCandidates } from '../lib/asset-paths';

type ResilientImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> & {
  assetPath: string;
};

export default function ResilientImage({ assetPath, alt, ...props }: ResilientImageProps) {
  const candidates = React.useMemo(() => getAssetCandidates(assetPath), [assetPath]);
  const [candidateIndex, setCandidateIndex] = React.useState(0);
  const [hasExhaustedCandidates, setHasExhaustedCandidates] = React.useState(false);

  const handleError = React.useCallback(() => {
    setCandidateIndex((currentIndex) => {
      if (currentIndex < candidates.length - 1) {
        return currentIndex + 1;
      }

      setHasExhaustedCandidates(true);
      console.error(`Impossible de charger l'image "${assetPath}"`, candidates);
      return currentIndex;
    });
  }, [assetPath, candidates]);

  return (
    <img
      {...props}
      src={candidates[candidateIndex]}
      alt={alt}
      onError={hasExhaustedCandidates ? undefined : handleError}
    />
  );
}
