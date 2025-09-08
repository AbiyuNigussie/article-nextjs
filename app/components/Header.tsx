import Link from 'next/link';
import CategoriesList from './CategoriesList';
import SearchBox from './SearchBox';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight text-slate-100">My Blog</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-5 text-sm text-slate-300">
            <Link href="/" className="hover:text-violet-300">Home</Link>
            <Link href="/category/1" className="hover:text-violet-300">Categories</Link>
            {/* Placeholders for future pages */}
            {/* <Link href="/about" className="hover:text-violet-300">About</Link> */}
            {/* <Link href="/contact" className="hover:text-violet-300">Contact</Link> */}
          </nav>
          <div className="hidden sm:block">
            <Suspense fallback={<div className="w-56 h-9 rounded-full border border-white/10 bg-white/5" />}> 
              <SearchBox />
            </Suspense>
          </div>
        </div>
        <div className="py-2">
          <CategoriesList />
        </div>
      </div>
    </header>
  );
}
