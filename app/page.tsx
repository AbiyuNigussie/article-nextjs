
import Link from 'next/link';
import Image from 'next/image';
import { fetchFromWP } from './lib/wp';
import type { WPArticle } from './lib/types';

export const dynamic = 'force-dynamic'; // SSR

export default async function HomePage() {
  const posts = await fetchFromWP('articles', { per_page: 10, _embed: 1 , acf_format: 'standard', _fields: 'id,title,acf' });
  return (
    <section aria-label="Latest articles" className="py-2">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-100 mb-6">Latest Articles</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {(posts as WPArticle[]).map((post) => (
          <article key={post.id} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-md transition hover:shadow-lg hover:shadow-violet-500/10 focus-within:ring-2 focus-within:ring-violet-400/20">
            <Link href={`/posts/${post.id}`} className="block outline-none">
              {post.acf?.featured_image && (
                <Image
                  src={post.acf.featured_image}
                  alt={post.title.rendered}
                  width={800}
                  height={400}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-slate-100 group-hover:text-violet-300 line-clamp-2">
                  {post.title.rendered}
                </h2>
                <p className="mt-3 text-sm text-slate-400">Read more →</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
