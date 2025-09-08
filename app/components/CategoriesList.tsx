import { fetchFromWP } from '../lib/wp';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // SSR

export default async function CategoriesList() {
  const categories = await fetchFromWP('article-categories', { per_page: 20 });
  return (
    <nav className="flex flex-wrap gap-2 mb-2">
      {categories.map((cat: any) => (
        <Link
          key={cat.id}
          href={`/category/${cat.id}`}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 shadow-sm transition hover:border-violet-300/30 hover:bg-violet-400/10 hover:text-violet-200"
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
