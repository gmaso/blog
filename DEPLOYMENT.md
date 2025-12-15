# 部署指南

本博客支持静态导出，可以部署到 GitHub Pages 或其他静态托管服务。

## 部署到 GitHub Pages

### 方法一：使用 GitHub Actions 自动部署（推荐）

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Add static export configuration"
   git push origin master
   ```

2. **配置 GitHub Pages**
   - 进入你的 GitHub 仓库
   - 点击 `Settings` > `Pages`
   - 在 `Source` 下选择 `GitHub Actions`

3. **自动部署**
   - 每次推送到 `master` 分支时，GitHub Actions 会自动构建并部署
   - 部署完成后，访问 `https://<你的用户名>.github.io/<仓库名>/`

### 方法二：手动部署

1. **构建静态文件**
   ```bash
   npm run build
   ```

2. **部署 out 目录**
   - 将 `out` 目录中的所有文件推送到 `gh-pages` 分支
   - 或者使用 GitHub Pages 的其他部署方式

## 部署到其他平台

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
1. 连接 GitHub 仓库
2. 构建命令：`npm run build`
3. 发布目录：`out`

### 自定义服务器
将 `out` 目录中的文件上传到任何支持静态文件的 Web 服务器（如 Nginx、Apache）。

## 本地预览静态导出

```bash
# 构建
npm run build

# 使用任何静态服务器预览，例如：
npx serve out
```

## 配置说明

静态导出配置在 `next.config.ts` 中：

```typescript
const nextConfig: NextConfig = {
  output: 'export',        // 启用静态导出
  images: {
    unoptimized: true,     // 禁用图片优化（静态导出需要）
  },
}
```

## 注意事项

- 静态导出不支持某些 Next.js 功能（如 API Routes、ISR）
- 所有页面都会在构建时生成为静态 HTML
- 图片优化功能已禁用，建议使用优化后的图片
