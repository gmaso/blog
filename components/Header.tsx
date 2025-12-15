import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-blue-500 transition-colors">
            Gmaso
          </Link>
          <nav className="space-x-6">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              首页
            </Link>
            <Link href="/archives" className="hover:text-blue-500 transition-colors">
              归档
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
