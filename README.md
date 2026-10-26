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

本地仓库已初始化完成，`site` 已配为 `https://iuorz.github.io`，
remote 已指向 `https://github.com/iuorz/iuorz.github.io.git`。

**只剩两步：**

1. 在 GitHub 新建仓库，名字填 `iuorz.github.io`，选 **Public**，
   **不要**勾选 Add a README / .gitignore / license（会造成首次 push 冲突）。

2. 回来执行：

   ```bash
   git push -u origin main
   ```

3. 到仓库 **Settings → Pages → Build and deployment → Source**，选 **GitHub Actions**。

之后每次 `git push` 到 `main`，`.github/workflows/deploy.yml` 会自动构建并发布，
大概 1 分钟线上生效。

> 仓库名必须与用户名完全一致（`iuorz.github.io`）。如果改成别的名字（比如 `blog`），
> 访问路径会变成 `https://iuorz.github.io/blog/`，此时必须在 `astro.config.mjs` 里加
> `base: '/blog'`，否则所有样式和链接都会 404。

## 提交身份

本仓库使用 GitHub 隐私邮箱，不暴露真实邮箱：

```bash
git config user.name  "iuorz"
git config user.email "269073377+iuorz@users.noreply.github.com"
```

这是仓库级配置，不影响其他项目。注意系统的全局配置里 `user.email` 是 `aa123456`，
不是有效邮箱格式，其他项目往 GitHub 提交时建议改掉。


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
