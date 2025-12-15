export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
        <p>© 2025 Gmaso. All rights reserved.</p>
        <p className="mt-2">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            渝ICP备18006361号-1
          </a>
        </p>
      </div>
    </footer>
  )
}
