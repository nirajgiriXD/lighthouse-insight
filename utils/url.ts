/**
 * A URL is usable only when it parses and speaks a web protocol — anything
 * else can not be audited by Lighthouse.
 */
export const isValidURL = (url: string): boolean => {
  let parsed: URL;

  try {
    parsed = new URL(url);
  } catch {
    return false;
  }

  return parsed.protocol === "http:" || parsed.protocol === "https:";
};

/**
 * Turn a block of pasted text into the sorted, de-duplicated list of valid
 * URLs it contains, one per line.
 */
export const parseUrlList = (text: string): string[] => {
  const urls = text
    .split("\n")
    .map((url) => url.trim())
    .filter((url) => isValidURL(url));

  return [...new Set(urls)].sort();
};

/**
 * Lines that were typed but can not be audited, so the form can say why.
 */
export const findInvalidLines = (text: string): string[] => {
  const invalid = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !isValidURL(line));

  return [...new Set(invalid)];
};

/**
 * Filesystem-safe name for a report generated from a URL.
 */
export const urlToFilename = (url: string): string =>
  url
    .replace(/(^\w+:|^)\/\//, "") // Remove protocol.
    .replace(/[/\\:*?"<>|]/g, "."); // Replace invalid characters.

/**
 * Compact, human-readable form of a URL for dense UI such as option lists.
 */
export const formatUrlLabel = (url: string): string => {
  try {
    const { host, pathname, search } = new URL(url);
    const path = `${pathname}${search}`;

    return path === "/" ? host : `${host}${path}`;
  } catch {
    return url;
  }
};

/**
 * Hostname only, used as a short label under score readouts.
 */
export const getHostname = (url: string): string => {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
};

/**
 * A label short enough for a chart legend that still tells two pages of the
 * same site apart — so the path is kept and the middle is elided.
 */
export const shortenUrlLabel = (url: string, maxLength = 34): string => {
  const label = formatUrlLabel(url);

  if (label.length <= maxLength) return label;

  const head = Math.ceil((maxLength - 1) / 2);
  const tail = Math.floor((maxLength - 1) / 2);

  return `${label.slice(0, head)}…${label.slice(-tail)}`;
};
