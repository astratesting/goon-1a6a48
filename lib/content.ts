import siteData from "@/content/site.json";

export type SiteContent = typeof siteData;

export function getSiteContent(): SiteContent {
  return siteData;
}
