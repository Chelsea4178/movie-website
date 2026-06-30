"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import moviesData from "./data/movies.json";

function StarRating({ rating }) {
  const stars = Math.round(rating / 2);
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`评分 ${rating}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < stars ? "text-amber-400" : "text-stone-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1.5 text-xs font-medium text-stone-400 tabular-nums">{rating}</span>
    </span>
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return moviesData.movies;
    const q = query.trim().toLowerCase();
    return moviesData.movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.director.name.toLowerCase().includes(q) ||
        m.genre.some((g) => g.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-stone-200/70 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight text-stone-800">
            经典电影
          </Link>
          <div className="relative w-64">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5L21 21" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="搜索片名、导演、类型…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:bg-white transition-all"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        <p className="text-xs text-stone-400 mb-6 tracking-wide uppercase">
          {filtered.length} 部影片
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone-400 text-sm">未找到匹配的电影</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((movie, index) => (
              <Link
                key={index}
                href={`/movies/${moviesData.movies.indexOf(movie)}`}
                className="movie-card group flex items-center gap-5 px-5 py-4 rounded-xl bg-white border border-stone-200/60 hover:border-stone-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-medium text-stone-800 group-hover:text-stone-950 transition-colors truncate">
                    {movie.title}
                  </h2>
                  <p className="text-xs text-stone-400 mt-1">
                    {movie.director.name}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-stone-400 tabular-nums">{movie.year}</span>
                  <StarRating rating={movie.rating} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-stone-200/60 py-6 text-center text-xs text-stone-400">
        经典电影 · 课程作业
      </footer>
    </div>
  );
}
