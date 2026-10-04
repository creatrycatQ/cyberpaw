# CyberPaw (星岚圣域) 官网项目开发与部署全流程总结

本文档汇总记录了从项目立项、技术架构选型、视觉改版、白兽渊风格重构、明暗主题自适应、画廊防冲突重构、全站图片标准化留白化、GitHub 托管部署到 Cloudflare 自定义域名加速的全流程，方便后续维护、交接与二次开发。

---

## 📋 目录
1. [项目概览与定位](#1-项目概览与定位)
2. [全流程里程碑与关键变更回顾](#2-全流程里程碑与关键变更回顾)
3. [核心技术架构与特色功能](#3-核心技术架构与特色功能)
4. [全站图片资产与一键替换清单](#4-全站图片资产与一键替换清单)
5. [项目文件结构清单](#5-项目文件结构清单)
6. [线上部署资产与关键配置](#6-线上部署资产与关键配置)
7. [Cloudflare 自定义域名与国内加速指南](#7-cloudflare-自定义域名与国内加速指南)
8. [后续内容修改与维护指引](#8-后续内容修改与维护指引)

---

## 1. 项目概览与定位

- **项目名称**：星岚圣域 2026 // 第一届哈尔滨小展官方主页
- **主题标语**：寻迹北国冰城 · 相约哈尔滨（一起欢乐地玩耍）
- **视觉风格**：极简高级白底（白天）与深色赛博霓虹（夜间）双模自适应，深度参考 **白兽渊 (baishouyuan.cn)** 的全屏沉浸与大气排版
- **设计初衷**：专为 GitHub Pages 优化的活动宣传与资讯落地页，具备**零构建门槛、毫秒级响应、永久免维护、手机与桌面全自适应**的特性。

---

## 2. 全流程里程碑与关键变更回顾

### 里程碑 1：技术架构选型与初版落地
- **技术决策**：选用**现代原生纯静态方案（HTML5 + CSS3 + JS）**，摒弃笨重的构建流工具。具备零 Node/npm 依赖、直接 Git 推送即上线、无 Actions 编译失败风险的巨大优势。
- **初版搭建**：完成了涵盖 Hero 首屏、倒计时、活动看点、日程时间线、交通指南、毛毛守则及社交弹窗的完整框架。

### 里程碑 2：深度参考 baishouyuan.cn 布局与极简化重构
- **全屏沉浸首屏（100vh Hero）**：置入全屏主视觉概念底图（`.bgvideo`），搭配白兽渊发光字体（`.glowing-text`）与极简磨砂顶栏；
- **了解更多（官方生态矩阵）**：4 列交互卡片（B站、抖音、WikiFur 词条、QQ 交流群）；
- **移除冗余外露文案**：彻底移除了“参考 baishouyuan.cn 开源免维护”、“盛会已盛大开幕！”等多余标签；全面排查清理了“极客兽聚”历史遗留词汇。

### 里程碑 3：官方视觉资产绑定（Logo 与首屏大图）
- **官方 Logo**：应用用户提供的专属高解析度 [logo.jpg](file:///c:/Users/CreatryCat/Documents/项目/github托管官网/assets/images/logo.jpg)，统一至网站图标（Favicon）、导航栏、页脚品牌区及社群弹窗；
- **首屏主视觉海报**：置入用户指定的官方主题主视觉海报 [poster_bottom_1789174651117_axj4nr.jpg](file:///c:/Users/CreatryCat/Documents/项目/github托管官网/assets/images/poster_bottom_1789174651117_axj4nr.jpg)，打造强烈的现场沉浸感。

### 里程碑 4：白天亮白 / 夜晚暗黑双模式自适应
- **白天模式（默认）**：清爽高雅的白底现代风格，纯净高对比度文字与淡灰卡片；
- **夜间模式（自动切换）**：本地时间处于 18:00 至次日 06:00 期间，或用户操作系统偏好暗色时，自动平滑切入深色赛博暗黑主题，配以发光边框与微光投影。

### 里程碑 5：画廊 7 图 3D 轮播与翻页控制栏防冲突重构
- **7 张图片画廊**：轮播项扩展为标准的 7 个卡片位置，去除画面内部文字，凸显纯净摄影视觉；
- **按键防冲突重构**：将原本悬浮在图片内部、容易造成遮挡和误触的左/右箭头按钮移出，与 7 个跳页小圆点整合成**图片下方的独立悬浮控制舱（`.carousel-controls-bar`）**，彻底杜绝翻页按钮与图片卡片的视觉和点击冲突；
- **交互完善**：点击中间卡片触发全屏高清 Lightbox 灯箱预览；鼠标悬停在控制栏或轮播区域时自动暂停播放。

### 里程碑 6：全站图片资产标准化与一键替换体系
- **标准留白占位图**：
  - 画廊 7 张（`gallery_1.jpg` ~ `gallery_7.jpg`）
  - 资讯 3 张（`news_1.jpg` ~ `news_3.jpg`）
  全部生成为极简灰白质感占位图，带编号与替换指引，页面完整不塌陷、不报破损；
- **零代码覆盖替换**：用户只需准备好照片，重命名为对应文件名放入 `assets/images/` 即可直接生效；
- **目录说明文档**：新建 [assets/images/README.md](file:///c:/Users/CreatryCat/Documents/项目/github托管官网/assets/images/README.md)，包含详细尺寸与文件位置表格。

### 里程碑 7：GitHub Pages 自动化托管与 Cloudflare 国内加速
- 源码仓库托管于 [https://github.com/creatrycatQ/cyberpaw](https://github.com/creatrycatQ/cyberpaw)；
- 绑定独立自定义域名 **[https://creatrycat.cn](https://creatrycat.cn)**；
- 通过 Cloudflare Anycast CDN 实现国内网络节点毫秒级秒开与自动化 Full SSL 安全加速。

---

## 3. 核心技术架构与特色功能

- **结构层 (HTML5)**：严格遵循语义化规范，针对移动端与桌面端自适应优化；
- **表现层 (Vanilla CSS3)**：
  - CSS 自定义变量驱动的双主题切换系统（`light` / `dark`）；
  - 3D 景深轮播空间（`perspective: 1100px; transform-style: preserve-3d;`）；
  - 毛玻璃拟态遮罩（`backdrop-filter: blur(14px)`）；
  - 响应式断点适配手机屏幕与宽屏。
- **逻辑层 (原生 JavaScript)**：
  - 智能时钟检测（自动判断白天亮白 / 夜晚暗黑模式）；
  - 3D 轮播图控制栏驱动、自动轮播与悬停暂停；
  - Lightbox 灯箱全屏大图查看（支持背景点击与快捷键退出）；
  - 一键复制官方群号并伴随轻量 Toast 提示。
- **运维与架构层**：
  - **Zero Build（零构建）**：无需任何前端构建工具，原生文件即发布包；
  - **CDN 加速**：依托 Cloudflare 全球与近海节点，永久免维护。

---

## 4. 全站图片资产与一键替换清单

全站所有图片均存放于 [assets/images/](file:///c:/Users/CreatryCat/Documents/项目/github托管官网/assets/images/) 目录。用户覆盖上传同名文件即可更新，无需修改任何代码：

| 文件名 | 对应位置 | 建议尺寸 / 比例 | 说明 |
| :--- | :--- | :--- | :--- |
| **`logo.jpg`** | 🐾 全站 Logo | 512×512 (1:1) | 导航栏、页脚、弹窗统一使用 |
| **`poster_bottom_1789174651117_axj4nr.jpg`** | 🌌 首页首屏主视觉海报 | 1920×1080 (16:9) | 第一大屏的沉浸式主背景海报 |
| **`gallery_1.jpg` ~ `gallery_7.jpg`** | 📸 图片展示 · 7张轮播图 | 1080×700 (16:10) | 编号留白占位，点击可大图预览 |
| **`news_1.jpg` ~ `news_3.jpg`** | 📰 最新资讯 · 3篇新闻封面 | 800×500 (16:10) | 官方公告、节目招募、资料下载封面 |

---

## 5. 项目文件结构清单

```text
github托管官网/
├── index.html              # 主页面结构（双主题、7图轮播、白兽渊风格极简排版）
├── style.css               # 全站样式表（亮暗主题变量、3D轮播、独立控制舱、响应式）
├── script.js               # 前端交互逻辑（智能明暗检测、轮播切换、全屏灯箱、复制提示）
├── README.md               # 项目主说明文档
├── CNAME                   # 域名解析配置（creatrycat.cn）
├── assets/
│   └── images/             # 图片资产目录
│       ├── README.md       # 文件夹内放图与尺寸替换指引
│       ├── logo.jpg        # 官方 Logo 图标
│       ├── poster_bottom_1789174651117_axj4nr.jpg # 首屏大图
│       ├── gallery_1.jpg ~ gallery_7.jpg # 画廊 7 张标准化占位图
│       └── news_1.jpg ~ news_3.jpg       # 资讯 3 张标准化占位图
└── summary/
    └── PROJECT_SUMMARY.md  # 本项目全流程总结归档文档
```

---

## 6. 线上部署资产与关键配置

| 项目 | 地址 / 配置值 |
| :--- | :--- |
| **自定义独立域名** | [https://creatrycat.cn](https://creatrycat.cn) |
| **GitHub Pages 默认域名** | [https://creatrycatq.github.io/cyberpaw/](https://creatrycatq.github.io/cyberpaw/) |
| **GitHub 源码仓库** | [https://github.com/creatrycatQ/cyberpaw](https://github.com/creatrycatQ/cyberpaw) |
| **托管分支 / 目录** | `main` 分支 / 根目录 `/(root)` |
| **HTTPS 安全加密** | 自动化免费 SSL 证书已开启 |

---

## 7. Cloudflare 自定义域名与国内加速指南

### 核心 DNS 记录配置（Cloudflare 后台）

| 类型 (Type) | 名称 (Name) | 内容 (Content) | 代理状态 (Proxy) | 作用 |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `creatrycat.cn` (根域名) | `creatrycatq.github.io` | **已代理 (橙色小云朵)** | 主域名国内 Anycast CDN 加速 |
| **CNAME** | `www` (推荐添加) | `creatrycat.cn` | **已代理 (橙色小云朵)** | 保证输入 www 时也能秒开 |

### ⚠️ 关键设置避坑点
- **SSL/TLS 加密模式**：必须在 Cloudflare 左侧菜单 **「SSL/TLS」** 中选择 **「完全 (Full)」** 或 **「完全 (严格) (Full strict)」**，避免因 HTTP 回源引起重定向死循环。

---

## 8. 后续内容修改与维护指引

1. **文字与资讯内容修改**：
   - 在 [index.html](file:///c:/Users/CreatryCat/Documents/项目/github托管官网/index.html) 中直接修改对应的中文文字。
2. **替换图片（最简便）**：
   - 准备好照片，重命名为对应文件名（如 `gallery_1.jpg`、`news_1.jpg` 等），直接覆盖放入 [assets/images/](file:///c:/Users/CreatryCat/Documents/项目/github托管官网/assets/images/) 即可。
3. **提交上线**：
   在项目终端执行以下命令，10 秒内即可自动同步至 GitHub 并全网生效：
   ```powershell
   git add .
   git commit -m "更新内容与照片"
   git push
   ```

---
*文档更新时间：2026年10月 · 完整归档制作*
