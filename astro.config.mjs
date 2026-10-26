// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 部署到 https://<用户名>.github.io 这个仓库时，改成你的地址
  // 如果部署到 github.io 的子路径（如 /blog），还需要加 base: '/blog'
  site: 'https://iuorz.github.io',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
