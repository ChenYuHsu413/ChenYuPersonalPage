# Glassmorphism Redesign Log

> 整理來源：2026-06-11 與 Claude 討論並改寫個人網頁的紀錄  
> 專案：ChenYuPersonalPage / Vite + Vue 3  
> 分支：`glassmorphism-redesign`

## 任務目標

- 將個人作品集網站整體視覺改為 glassmorphism 風格。
- 保留既有功能、資料、圖片、連結與互動邏輯。
- 不更換技術棧，不加入大型 UI library。
- 將玻璃效果參數集中為 CSS variables，方便後續微調。
- 保持深淺色主題、響應式、EmailJS、GSAP 動畫與專案 Modal 正常運作。

## 改版前要求

1. 先檢查 Git 狀態，若有未提交變更先建立穩定版 commit。
2. 所有修改集中在 `glassmorphism-redesign` 分支。
3. 動工前先盤點 `src/` 的頁面、元件、狀態與互動。
4. 視覺重構只動樣式與必要的背景元件，不重寫元件 business logic。
5. 驗收需執行 `npm run dev` 與 `npm run build`。

## 功能盤點摘要

- 無 Vue Router：目前是 one-page portfolio，以錨點和平滑捲動切換區塊。
- 無 Pinia / Vuex：狀態集中在 `App.vue`，透過 props / emits 與子元件互動。
- 主要依賴：Vue 3.5、Vite 5、GSAP ScrollTrigger、EmailJS、Font Awesome CDN。
- 全站樣式集中在 `vite-app/src/style.css`，主題由 `data-theme` 與 CSS variables 控制。

### App.vue 狀態與互動

| 功能 | 說明 |
|---|---|
| 即時時鐘 | 每秒更新台北時間，傳給 Hero 時鐘 widget |
| 捲動偵測 | 超過 50px 後切換 header 樣式與回頂部按鈕 |
| 平滑捲動 | 依 header 高度計算區塊位置 |
| 主題切換 | `data-theme` + `localStorage`，搭配 anti-FOUC script |
| GitHub API | 取得公開 repo 數，顯示在 About 統計卡 |
| 作品篩選 | `all` / `project` / `homework` tabs |
| Modal 控制 | 開關專案詳情、鎖定 body scroll、支援 Esc 關閉 |
| 聯絡表單 | EmailJS 寄通知與自動回覆，含 loading / success / error |
| GSAP 動畫 | 首屏與區塊進場、ScrollTrigger stagger 動畫 |

### 元件盤點

| 元件 | 功能 |
|---|---|
| `AppHeader` | 導覽、主題切換、行動選單、錨點捲動 |
| `HeroSection` | 個人介紹、CTA、即時台北時鐘 |
| `AboutSection` | 簡介、統計卡、GitHub repo 數 |
| `ResumeSection` | 經歷時間軸與技能標籤 |
| `HonorsSection` | 獎項卡片與徽章樣式 |
| `WorkSection` | 作品篩選 tabs、專案卡片、開啟 modal |
| `ProjectModal` | 專案詳情、圖片、技術標籤與 source link |
| `ContactSection` | 聯絡資訊、EmailJS 表單、提交狀態 |
| `AppFooter` | 版權、外連與頁內錨點 |
| `GlassBackground` | 全域背景、光暈、網格、幾何裝飾、液態玻璃 SVG filter |

## 已完成的視覺重構

- 新增全域玻璃背景元件：深紫至深藍漸層、光暈、視差圖層、網格、幾何裝飾與滑鼠跟隨光源。
- 重設玻璃卡片配方，集中管理 `--glass-bg`、`--glass-blur`、`--glass-saturate`、`--glass-border`、`--glass-shadow`。
- 深色模式降低白霧覆蓋，玻璃模糊從 14px 調到 6px，讓背景網格更容易透出。
- 在 `GlassBackground.vue` 定義 `#liquid-glass` SVG 位移濾鏡。
- 使用 `html.liquid-ok` 僅在 Chromium 嘗試 `backdrop-filter: url(#liquid-glass)`。
- 行動版退回純 blur + saturate，避免 GPU 負擔。

## 調參過程重點

1. 初版液態折射使用卡片邊緣環形遮罩，但造成邊緣破碎與內框。
2. 移除環形遮罩，改為更溫柔的全卡片位移濾鏡。
3. 折射強度從 14 調到 24，讓波紋更明顯。
4. 背景細節不足時折射不易被肉眼看見，因此加入網格與幾何圖形。
5. `blur(14px)` 會吃掉 1px 網格，改為 `blur(6px)` 與 1.5px 網格線。
6. 使用者回報卡片內仍像一片霧，最後改為將 SVG filter 直接串進卡片 `backdrop-filter`，並透過 Chromium 偵測啟用。

## 目前注意事項

- `backdrop-filter: url(#liquid-glass)` 屬瀏覽器支援度較不穩定的進階效果。
- Chromium / Edge 可能支援較好；Firefox / Safari 預期退回一般玻璃模糊。
- 行動裝置已設定退回純模糊，避免效能風險。
- 若液態折射過強或過弱，可調整 `feDisplacementMap scale`、`--glass-blur`、`--grid-line` 與 `.bg-grid` 線寬。

## 驗證紀錄

- 2026-06-11 16:06 執行 `npm run build`：通過。
- Build output：
  - CSS：`dist/assets/index-ClqstKvJ.css`
  - JS：`dist/assets/index-CCY7FmcL.js`

## 後續建議

- 用實體 Chromium / Edge 瀏覽器檢查液態折射是否符合肉眼觀感。
- 若卡片仍過霧，可把 `--glass-bg` alpha 再降一點，或將 `--glass-blur` 調至 4px。
- 若折射造成可讀性下降，保留網格與光暈，移除 `html.liquid-ok` 的 url filter，維持純 glassmorphism。
