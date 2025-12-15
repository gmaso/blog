import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism-plus'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostData {
  slug: string
  title: string
  date: string
  content: string
  excerpt?: string
  tags?: string[]
  category?: string
}

export interface PostMetadata {
  slug: string
  title: string
  date: string
  excerpt?: string
  tags?: string[]
  category?: string
}

// 获取所有文章的 slug
export function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        return {
          slug: fileName.replace(/\.md$/, ''),
        }
      })
  } catch (error) {
    return []
  }
}

// 获取单篇文章的完整数据
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  try {
    // 解码 URL 编码的 slug（处理中文文件名）
    const decodedSlug = decodeURIComponent(slug)
    const fullPath = path.join(postsDirectory, `${decodedSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 使用 gray-matter 解析 frontmatter
    const { data, content } = matter(fileContents)

    // 使用 unified 将 Markdown 转换为 HTML 并添加代码高亮
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypePrism, { ignoreMissing: true })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)

    const contentHtml = processedContent.toString()

    return {
      slug: decodedSlug,
      title: data.title || decodedSlug,
      date: data.date || new Date().toISOString(),
      content: contentHtml,
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      category: data.category || 'uncategorized',
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// 获取所有文章的元数据（不包含内容）
export function getAllPosts(): PostMetadata[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || '',
          tags: data.tags || [],
          category: data.category || 'uncategorized',
        }
      })

    // 按日期排序（最新的在前）
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

// 获取按年份归档的文章
export function getPostsByYear() {
  const posts = getAllPosts()
  const postsByYear: Record<string, PostMetadata[]> = {}

  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!postsByYear[year]) {
      postsByYear[year] = []
    }
    postsByYear[year].push(post)
  })

  return postsByYear
}
