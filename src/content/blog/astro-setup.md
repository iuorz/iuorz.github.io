---
title: 用 Astro 搭一个静态博客
description: 从零建站到部署到 GitHub Pages，一份可以直接照做的笔记。
pubDate: 2026-10-26
tags: ['Astro', '工具']
---

这个博客就是按下面这套流程搭起来的，全程不需要服务器，也不需要花钱。

## 为什么选 Astro

选它主要是三个原因：

| 需求 | Astro 的表现 |
| --- | --- |
| 首屏要快 | 默认输出纯 HTML，不加载多余 JS |
| 写作要顺手 | 直接写 Markdown，和笔记软件体验接近 |
| 部署要简单 | 构建产物就是一堆静态文件，扔哪都能跑 |

相比 Hexo 和 Hugo，Astro 的模板语法更接近现代前端写法；相比 Next.js，它没有把「写博客」这件事复杂化。

## 项目结构

搭好之后，真正需要关心的只有这几个地方：

```text
blog/
├── src/
│   ├── content/blog/     ← 文章都放这里，一个 .md 一篇文章
│   ├── pages/            ← 路由，文件路径就是 URL
│   ├── layouts/          ← 页面骨架
│   ├── styles/           ← 样式
│   └── consts.ts         ← 站点名、导航等配置
└── astro.config.mjs
```

`src/pages/index.astro` 对应首页，`src/pages/about.astro` 对应 `/about`。路由不需要额外配置，文件放在哪，访问路径就是哪。

## 写一篇新文章

在 `src/content/blog/` 下新建一个 Markdown 文件，比如 `my-post.md`，开头加上：

```yaml
---
title: 文章标题
description: 一句话摘要，会显示在列表和搜索结果里
pubDate: 2026-10-26
tags: ['随笔']
---
```

下面正常写正文就行。文件名决定 URL：`my-post.md` 对应 `/posts/my-post`。

## 本地预览

```bash
npm install
npm run dev
```

打开 `http://localhost:4321` 就能看到效果，改文件会自动刷新。

## 部署

构建产物在 `dist/` 目录：

```bash
npm run build
```

把它推到 GitHub，用 Actions 自动构建并发布到 Pages。仓库里已经配好了 `.github/workflows/deploy.yml`，push 到 `main` 分支就会自动部署，不需要手动操作。

## 几个踩过的坑

- **不要用平台默认的二级域名做长期地址**。换域名等于换站点，之前分享出去的链接全部失效，搜索引擎也要重新收录。
- **图片放 `public/` 目录**，引用路径写 `/images/xxx.png`，不要写相对路径，否则文章嵌套层级一变就全挂。
- **构建失败先看 Node 版本**。`package.json` 里的 `engines` 字段规定了最低版本，版本不符会直接报错。
