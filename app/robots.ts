/**
 * External dependencies.
 */
import type { MetadataRoute } from "next";

/**
 * Internal dependencies.
 */
import { getSiteUrl, PRIVATE_ROUTES } from "../utils";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Session-only screens and the API hold nothing a crawler can use.
      disallow: ["/api/", ...PRIVATE_ROUTES],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
