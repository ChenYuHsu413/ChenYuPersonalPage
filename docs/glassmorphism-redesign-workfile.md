# Glassmorphism Redesign 工作檔案

## 基本資訊

| 項目 | 內容 |
|---|---|
| 日期 | 2026-06-11 |
| 分支 | `glassmorphism-redesign` |
| 專案 | ChenYuPersonalPage |
| 技術棧 | Vite 5 + Vue 3 + GSAP + EmailJS |
| 工作類型 | 視覺重構、背景元件強化、文件整理 |

## 本次交付

- `log.md`：將 Claude 討論紀錄整理成可讀版本。
- `docs/glassmorphism-redesign-workfile.md`：本次工作交付與驗收檢查表。
- `docs/dev-log.md`：依專案工作規範追加最新開發紀錄。
- `README.md`：補上 redesign 狀態與文件索引。
- `.gitignore`：排除本機 `.claude/settings.local.json`。

## 程式改動摘要

| 檔案 | 改動 |
|---|---|
| `vite-app/src/components/GlassBackground.vue` | 新增背景視差層、滑鼠光源、幾何元素、液態玻璃 SVG filter、Chromium 偵測 |
| `vite-app/src/style.css` | 更新 glass variables、背景網格、幾何裝飾、液態玻璃 fallback、行動版降級 |

## 驗收檢查

| 項目 | 狀態 | 備註 |
|---|---|---|
| Vite build | 通過 | `npm run build` |
| 既有 Vue 架構 | 保留 | 未更換框架 |
| Vue Router | 不適用 | 專案為單頁錨點式網站 |
| Pinia / Vuex | 不適用 | 狀態集中於 `App.vue` |
| 深淺色主題 | 保留 | CSS variables 同步調整 |
| EmailJS 表單 | 保留 | 未改寫表單邏輯 |
| GSAP 動畫 | 保留 | 背景另加 CSS/RAF 動畫 |
| 行動版 fallback | 已處理 | 停用液態 url filter，退回純 blur |

## 可調參數

| 位置 | 參數 | 用途 |
|---|---|---|
| `GlassBackground.vue` | `feDisplacementMap scale="24"` | 液態折射強度 |
| `style.css` | `--glass-blur: 6px` | 玻璃模糊程度 |
| `style.css` | `--glass-saturate: 150%` | 玻璃後方色彩飽和度 |
| `style.css` | `--grid-line` | 背景網格可見度 |
| `style.css` | `.bg-grid` 1.5px | 網格線寬 |

## Git 操作備忘

```bash
# 查看目前分支和工作區
git status --short --branch

# 查看與 main 的完整差異
git diff main...glassmorphism-redesign

# 本機驗證
cd vite-app
npm run build

# 推送目前分支
git push origin glassmorphism-redesign
```

## 風險與決策

- 決策：保留 CSS-only / browser-native glassmorphism，不引入大型 UI 或 shader library。
- 決策：進階液態折射只在 Chromium 啟用，其他瀏覽器保守降級。
- 風險：`backdrop-filter: url(#liquid-glass)` 支援度不穩，真機 GPU 渲染可能與無頭瀏覽器不同。
- 風險：網格加強後視覺更明顯，但也可能讓背景略忙，需要依肉眼觀感微調。
