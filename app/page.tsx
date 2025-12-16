import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-slate-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
        <div className="text-center mb-20 fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Keep Writing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            记录技术，分享思考，保持输出
          </p>
        </div>

        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <p className="text-lg">暂无文章</p>
            </div>
          ) : (
            posts.map((post, index) => (
              <article
                key={post.slug}
                className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden card-hover shadow-sm hover:shadow-2xl hover:border-blue-500 dark:hover:border-blue-500 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8 sm:p-10">
                  <div className="flex items-start gap-6">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                        <Link
                          href={`/posts/${encodeURIComponent(post.slug)}`}
                          className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-5">
                        <time className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
                        </time>
                        {post.tags && post.tags.length > 0 && (
                          <>
                            <span className="text-gray-300 dark:text-gray-600">•</span>
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2.5 py-0.5 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {post.excerpt && (
                        <p className="text-base text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all">
                        <span>阅读全文</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    <div className="hidden lg:block shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        {post.title.charAt(0)}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
