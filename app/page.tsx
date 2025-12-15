import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Keep Writing</h1>
          <p className="text-gray-600 dark:text-gray-400">
            欢迎来到我的博客
          </p>
        </div>

        <div className="space-y-8">
          {posts.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              暂无文章
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-2xl font-bold mb-2">
                  <Link
                    href={`/posts/${encodeURIComponent(post.slug)}`}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
                </p>
                {post.excerpt && (
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
