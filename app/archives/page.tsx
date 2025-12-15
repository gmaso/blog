import Link from 'next/link'
import { getPostsByYear } from '@/lib/posts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export const metadata = {
  title: '归档 | Gmaso',
  description: '所有文章归档',
}

export default function ArchivesPage() {
  const postsByYear = getPostsByYear()
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-slate-900">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            归档
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            共 {Object.values(postsByYear).flat().length} 篇文章
          </p>
        </div>

        {years.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg">暂无文章</p>
          </div>
        ) : (
          <div className="space-y-16">
            {years.map((year, yearIndex) => (
              <section key={year} className="fade-in" style={{ animationDelay: `${yearIndex * 0.1}s` }}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {year}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {postsByYear[year].length} 篇
                  </span>
                </div>
                <div className="space-y-3">
                  {postsByYear[year].map((post, postIndex) => (
                    <article
                      key={post.slug}
                      className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
                      style={{ animationDelay: `${(yearIndex * 0.1) + (postIndex * 0.05)}s` }}
                    >
                      <div className="flex gap-6 items-start">
                        <time
                          className="text-gray-500 dark:text-gray-400 text-sm font-mono shrink-0 w-16 pt-1"
                          dateTime={post.date}
                        >
                          {format(new Date(post.date), 'MM-dd')}
                        </time>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold mb-2">
                            <Link
                              href={`/posts/${encodeURIComponent(post.slug)}`}
                              className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="hidden sm:block shrink-0">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
