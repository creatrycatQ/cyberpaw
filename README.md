# 星岚圣域 2026 // 第一届哈尔滨小展官方主页 (参考 baishouyuan.cn 沉浸式极简布局)

🐾 **专为 GitHub Pages 优化的沉浸式现代极简兽聚官网**。
深度参考 **白兽渊 (baishouyuan.cn)** 官网的视觉动效与版块布局，采用原生 HTML5 + 现代化 Vanilla CSS + 原生 JavaScript 打造，**零构建环境依赖、零 Node.js 门槛、免维护**，代码推送到 GitHub 即可秒级上线。

---

## 🌟 核心布局与特色（参考 baishouyuan.cn）

1. **沉浸式全屏首屏（Fullscreen 100vh Hero）**：
   - 气势恢宏的满屏底图/主视觉概念 KV（`.bgvideo`）
   - **白兽渊标志性发光文字动效（`.glowing-text`）**：
     - 主标题：`星岚圣域 // 2026`
     - 诗意主题标语：`寻迹北国冰城 · 相约哈尔滨`
   - 动态开幕倒计时胶囊栏与平滑向下滚动引导指示器
2. **了解更多（官方生态矩阵 · detail_item_icon）**：
   - 4 列大图标徽章交互卡片：
     - 📺 **哔哩哔哩 (Bilibili)** 官方动态与舞台视频录播
     - 📱 **官方抖音 / 小红书** 现场精选花絮短视频
     - 📖 **WikiFur 兽圈百科** 专属词条与展会档案
     - 💬 **官方 QQ 交流群** 一键复制与社群连接
3. **图片展示（3D 景深轮播画廊 · Carousel & Lightbox）**：
   - **3D 透视轮播图**：支持左右 SVG 箭头切换、圆点指示器、自动轮播与悬停暂停
   - **大图点击全屏放大（`.large_image` 灯箱）**：点击任意轮播图片即可沉浸式全屏预览高清大图，按 `Esc` 或点击遮罩即可关闭
4. **最新资讯（官方宣发与资料下载 · news_container）**：
   - 包含一宣预告、节目报名、参会须知及《监护人知情同意书》下载指引
5. **活动日程（Day 1 / 2 / 3 交互时间线）**：
   - 分天选项卡切换，签到、巡游、市集、夜场一览无余
6. **会场交通与周边住宿**：
   - 展馆地图模拟定位、地铁/高铁/机场乘车指南及协议酒店信息
7. **毛毛友好参会礼仪与行为守则**：
   - 尊重毛毛、禁用强闪光灯、更衣室隐私防护、关怀降温
8. **全设备自适应**：
   - 手机端抽屉菜单、平板及宽屏电脑完美适配

---

## 🚀 部署到 GitHub Pages（仅需 3 步）

### 第一步：创建 GitHub 仓库并上传代码
将本项目的所有文件（`index.html`, `style.css`, `script.js`, `assets/` 目录）推送到您的 GitHub 仓库 `main` 分支。

### 第二步：开启 GitHub Pages
1. 打开您的 GitHub 仓库页面，点击顶部 **Settings**（设置）。
2. 在左侧菜单中找到 **Pages**。
3. 在 **Build and deployment** 下方的 **Source** 选择：
   - **Deploy from a branch**
4. 在 **Branch** 下方选择：
   - 分支选 `main`，文件夹选 `/(root)`，点击 **Save**。

### 第三步：访问您的官网
等待约 30 秒至 1 分钟，GitHub 页面顶部就会显示绿色的成功提示与网址：
```
Your site is live at https://<你的用户名>.github.io/<仓库名>/
```

---

## 🛠️ 如何自定义修改内容

| 需修改内容 | 文件位置 | 说明 |
| :--- | :--- | :--- |
| **兽聚名称与标语** | `index.html` 中的 `<title>`, `bgvideo1`, `bgvideo2` | 直接修改文字即可 |
| **开幕倒计时目标** | `script.js` 第 7 行 `CON_START_DATE` | 修改为如 `'2026-10-14T09:00:00'` |
| **四大社交平台链接** | `script.js` 中的 `openSocialLink` 函数 | 修改为您的真实 B站空间、抖音主页链接 |
| **官方 QQ 群号** | `index.html` 底部 `contact-modal` 与 `detail_item_icon` | 修改 QQ群号（点击一键复制） |
| **轮播画廊图片** | `assets/images/` 目录 | 替换为本届兽聚官方 KV 海报与现场照片 |
| **最新资讯内容** | `index.html` 中的 `news_container` 区块 | 修改新闻标题、日期与发布公告 |

---

## 📂 目录结构

```text
├── index.html              # 网页结构（参考 baishouyuan.cn 沉浸式极简布局）
├── style.css               # 3D 轮播、发光字体、大图弹窗与响应式设计
├── script.js               # 3D 轮播逻辑、大图全屏放大、倒计时与社群交互
├── README.md               # 部署与配置说明
└── assets/
    └── images/
        ├── logo.jpg        # 兽聚徽标 / Favicon
        ├── banner.jpg      # 主视觉 KV 海报
        ├── fursuit_highlight.jpg # 核心亮点特写照片
        ├── gallery_stage.jpg     # 舞台秀演实况照片
        └── gallery_alley.jpg     # 同人市集照片
```

---

参考 baishouyuan.cn · 纯静态免维护架构 · 祝您的兽聚活动圆满成功！🐾
