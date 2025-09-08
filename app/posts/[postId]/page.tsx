import { fetchFromWP } from '../../lib/wp';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { WPArticle } from '../../lib/types';

export const dynamic = 'force-dynamic'; // SSR

export default async function PostDetail({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  try {
    const post = (await fetchFromWP(`articles/${postId}`, { _embed: 1 , acf_format: 'standard', _fields: 'id,date,title,acf,author' })) as WPArticle;
    const date = new Date(post.date!).toLocaleDateString();
    const featured = post.acf?.featured_image;
    return (
      <main className="mx-auto max-w-3xl py-6 px-4 bg-white/5 rounded-xl border border-white/10 shadow-md">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-100 mb-2">{post.title.rendered}</h1>
        <div className="flex items-center text-slate-400 text-sm mb-5">
          <span>By {post.acf?.author?.nickname || 'Unknown'}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        {featured && (
          <Image src={featured} alt={post.title.rendered} width={1600} height={800} className="w-full h-80 object-cover rounded-lg mb-6" />
        )}
        <article className="content" dangerouslySetInnerHTML={{ __html: post.acf?.content || '' }} />
        <Link href="/" className="text-violet-300 hover:text-violet-200 mt-8 inline-block">← Back to Home</Link>
      </main>
    );
  } catch {
    notFound();
  }
}
