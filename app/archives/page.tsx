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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <h1 className="text-4xl font-bold mb-12">归档</h1>

        {years.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            暂无文章
          </div>
        ) : (
          <div className="space-y-12">
            {years.map((year) => (
              <section key={year}>
                <h2 className="text-2xl font-bold mb-6 text-blue-500">{year}</h2>
                <div className="space-y-4">
                  {postsByYear[year].map((post) => (
                    <article
                      key={post.slug}
                      className="flex gap-4 items-start border-l-2 border-transparent hover:border-blue-500 pl-4 transition-all"
                    >
                      <time
                        className="text-gray-600 dark:text-gray-400 text-sm font-mono shrink-0 w-24"
                        dateTime={post.date}
                      >
                        {format(new Date(post.date), 'MM-dd')}
                      </time>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          <Link
                            href={`/posts/${encodeURIComponent(post.slug)}`}
                            className="hover:text-blue-500 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        {post.tags && post.tags.length > 0 && (
                          <div className="mt-2 flex gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-gray-600 dark:text-gray-400"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
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
