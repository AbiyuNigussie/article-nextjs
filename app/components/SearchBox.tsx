"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initial = useMemo(() => searchParams.get("q") || "", [searchParams]);
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  // On /search page, update results as you type.
  useEffect(() => {
    if (pathname !== "/search") return;
    const t = setTimeout(() => {
      const q = value.trim();
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      const url = "/search" + (params.toString() ? `?${params.toString()}` : "");
      router.replace(url);
    }, 300);
    return () => clearTimeout(t);
  }, [value, pathname, router]);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const q = value.trim();
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      const url = "/search" + (params.toString() ? `?${params.toString()}` : "");
      // From any page, Enter triggers a search navigation
      router.push(url);
    }
  };

  return (
    <div className="relative">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search articles..."
        aria-label="Search articles"
        className="w-56 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm text-slate-200 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400/40 focus:ring-2 focus:ring-violet-400/20"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 text-xs"
        >
          ✕
        </button>
      )}
    </div>
  );
}
