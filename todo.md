# TODO — Code Review Follow-ups

來源：`HEAD~1..HEAD`（SketchUp archive 專案 commit `6e117c0`）。
最後更新：2026-06-13 — 全部已修正並驗證通過。

---

## ✅ 已修正

### 1. `getCategoryLabel` 對未知 category 會洩漏原始字串
- **位置**：`vite-app/src/App.vue:54`
- **改法**：把 `labels` 提到模組層常數 `CATEGORY_LABELS`，並用 `?? 'Project'` 取代 `|| category` 的 fallback。未知或缺失的 category 現在會顯示 `Project`，不會出現原始 slug 或 `undefined`。

### 2. `v-if="selectedProject.gallery"` 把空陣列當成 truthy
- **位置**：`vite-app/src/components/ProjectModal.vue:22`
- **改法**：改成 `v-if="selectedProject.gallery?.length"`。`gallery: []` 現在會 falsy，正確 fallback 到 `previewImage`。

### 3. `target="_blank"` 缺少 `rel="noopener noreferrer"`
- **位置**：`vite-app/src/components/ProjectModal.vue:60` (demoUrl)、`:70` (githubUrl)
- **改法**：兩個 anchor 都補上 `rel="noopener noreferrer"`（githubUrl 從原本的 `rel="noreferrer"` 升級）。

### 4. `labels` 物件每次呼叫都重建
- **位置**：`vite-app/src/App.vue:49`
- **改法**：與 §1 同一次重構，`CATEGORY_LABELS` 現在是模組層常數，只配置一次。

### 5. `BASE + 'sources/...'` 在同一個 project 重複三次
- **位置**：`vite-app/src/data/projects.js:96, 99, 104`
- **改法**：抽出 `sketchupBuildingImg` 與 `sketchupEntranceImg` 兩個檔頂常數，`previewImage` 與 `gallery[].src` 都引用同一個變數。改名只需動一處。

### 6. `sources/` 與 `vite-app/public/sources/` 內容重複
- **位置**：repo root `sources/` ↔ `vite-app/public/sources/`
- **改法**：`git reset --hard HEAD~1` 撤回 `c9a312e`，連同 root `sources/` 兩個 binary 一併刪除。只留 `vite-app/public/sources/` 的改名版作為唯一來源。

---

## 🧪 本地驗證結果（2026-06-13）

| 項目 | 結果 |
|------|------|
| `npm run build` | ✅ 48 modules transformed、CSS 7.67 kB gzip、JS 86.87 kB gzip、**0 errors**、1.15s |
| Vite dev server | ✅ `http://localhost:5180/ChenYuPersonalPage/` 啟動，388 ms ready |
| 首頁 HTTP | ✅ 200 |
| `App.vue` / `projects.js` / `ProjectModal.vue` HMR endpoints | ✅ 200 |
| `sources/sketchup-building-model.jpg` / `sketchup-entrance-comparison.jpg` | ✅ 200（`BASE_URL` 路徑解析正確） |
| Vite 轉譯後 `CATEGORY_LABELS` / `?? 'Project'` / `gallery?.length` / `rel="noopener noreferrer"` ×2 / `sketchupBuildingImg` / `sketchupEntranceImg` | ✅ 全部正確存活 |

---

## ⚠️ 待你決定

### 7. Code-fix commit 與 push
- 目前 working tree 有 3 個檔案的修正（`App.vue` / `ProjectModal.vue` / `projects.js`），尚未 commit。
- 預設行為：等你確認後再 commit + push。Auto mode 仍會擋直接 push 到 `main`，可能要走 PR 或你自己 `! git push origin main`。
- 另有 `docs/dev-log.md`、`docs/工作報告.md` 同步更新、`todo.md` 新增需要一起進 commit。

---

## 已驗證沒問題的點（FYI）

- `vite.config.js:6` 的 `base: '/ChenYuPersonalPage/'` 讓 `BASE_URL` 在 dev 與 prod 都正確展開。
- `--glass-radius`（`style.css:16`）有定義，新加的 `calc(var(--glass-radius) - 6px)` 不會 NaN。
- `modal-action-buttons` 的外層 `v-if` 與內層 anchor `v-if` 配合正確。
- `:target="...startsWith('http')..."` binding 在 `demoUrl` 為 undefined 時不會崩潰，因為外層 `v-if` 會跳過 binding 求值。
- `getCategoryLabel` 透過 prop 傳給 `WorkSection` 與 `ProjectModal`，兩處 call site 仍然相容。
