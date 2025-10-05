const cache = {};
const TTL = 60; // seconds

export const getCachedResponse = (url) => {
  const now = Math.floor(Date.now() / 1000);
  if (cache[url] && now < cache[url + "_modified"] + TTL) {
    return cache[url];
  }
  return null;
};

export const setCachedResponse = (url, data) => {
  cache[url] = data;
  cache[url + "_modified"] = Math.floor(Date.now() / 1000);
};