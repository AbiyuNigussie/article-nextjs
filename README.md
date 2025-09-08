## Next.js + WordPress Headless Blog

Production-ready blog built with Next.js (App Router) that consumes a WordPress headless API. It uses server-side rendering (SSR) for SEO, Tailwind CSS for styling, and is deployable on Vercel.

## Features
- Server-side rendering for all main pages (SEO-friendly)
- WordPress REST API integration (custom post type: `articles`, taxonomy: `article-categories`)
- ACF fields support (e.g., `featured_image`, `author`, `content`)
- Search with instant typing on the `/search` page and Enter-to-search from anywhere
- Clean header with categories navigation
- Tailwind CSS (v4) theme and modern, responsive UI

## Project structure (key files)
- `app/page.tsx` — Home (latest articles)
- `app/posts/[postId]/page.tsx` — Post detail
- `app/category/[categoryId]/page.tsx` — Category listing
- `app/search/page.tsx` — Search results (SSR from query `q`)
- `app/components/Header.tsx` — Top nav + Search + Categories
- `app/components/CategoriesList.tsx` — Category pills, fetched from WP
- `app/components/SearchBox.tsx` — Client component for instant search
- `app/lib/wp.ts` — WordPress fetch helper
- `app/globals.css` — Global theme and content typography

## Prerequisites
- Node.js 18+ (recommended LTS)
- A WordPress site with the REST API enabled, custom post type `articles`, taxonomy `article-categories`, and the needed ACF fields.

## Configuration
1) WordPress API base URL

Create `.env.local` in the project root:

```
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2
```

`app/lib/wp.ts` reads this env var and builds requests like `/articles`, `/article-categories`, etc.

2) Remote images (Next/Image)

If your WordPress media is served from the same host as `WORDPRESS_API_URL` (even with a port), use `remotePatterns` in `next.config.ts`:

```ts
const wp = process.env.WORDPRESS_API_URL ? new URL(process.env.WORDPRESS_API_URL) : undefined;

export default {
	images: {
		remotePatterns: wp
			? [
					{
						protocol: (wp.protocol.replace(":", "")),
						hostname: wp.hostname,
						port: wp.port || undefined,
						pathname: "/**",
					},
				]
			: [],
	},
};
```

If images are on a different host/CDN than the API base, add an additional `remotePatterns` entry for that host.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Data model used by pages
- Home (`/`): GET `articles?per_page=10&_embed=1&acf_format=standard&_fields=id,title,acf`
	- Displays title and ACF `featured_image`
- Post detail (`/posts/[postId]`): GET `articles/:id?_embed=1&acf_format=standard&_fields=id,date,title,acf`
	- Displays title, date, ACF `author.nickname`, and ACF `content`
- Category (`/category/[categoryId]`): GET `articles?article-categories=:id&_embed=1&acf_format=standard&_fields=id,title,excerpt,acf`
	- Card grid filtered by category
- Search (`/search?q=term`): GET `articles?search=:term&_embed=1&acf_format=standard&_fields=id,title,acf,excerpt`
	- Header search updates results as you type on `/search`; from other pages, press Enter to navigate

You can switch to core posts/categories by changing endpoints to `posts`/`categories` and updating data fields accordingly.

## Styling
- Tailwind CSS v4 (see `app/globals.css`)
- Theme, spacing, and readable content styles via `.content` class for WP HTML
- Components use semantic Tailwind utilities and accessible focus/hover states

## Deployment (Vercel)
1) Push the repo to GitHub/GitLab/Bitbucket.
2) Import the project in Vercel.
3) Set Environment Variable:
	 - `WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2`
4) Ensure `images.domains` in `next.config.ts` includes your WP domain.
5) Deploy.

## Notes & customization
- Endpoints currently use `articles` and `article-categories`. If your WordPress uses different slugs, update the fetch calls accordingly.
- ACF fields referenced: `acf.featured_image`, `acf.content`, `acf.author.nickname`. Adjust to your field names if different.
- Caching: `fetchFromWP` uses `{ next: { revalidate: 0 } }` to force SSR on each request during dev. Tweak for production as needed.

## License
MIT
