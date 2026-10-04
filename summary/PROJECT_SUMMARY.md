# CyberPaw 2026 兽聚官网项目开发与部署全流程总结

本文档汇总记录了从项目立项、技术架构选型、视觉改版、图片纯白化、GitHub 托管部署到 Cloudflare 自定义域名加速的全过程，方便后续维护、交接与二次开发。

---

## 📋 目录
1. [项目概览与定位](#1-项目概览与定位)
2. [全流程里程碑与关键变更](#2-全流程里程碑与关键变更)
3. [技术架构与选型优势](#3-技术架构与选型优势)
4. [项目文件结构清单](#4-项目文件结构清单)
5. [线上部署资产与关键配置](#5-线上部署资产与关键配置)
6. [Cloudflare 自定义域名与国内加速指南](#6-cloudflare-自定义域名与国内加速指南)
7. [后续内容修改与维护指引](#7-后续内容修改与维护指引)

---

## 1. 项目概览与定位

- **项目名称**：星岚圣域 2026 // 第一届哈尔滨小展官方主页
- **主题标语**：寻迹北国冰城 · 相约哈尔滨（一起欢乐地玩耍）
- **视觉风格**：暗色高对比度、赛博霓虹微光、深度参考 **白兽渊 (baishouyuan.cn)** 的全屏沉浸与极简大气排版
- **设计初衷**：专为 GitHub Pages 优化的活动宣传与资讯落地页，具备零构建门槛、毫秒级响应、永久免维护、手机与桌面全自适应的特性。

---

## 2. 全流程里程碑与关键变更

### 里程碑 1：技术架构选型与初版落地
- **技术对比**：对比了“现代纯静态方案（HTML5 + CSS3 + JS）”与“静态生成器（Astro / VitePress）”。
  - 最终选用**纯静态方案**：兽聚网站以视觉冲击、品牌宣发展示和实用指引为主，纯静态具备零 Node/npm 依赖、直接 Git 推送即上线、无 Actions 编译失败风险的巨大优势。
- **初版完成**：搭建了涵盖 Hero 首屏、倒计时、活动看点、日程时间线、门票系统、交通指南、毛毛守则及 FAQ 的完整官网。

### 里程碑 2：门票方案与相关模块彻底剥离
- 根据用户要求，彻底删除了“门票方案与档位”展示模块、购票弹窗（Ticket Modal）及对应交互代码。
- 将顶部操作按钮及首屏引导按钮平滑调整为“加入社群”与“查看日程”，FAQ 同步修改为更契合开放性展会的无门槛参会答疑。

### 里程碑 3：深度参考 baishouyuan.cn 布局重构
抓取并分析了国内知名兽聚官网 **白兽渊（baishouyuan.cn）** 的核心页面结构，完成了全站重构：
1. **全屏沉浸首屏（100vh Hero）**：
   - 满屏主视觉概念底图（`.bgvideo`）搭配氛围微光；
   - 还原白兽渊标志性的发光字体动效（`.glowing-text`）；
   - 悬浮极简顶栏（`.top`）、开幕倒计时胶囊与平滑下滑指示器。
2. **了解更多（官方生态矩阵 · detail_item_icon）**：
   - 4 列大图标交互卡片（哔哩哔哩、官方抖音、WikiFur 兽圈百科专属词条、官方 QQ 群号一键复制）。
3. **图片展示（3D 景深轮播画廊 · Carousel & Lightbox）**：
   - 还原 3D 透视轮播图，左右定制 SVG 箭头切换与圆点导航；
   - 内置**点击任意图片全屏放大预览的 Lightbox 灯箱（`.large_image`）**，支持 `Esc` 键一键退出。
4. **最新资讯（官方宣发卡片 · news_container）**：
   - 3 列图文资讯网格，收录一宣预告、节目报名与《监护人知情同意书》下载指引。
5. **整合实用板块**：
   - 包含 Day 1 / 2 / 3 日程切换、展馆交通（地铁/机场/高铁/协议酒店）与毛毛友好礼仪守则。

### 里程碑 4：全站图片资产纯白化
- 根据用户需求，使用 Python 脚本将项目 `assets/images/` 目录下的所有静态图片资产（首屏大底图 `banner.jpg`、徽标 `logo.jpg`、轮播与资讯图）全部替换为纯白色（`#FFFFFF`）极简底图，方便用户后续替换专属摄影与海报。

### 里程碑 5：GitHub 自动化创建与 Pages 上线
- 本地初始化 Git 主分支（`main`）并打包初次提交；
- 通过用户授权的 GitHub Token，直接调用 GitHub REST API 自动创建公开仓库 `creatrycatQ/cyberpaw`；
- 将本地代码推送到远程主分支，并自动调用 GitHub Pages API 开启静态托管，实现全球秒级上线：
  - 源码仓库：[https://github.com/creatrycatQ/cyberpaw](https://github.com/creatrycatQ/cyberpaw)
  - Pages 默认地址：[https://creatrycatq.github.io/cyberpaw/](https://creatrycatq.github.io/cyberpaw/)

### 里程碑 6：国内网络优化与 Cloudflare 自定义域名绑定
- 针对国内访问原生 GitHub Pages 节点较慢的问题，提供了 Cloudflare CDN 与 Pages 加速方案；
- 用户选择通过 Cloudflare 托管独立域名 **`creatrycat.cn`** 并开启“小黄云”Anycast CDN 代理；
- 协助通过 GitHub API 完成了 `creatrycat.cn` 的 CNAME 绑定，并强调了 Cloudflare SSL 设置为 **Full (完全)** 模式以避免重定向死循环的关键要点。

---

## 3. 技术架构与选型优势

- **结构层 (HTML5)**：严格遵循语义化标签（`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`），针对 SEO 优化了 Title、Meta Keywords 与 Description。
- **表现层 (Vanilla CSS3)**：
  - CSS 自定义属性（Variables）管理全局调色盘与圆角参数；
  - 3D 景深空间转换（`perspective: 1100px; transform-style: preserve-3d;`）；
  - 全屏灯箱毛玻璃拟态遮罩（`backdrop-filter: blur(14px)`）；
  - 完备的移动端/平板/桌面三级响应式断点适配。
- **逻辑层 (原生 JavaScript)**：
  - 实时倒计时精确计算与动态渲染；
  - 3D 轮播图左右步进、自动轮播与悬停暂停逻辑；
  - Lightbox 大图点击放大及键盘快捷键（`←`、`→`、`Esc`）；
  - 剪贴板一键复制与轻量 Toast 提示系统。
- **运维层**：
  - **零构建 (Zero Build)**：无需 Node.js、npm 或 CI/CD 编译打包，代码即成品；
  - **高可用**：代码由 GitHub 托管，结合 Cloudflare 边缘节点，享受 DDoS 防护、免费自动化 SSL 证书与全网近海加速。

---

## 4. 项目文件结构清单

```text
github托管官网/
├── index.html              # 主页面结构（白兽渊风格沉浸式极简排版）
├── style.css               # 全站样式表（3D轮播、发光字体、大图弹窗、响应式）
├── script.js               # 前端交互逻辑（倒计时、3D画廊、大图放大、日程切换）
├── README.md               # 仓库主说明文档
├── CNAME                   # 自定义域名映射配置文件（creatrycat.cn）
├── assets/
│   └── images/             # 静态图片资产（当前已全部替换为纯白图）
│       ├── logo.jpg        # 徽标 / 图标
│       ├── banner.jpg      # 首屏大画幅 / 资讯封面
│       ├── fursuit_highlight.jpg # 画廊展示图 1
│       ├── gallery_stage.jpg     # 画廊展示图 2
│       └── gallery_alley.jpg     # 画廊展示图 3
└── summary/
    └── PROJECT_SUMMARY.md  # 本项目全流程总结文档
```

---

## 5. 线上部署资产与关键配置

| 项目 | 地址 / 配置值 |
| :--- | :--- |
| **自定义独立域名** | [https://creatrycat.cn](https://creatrycat.cn) |
| **GitHub Pages 默认域名** | [https://creatrycatq.github.io/cyberpaw/](https://creatrycatq.github.io/cyberpaw/) |
| **GitHub 源码仓库** | [https://github.com/creatrycatQ/cyberpaw](https://github.com/creatrycatQ/cyberpaw) |
| **部署分支 / 目录** | `main` 分支 / 根目录 `/(root)` |
| **HTTPS 安全加密** | 自动化免费 SSL 证书已开启 |

---

## 6. Cloudflare 自定义域名与国内加速指南

### 核心 DNS 记录配置（Cloudflare 后台）

| 类型 (Type) | 名称 (Name) | 内容 (Content) | 代理状态 (Proxy) | 作用 |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `creatrycat.cn` (根域名) | `creatrycatq.github.io` | **已代理 (橙色小云朵)** | 主域名国内 Anycast CDN 加速 |
| **CNAME** | `www` (推荐添加) | `creatrycat.cn` | **已代理 (橙色小云朵)** | 保证输入 www 时也能正常秒开 |

### ⚠️ 关键设置避坑点
- **SSL/TLS 加密模式**：必须在 Cloudflare 左侧菜单 **「SSL/TLS」** 中选择 **「完全 (Full)」** 或 **「完全 (严格) (Full strict)」**。
  - *原因*：GitHub Pages 内部默认强制 HTTPS，若设置为默认的 Flexible 模式会导致 Cloudflare 用 HTTP 回源，从而引发浏览器的 `ERR_TOO_MANY_REDIRECTS（重定向循环）` 报错。

---

## 7. 后续内容修改与维护指引

当需要更新官网信息（如更换海报图片、修改活动日期或发布新公告）时，非常简单：

1. **修改文字或内容**：
   - 标语、公告与日程：直接在 `index.html` 中修改对应的中文文字。
   - 倒计时目标时间：在 `script.js` 第 8 行修改 `CON_START_DATE`（如 `'2026-10-14T09:00:00'`）。
2. **替换图片**：
   - 将您设计好的新海报或照片命名为相同文件名（如 `banner.jpg`、`logo.jpg` 等），直接覆盖 `assets/images/` 对应文件即可。
3. **提交更新上线**：
   在本地项目终端中执行以下三行命令，10 秒内即可自动同步至 GitHub 并全网生效：
   ```powershell
   git add .
   git commit -m "更新活动内容与海报"
   git push
   ```

---
*文档生成时间：2026年10月 · 由 Antigravity 整理制作*
