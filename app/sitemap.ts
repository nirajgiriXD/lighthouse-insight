/**
 * External dependencies.
 */
import type { MetadataRoute } from "next";

/**
 * Internal dependencies.
 */
import { getSiteUrl, NAV_ITEMS } from "../utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...NAV_ITEMS.map((item) => ({
      url: `${siteUrl}${item.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
