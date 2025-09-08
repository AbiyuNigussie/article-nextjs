import { fetchFromWP } from '../lib/wp';
import type { WPArticle } from '../lib/types';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = (q || '').trim();

  let results: WPArticle[] = [];
  if (query) {
    // WordPress v2 search across posts custom type "articles"
    results = await fetchFromWP('articles', { search: query, per_page: 12, _embed: 1, acf_format: 'standard', _fields: 'id,title,acf,excerpt' });
  }

  return (
    <section className="py-2">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-100 mb-3">Search</h1>
      <p className="mb-6 text-sm text-slate-400">Start typing in the search bar above to see results.</p>

  {!query && <p className="text-slate-400">Type something to search articles.</p>}
      {query && results.length === 0 && (
        <p className="text-slate-400">No results for &quot;{query}&quot;.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((post) => (
          <article key={post.id} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-md transition hover:shadow-lg hover:shadow-violet-500/10">
            <Link href={`/posts/${post.id}`} className="block">
              {post.acf?.featured_image && (
                <Image src={post.acf.featured_image} alt={post.title.rendered} width={800} height={400} className="h-40 w-full object-cover" />
              )}
              <div className="p-5">
                <h2 className="text-base font-semibold text-slate-100 group-hover:text-violet-300 line-clamp-2">{post.title.rendered}</h2>
                {post.excerpt?.rendered && (
                  <div className="mt-3 text-sm text-slate-400 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
