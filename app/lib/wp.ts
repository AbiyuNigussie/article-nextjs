// Utility to fetch data from WordPress REST API
export const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

export async function fetchFromWP(endpoint: string, params: Record<string, any> = {}) {
  const url = new URL(`${WORDPRESS_API_URL}/${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  const res = await fetch(url.toString(), { next: { revalidate: 0 } });
  if (!res.ok) {
    const msg = `Failed to fetch from WordPress API (${res.status}) – ${url.toString()}`;
    throw new Error(msg);
  }
  return res.json();
}
