export type WPEmbeddedMedia = {
  source_url?: string;
};

export type WPEmbedded = {
  author?: Array<{ name?: string; id?: number }>
} & Record<string, unknown>;

export type ACFFields = {
  featured_image?: string;
  content?: string;
  author?: { nickname?: string };
};

export type WPArticle = {
  id: number;
  date?: string;
  title: { rendered: string };
  excerpt?: { rendered: string };
  acf?: ACFFields;
  _embedded?: WPEmbedded & { 'wp:featuredmedia'?: WPEmbeddedMedia[] };
};

export type WPCategory = { id: number; name: string };