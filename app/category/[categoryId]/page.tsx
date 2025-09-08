import { fetchFromWP } from '../../lib/wp';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // SSR

export default async function CategoryPage({ params }: { params: Promise<{ categoryId: string }> }) {
  const { categoryId } = await params;
  const posts = await fetchFromWP('articles', { "article-categories": categoryId, per_page: 10, _embed: 1, acf_format: 'standard', _fields: 'id,title,excerpt,acf' });
  const category = await fetchFromWP(`article-categories/${categoryId}`);
  return (
    <section className="py-2">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-100 mb-6">Category: {category.name}</h1>
      {posts.length === 0 ? (
        <p className="text-slate-400">No posts found in this category.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post: any) => (
            <article key={post.id} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-md transition hover:shadow-lg hover:shadow-violet-500/10">
              <Link href={`/posts/${post.id}`} className="block">
                {post.acf?.featured_image && (
                  <img
                    src={post.acf?.featured_image}
                    alt={post.title.rendered}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-slate-100 group-hover:text-violet-300 line-clamp-2">
                    {post.title.rendered}
                  </h2>
                  {post.excerpt?.rendered && (
                    <div className="mt-3 text-sm text-slate-400 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
      <Link href="/" className="text-violet-300 hover:text-violet-200 mt-8 inline-block">← Back to Home</Link>
    </section>
  );
}
