# IU 的博客

基于 [Astro](https://astro.build) 的静态博客，部署目标是 GitHub Pages。

## 本地运行

**双击 `dev.cmd`** 即可启动，然后浏览器打开 http://localhost:4321

> 项目要求 Node.js ≥22.23.4。系统默认的 Node 是 22.22.2，版本不够会直接报错，
> 所以 `dev.cmd` 里已经把 PATH 指向了便携版 `D:\WorkBuddy\nodejs\node-v22.23.4-win-x64`。
> 如果以后把这个目录删了，需要重新下载 node 或升级系统 Node。

命令行方式：

```bash
export PATH="/d/WorkBuddy/nodejs/node-v22.23.4-win-x64:$PATH"
npm run dev      # 开发预览，热更新
npm run build    # 构建到 dist/
npm run preview  # 预览构建结果
```

## 写一篇新文章

在 `src/content/blog/` 下新建 `.md` 文件，开头加 frontmatter：

```yaml
---
title: 文章标题
description: 一句话摘要，会显示在列表里
pubDate: 2026-10-26
tags: ['随笔']
---
```

正文直接写 Markdown。文件名决定 URL：`my-post.md` → `/posts/my-post`。

- 草稿：加一行 `draft: true`，不生成页面、不进列表
- 图片：放到 `public/images/`，正文里用 `/images/xxx.png` 引用

## 改站点信息

`src/consts.ts` 里改站点名、简介、作者和导航。

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库，**仓库名必须是 `<你的用户名>.github.io`**，这样访问地址才是
   `https://<你的用户名>.github.io`，不需要额外配 base 路径。

2. 改 `astro.config.mjs` 里的 `site`：

   ```js
   site: 'https://<你的用户名>.github.io',
   ```

3. 把项目推上去：

   ```bash
   git init
   git add .
   git commit -m "init blog"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<你的用户名>.github.io.git
   git push -u origin main
   ```

4. 到仓库 **Settings → Pages → Build and deployment → Source**，选 **GitHub Actions**。

5. 之后每次 `git push` 到 `main`，`.github/workflows/deploy.yml` 会自动构建并发布，
   大概 1 分钟上线。

> 如果仓库名不是 `<用户名>.github.io`（例如叫 `blog`），访问路径会变成
> `https://<你的用户名>.github.io/blog/`，此时必须在 `astro.config.mjs` 里加 `base: '/blog'`，
> 否则所有样式和链接都会 404。

## 目录结构

```text
src/
├── content/blog/     文章（Markdown）
├── pages/            路由，文件路径即 URL
├── layouts/          页面骨架
├── styles/           全局样式
└── consts.ts         站点配置
public/               静态资源（图片、favicon）
```
