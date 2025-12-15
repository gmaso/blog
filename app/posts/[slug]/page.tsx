import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Gmaso`,
    description: post.excerpt || post.title,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <article>
          <header className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm">
              <time dateTime={post.date}>
                {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
              </time>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold
              prose-h1:text-3xl
              prose-h2:text-2xl
              prose-h3:text-xl
              prose-a:text-blue-500 hover:prose-a:text-blue-600
              prose-code:text-pink-600 prose-code:bg-gray-100 dark:prose-code:bg-gray-800
              prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100
              prose-img:rounded-lg
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500
              prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-900
              prose-blockquote:py-1 prose-blockquote:px-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>

      <Footer />
    </div>
  )
}
