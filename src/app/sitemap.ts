import type { MetadataRoute } from "next";
import { DATA_CENTERS_PATH, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/es`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          es: `${SITE_URL}/es`,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${DATA_CENTERS_PATH}`,
      alternates: {
        languages: {
          es: `${SITE_URL}${DATA_CENTERS_PATH}`,
          en: `${SITE_URL}/en${DATA_CENTERS_PATH}`,
        },
      },
    },
    {
      url: `${SITE_URL}/en${DATA_CENTERS_PATH}`,
      alternates: {
        languages: {
          es: `${SITE_URL}${DATA_CENTERS_PATH}`,
          en: `${SITE_URL}/en${DATA_CENTERS_PATH}`,
        },
      },
    },
  ];
}
