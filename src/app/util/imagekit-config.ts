export const IMAGEKIT_CONFIG = {
  urlEndpoint: "https://ik.imagekit.io/yds5g1shj",
  publicKey: "public_F9Cmzy5zweqZrrRiFlf1KIZgQBQ=",
  imageKitId: "yds5g1shj",
};

// Helper function to get ImageKit URL
export const getImageKitUrl = (
  path: string,
  transformations?: Record<string, any>
) => {
  const baseUrl = `${IMAGEKIT_CONFIG.urlEndpoint}/${path}`;

  if (!transformations || Object.keys(transformations).length === 0) {
    return baseUrl;
  }

  const transformParams = Object.entries(transformations)
    .map(([key, value]) => `${key}-${value}`)
    .join(",");

  return `${baseUrl}?tr=${transformParams}`;
};
