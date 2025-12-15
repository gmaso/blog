'use client'

import { useEffect } from 'react'

export default function CodeBlock() {
  useEffect(() => {
    // 为所有代码块添加复制按钮
    const codeBlocks = document.querySelectorAll('pre[class*="language-"]')

    codeBlocks.forEach((block) => {
      // 检查是否已经添加过复制按钮
      if (block.querySelector('.copy-button')) {
        return
      }

      // 创建复制按钮容器
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'copy-button-container'

      // 创建复制按钮
      const button = document.createElement('button')
      button.className = 'copy-button'
      button.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg class="check-icon hidden" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="copy-text">复制</span>
        <span class="copied-text hidden">已复制</span>
      `

      // 添加点击事件
      button.addEventListener('click', async () => {
        const code = block.querySelector('code')
        if (!code) return

        const text = code.textContent || ''

        try {
          await navigator.clipboard.writeText(text)

          // 显示成功状态
          const copyIcon = button.querySelector('.copy-icon')
          const checkIcon = button.querySelector('.check-icon')
          const copyText = button.querySelector('.copy-text')
          const copiedText = button.querySelector('.copied-text')

          copyIcon?.classList.add('hidden')
          checkIcon?.classList.remove('hidden')
          copyText?.classList.add('hidden')
          copiedText?.classList.remove('hidden')
          button.classList.add('copied')

          // 2秒后恢复
          setTimeout(() => {
            copyIcon?.classList.remove('hidden')
            checkIcon?.classList.add('hidden')
            copyText?.classList.remove('hidden')
            copiedText?.classList.add('hidden')
            button.classList.remove('copied')
          }, 2000)
        } catch (err) {
          console.error('Failed to copy:', err)
        }
      })

      buttonContainer.appendChild(button)

      // 将按钮添加到代码块
      const wrapper = document.createElement('div')
      wrapper.className = 'code-block-wrapper'
      block.parentNode?.insertBefore(wrapper, block)
      wrapper.appendChild(block)
      wrapper.appendChild(buttonContainer)
    })
  }, [])

  return null
}
