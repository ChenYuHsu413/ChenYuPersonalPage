# 面試官角度 — 常見問答準備

> 以下是針對這個個人作品集網站，面試官可能會問的問題與建議回答方向。

---

## 技術設計決策

**Q: 為什麼選 Vue 3 而不是 React？**

A: 這個專案從 CDN 版 Options API 起步，後來遷移到 Vite + Vue 3 SFC（`<script setup>` Composition API）。選 Vue 3 的原因是：

1. 早期原型用 CDN 引入即可啟動，不需要 build pipeline，降低初始開發門檻
2. Composition API 的 `ref/computed/onMounted` 模型語意清晰，與 React Hooks 思路相近但語法更直覺
3. SFC（`.vue` 單文件元件）把 template、script、style 集中在同一個檔案，比 JSX + CSS-in-JS 更容易上手

如果是大型 SPA 或有 SSR 需求，我會優先選 Next.js。

---

**Q: 你怎麼實作 RWD？用哪些 breakpoint？為什麼這樣選？**

A: 採用 mobile-first 策略，三個主要斷點：
- `768px`：手機 → 平板，hamburger menu 切換，單欄 layout
- `992px`：平板 → 桌面，nav 恢復完整，grid 展開
- `1200px`：大螢幕最大寬度限制，維持可讀性

選這三個的原因是對應 iOS/Android 主流裝置寬度，並參考 Bootstrap 的業界慣例，不依賴 framework 但保持與生態系一致。

---

**Q: GSAP 和 CSS Animation 你會怎麼選？**

A: CSS Animation 適合簡單的 hover/fade，效能好、語法直覺。GSAP 適合有時序控制的複雜 stagger、ScrollTrigger 驅動的入場動畫，這個站需要 scroll-based 的段落依序進場，CSS 難以精確控制 trigger point，所以用 GSAP。但對於 button hover 這種微互動，我仍用 CSS transition，不引入 JS 開銷。

---

## Contact Form

**Q: 這個聯絡表單送出後會發到哪裡？**

A: 已整合 EmailJS（client-side email service），透過 `emailjs.send()` 呼叫，不需要後端伺服器。需要在 emailjs.com 設定：
1. Email Service（綁定 Gmail/Outlook）
2. Email Template（設定信件格式）
3. 填入 `script.js` 中的 `YOUR_SERVICE_ID`、`YOUR_TEMPLATE_ID`、`YOUR_PUBLIC_KEY`

表單有三種狀態：loading（送出中）、success（成功）、error（失敗），並在 6 秒後自動重置，比 `alert()` 提供更好的使用者體驗。

---

## 作品成果

**Q: 這些作品有多少人實際使用過？**

| 專案 | 成果說明 |
|------|----------|
| AI生圖工作室 | 已部署 Streamlit Cloud，可公開存取 |
| 線性回歸分析 | 教學用途，支援即時調整超參數觀察模型收斂 |
| 楊宜修國文補習班 | 真實商業客戶使用中的形象網站 |
| 蘇拉威西蝦 | 個人興趣作品，展示 RWD 與資訊架構能力 |
| 智慧記帳系統 | 串接真實 Stock API，個人每日使用 |

---

## 架構與工程判斷

**Q: 這個站沒有 build 工具，這樣沒有問題嗎？**

A: 目前已有兩個版本並行：

- **CDN 版**（`index.html` + `script.js`）：快速開發原型，無需 build，直接 GitHub Pages 靜態部署
- **Vite 版**（`vite-app/`）：已完成遷移，使用 Vite 5 + Vue 3 SFC，npm 打包 GSAP + EmailJS，bundle JS 84 kB gzip，並設有 GitHub Actions CI/CD

Vite 版的優勢：tree-shaking（只打包用到的 GSAP 模組）、HMR 熱更新開發體驗、明確的模組依賴、元件化維護。CDN 版的優勢：部署門檻幾乎為零，適合快速原型。

---

**Q: 你怎麼確保這個站的效能？**

A: 目前做到的：
- 圖片加上 `loading="lazy"` 屬性
- GSAP/Vue 使用 CDN（有 browser cache）
- CSS 無多餘 framework，只有自己寫的樣式

可以繼續優化的：
- 把 `PikaSheen.jpg` 轉為 WebP 並設 `<picture>` fallback
- 加入 `<link rel="preload">` 對 critical font
- 用 Lighthouse 跑一次評分，針對 LCP/CLS 修正

---

**Q: 你的 SEO 和社群分享設定如何？**

A: 已加入完整的 Open Graph 和 Twitter Card meta tags：
- `og:title`、`og:description`、`og:image`（使用網站截圖）
- `twitter:card: summary_large_image`
- 分享到 LINE / Facebook / Twitter 時會顯示預覽圖

原本只有基本的 `<meta name="description">`，這對社群分享是零效果的。

---

## 延伸問題

**Q: 如果這個站流量突然變很大，你會怎麼處理？**

A: 這是純靜態站，天然適合 CDN 分發（Cloudflare / Vercel Edge）。流量爆增不影響 server，因為沒有 server。唯一的後端呼叫是 EmailJS，有自己的 rate limiting 機制。如果需要擴充功能（如 CMS 管理作品、留言板），我會考慮 Nuxt.js + Supabase 的 serverless 架構。

**Q: 你對這個站最不滿意的地方是什麼？**

A: 原本有兩個痛點，目前都已解決：

1. ~~純 CDN + 單檔架構~~ → 已遷移至 `vite-app/` Vite + Vue 3 SFC，9 個子元件各自負責單一 section
2. ~~Dark mode only~~ → 已實作 CSS 變數切換的 light mode，`localStorage` 持久化，anti-FOUC 處理

現在最想改進的地方：把 `PikaSheen.jpg` 轉成 WebP 格式，並跑一次 Lighthouse 針對 LCP 分數優化。
