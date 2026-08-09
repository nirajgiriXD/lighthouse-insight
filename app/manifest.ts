/**
 * External dependencies.
 */
import type { MetadataRoute } from "next";

/**
 * Internal dependencies.
 */
import { siteConfig } from "../utils";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0c1018",
    theme_color: "#0c1018",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
