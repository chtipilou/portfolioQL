const REPO_BASE_PATH = '/portfolioQL';

const normalizeAssetPath = (assetPath: string) => {
  if (/^https?:\/\//.test(assetPath)) {
    return assetPath;
  }

  return assetPath.startsWith('/') ? assetPath : `/${assetPath}`;
};

const stripRepoBasePath = (assetPath: string) => {
  if (assetPath === REPO_BASE_PATH) {
    return '/';
  }

  if (assetPath.startsWith(`${REPO_BASE_PATH}/`)) {
    return assetPath.slice(REPO_BASE_PATH.length);
  }

  return assetPath;
};

export const getAssetCandidates = (assetPath: string) => {
  const normalizedAssetPath = normalizeAssetPath(assetPath);

  if (/^https?:\/\//.test(normalizedAssetPath)) {
    return [normalizedAssetPath];
  }

  const strippedAssetPath = stripRepoBasePath(normalizedAssetPath);
  const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';
  const preferredAssetPath = configuredBasePath
    ? `${configuredBasePath}${strippedAssetPath}`
    : strippedAssetPath;
  const repositoryAssetPath = strippedAssetPath === '/'
    ? REPO_BASE_PATH
    : `${REPO_BASE_PATH}${strippedAssetPath}`;

  return Array.from(new Set([
    preferredAssetPath,
    strippedAssetPath,
    repositoryAssetPath,
  ]));
};

export const getPreferredAssetPath = (assetPath: string) => getAssetCandidates(assetPath)[0];
