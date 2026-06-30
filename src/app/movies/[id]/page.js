import { notFound } from "next/navigation";
import Link from "next/link";
import moviesData from "@/app/data/movies.json";

export function generateStaticParams() {
  return moviesData.movies.map((_, i) => ({ id: String(i) }));
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const movie = moviesData.movies[Number(id)];
  if (!movie) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-stone-200/70 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            返回
          </Link>
          <span className="text-sm text-stone-300">/</span>
          <span className="text-sm text-stone-500 truncate">{movie.title}</span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-12">
        <div className="animate-[fadeIn_0.4s_ease-out]">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-semibold tracking-tight text-stone-900">{movie.title}</h1>
              <p className="text-sm text-stone-400 mt-2">{movie.director.name}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/60">
                <span className="text-lg font-semibold text-amber-700 tabular-nums">{movie.rating}</span>
                <span className="text-xs text-amber-500">/ 10</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {movie.genre.map((g) => (
              <span
                key={g}
                className="px-3 py-1 text-xs rounded-full bg-stone-100 text-stone-500 border border-stone-200/60"
              >
                {g}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8 py-6 border-y border-stone-100">
            <div>
              <p className="text-xs text-stone-400 mb-1">年份</p>
              <p className="text-sm font-medium text-stone-700">{movie.year}</p>
            </div>
            <div>
              <p className="text-xs text-stone-400 mb-1">时长</p>
              <p className="text-sm font-medium text-stone-700">{movie.duration} 分钟</p>
            </div>
            <div>
              <p className="text-xs text-stone-400 mb-1">地区</p>
              <p className="text-sm font-medium text-stone-700">{movie.region.join(" / ")}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-3">剧情简介</h2>
            <p className="text-sm leading-7 text-stone-600">{movie.summary}</p>
          </div>

          <div className="mt-10 pt-6 border-t border-stone-100">
            <p className="text-xs text-stone-300">
              导演：{movie.director.name}（{movie.director.region}）
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-stone-200/60 py-6 text-center text-xs text-stone-400">
        经典电影 · 课程作业
      </footer>
    </div>
  );
}
