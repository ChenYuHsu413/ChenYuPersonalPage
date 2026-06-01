# Development Log

## 2026-06-01 13:49

### 任務摘要
- 依照最新 dev-log 更新 `docs/工作報告.md`。
- 將 PikaSheen 圖片方形限縮修正與新 demo 截圖更新補進工作報告。
- 準備提交並推送目前所有變更到 GitHub。

### 修改檔案
- `docs/工作報告.md`
- `docs/dev-log.md`

### 重要決策
- 在工作報告的今日工作總覽新增「圖片版面修正」與「預覽截圖更新」。
- 在今日完成事項補上第 10、11 項，讓工作報告能對應最新 dev-log。
- 在驗證結果明確記錄 `.portrait` 的方形限制與新截圖狀態。

### 執行指令
```bash
Get-Content -TotalCount 120 -Encoding UTF8 docs\dev-log.md
Get-Content -TotalCount 90 -Encoding UTF8 docs\工作報告.md
git status --short
Get-Date -Format 'yyyy-MM-dd HH:mm'
```

### 測試 / 驗證結果
- 已確認 `docs/工作報告.md` 補上圖片方形限縮與 demo 截圖更新紀錄。
- 待 commit 前再次檢查 Git 暫存內容。

### 遇到的問題
- 無。

### 下一步建議
- commit 並推送到 GitHub。

---

## 2026-06-01 13:47

### 任務摘要
- 重新擷取首頁首屏截圖。
- 使用新截圖覆蓋 `sources/demo-screenshot.png`。
- 確認截圖中 PikaSheen 圖片已被限制在方形區域內，沒有破壞排版。

### 修改檔案
- `sources/demo-screenshot.png`
- `docs/dev-log.md`

### 重要決策
- 使用本機 Chrome headless 擷取實際 `index.html` 首屏，確保 README 預覽圖反映目前版面。
- 直接覆蓋既有 `sources/demo-screenshot.png`，README 相對路徑不需要更動。

### 執行指令
```bash
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless=new --disable-gpu --window-size=1440,1000 --screenshot=D:\ChenYu\sources\demo-screenshot.png file:///D:/ChenYu/index.html
Get-Item sources\demo-screenshot.png | Select-Object Name,Length,LastWriteTime
Get-Date -Format 'yyyy-MM-dd HH:mm'
git status --short
```

### 測試 / 驗證結果
- 已成功輸出 `sources/demo-screenshot.png`。
- 已檢視新截圖，確認首頁主視覺與 PikaSheen 圖片顯示正常。

### 遇到的問題
- 無。

### 下一步建議
- commit 並推送截圖與版面修正。

---

## 2026-06-01 13:45

### 任務摘要
- 修正 PikaSheen 圖片在首頁主視覺中超出框線、破壞排版的問題。
- 將 `.portrait` 圖片區域限制為面板內的正方形。
- 改用 `object-fit: contain`，讓圖片完整顯示於方形區域內且不變形。

### 修改檔案
- `style.css`
- `docs/dev-log.md`

### 重要決策
- 不改動 HTML 結構，只調整 CSS 約束圖片尺寸。
- 保留原本面板、邊框與 caption 版面。
- 桌面版使用 `width: calc(100% - 92px)` 搭配 `aspect-ratio: 1`，手機版則使用 `width: calc(100% - 56px)` 維持一致縮放。

### 執行指令
```bash
Select-String -Path style.css -Pattern "\.portrait \{|object-fit|aspect-ratio|width: calc|top: 64|top: 44" -Context 0,3
Get-Date -Format 'yyyy-MM-dd HH:mm'
git status --short
```

### 測試 / 驗證結果
- 已確認 `.portrait` 設定為正方形比例。
- 已確認圖片使用 `object-fit: contain` 限縮在方形區域內。
- 尚未重新擷取瀏覽器截圖。

### 遇到的問題
- 原本 `<img>` 作為絕對定位元素時未被明確寬高限制，導致使用原圖尺寸外溢。

### 下一步建議
- 重新開啟首頁確認桌面與手機版圖片位置符合預期。

---

## 2026-06-01 13:41

### 任務摘要
- 依照最新 `docs/dev-log.md` 內容更新 `docs/工作報告.md`。
- 將 PikaSheen 個人圖片替換事項補進工作報告開頭的今日維護紀錄。
- 準備將目前所有變更 commit 並推送到 GitHub。

### 修改檔案
- `docs/工作報告.md`
- `docs/dev-log.md`

### 重要決策
- 在工作報告的「今日工作總覽」、「今日完成事項」、「今日專案結構」與「驗證結果」同步補上 `sources/PikaSheen.jpg`。
- 保持工作報告仍以摘要與表格形式呈現，不直接複製 dev-log 的詳細指令區塊。

### 執行指令
```bash
Get-Content -TotalCount 90 -Encoding UTF8 docs\dev-log.md
Get-Content -TotalCount 120 -Encoding UTF8 docs\工作報告.md
git status --short
Get-Date -Format 'yyyy-MM-dd HH:mm'
```

### 測試 / 驗證結果
- 已確認 `docs/工作報告.md` 包含 PikaSheen 圖片替換紀錄。
- 待 commit 前再次檢查 Git 狀態與暫存內容。

### 遇到的問題
- 無。

### 下一步建議
- commit 並推送到 GitHub。

---

## 2026-06-01 13:39

### 任務摘要
- 將首頁主視覺右側的個人圖像改為使用 `sources/PikaSheen.jpg`。
- 移除原本以 CSS `::before` 產生的 `CY` 圖像。
- 調整 `.portrait` 樣式，讓圖片填滿既有框線區塊並保持置中裁切。

### 修改檔案
- `index.html`
- `style.css`
- `README.md`
- `docs/dev-log.md`
- `sources/PikaSheen.jpg`

### 重要決策
- 使用真正的 `<img>` 元素取代裝飾用 `div`，讓圖片具備可讀的 `alt` 文字。
- 保留原本 `portrait-panel`、caption 與整體主視覺版面，只替換圖像內容與圖片呈現方式。
- 使用 `object-fit: cover` 與 `object-position: center`，避免圖片變形。

### 執行指令
```bash
Get-ChildItem -Force sources
Select-String -Path index.html,style.css -Pattern "portrait|Pika|sources" -Context 2,3
Get-Content -Raw -Encoding UTF8 docs\AGENT.md
Test-Path sources\PikaSheen.jpg
git status --short
Get-Date -Format 'yyyy-MM-dd HH:mm'
```

### 測試 / 驗證結果
- 已確認 `sources/PikaSheen.jpg` 存在。
- 已確認 `index.html` 目前引用 `sources/PikaSheen.jpg`。
- 已確認 `style.css` 不再包含 `.portrait::before` 的 CSS 產生式頭像。
- 已更新 README 的 `sources/` 檔案結構，加入 `PikaSheen.jpg`。

### 遇到的問題
- 尚未開啟瀏覽器進行視覺預覽。

### 下一步建議
- 預覽首頁，確認 PikaSheen 圖片在桌面與手機尺寸下裁切效果符合預期。

---

## 2026-06-01 13:29

### 任務摘要
- 將 `AGENT.md` 從根目錄移動到 `docs/AGENT.md`。
- 刪除 `docs/2026-06-01-work-log.md`。
- 更新 README 與 `docs/工作報告.md` 的檔案結構與檔案說明。

### 變更檔案
- `docs/AGENT.md`
- `docs/2026-06-01-work-log.md`
- `README.md`
- `docs/工作報告.md`
- `docs/dev-log.md`

### 重要決策
- 將專案維護相關文件集中放在 `docs/`，讓根目錄保留主要網站檔案與 README。
- 由於今日工作日誌已整併進 `docs/工作報告.md` 開頭，因此刪除獨立的 `docs/2026-06-01-work-log.md`。
- README 與工作報告皆改以 `docs/AGENT.md` 作為 AI 工作規則文件位置。

### 執行指令
```bash
git status --short
Get-ChildItem -Force docs
Select-String -Path README.md,docs\工作報告.md,docs\dev-log.md -Pattern "AGENT|2026-06-01-work-log" -Context 1,1
Move-Item -LiteralPath AGENT.md -Destination docs\AGENT.md
Get-Date -Format 'yyyy-MM-dd HH:mm'
```

### 測試 / 驗證結果
- 已確認 `docs/AGENT.md` 存在。
- 已確認 `docs/2026-06-01-work-log.md` 已刪除。
- 已確認 README 與 `docs/工作報告.md` 的檔案結構不再列出根目錄 `AGENT.md` 或單日 work log。

### 遇到的問題
- 無。

### 下一步建議
- 將本次文件整理 commit 並推送到 GitHub。

---

## 2026-06-01 13:26

### 任務摘要
- 將 `docs/2026-06-01-work-log.md` 的內容參考 `工作報告.md` 的形式，整併到工作報告開頭。
- 將根目錄的 `工作報告.md` 移動到 `docs/工作報告.md`。
- 更新 README 的檔案結構與檔案說明，改為指向 `docs/工作報告.md`。

### 變更檔案
- `docs/工作報告.md`
- `README.md`
- `docs/dev-log.md`

### 重要決策
- 保留 `docs/2026-06-01-work-log.md` 作為單日工作日誌原始整理稿。
- 在 `docs/工作報告.md` 開頭新增「2026-06-01 維護與整理紀錄」，並用表格方式與原工作報告風格保持一致。
- 工作報告移入 `docs/` 後，報告內圖片路徑改為 `../sources/workflow_infographic.jpg`。

### 執行指令
```bash
Get-Content -TotalCount 80 -Encoding UTF8 工作報告.md
Get-Content -Raw -Encoding UTF8 docs\2026-06-01-work-log.md
Get-Content -Raw -Encoding UTF8 README.md
git status --short
Move-Item -LiteralPath 工作報告.md -Destination docs\工作報告.md
Select-String -Path README.md -Pattern "File Structure|docs/|工作報告|2026-06-01" -Context 1,4
Get-ChildItem -Force docs
Select-String -Path docs\工作報告.md -Pattern "2026-06-01|workflow_infographic|今日專案結構" -Context 1,2
Get-Date -Format 'yyyy-MM-dd HH:mm'
```

### 測試 / 驗證結果
- 已確認 `docs/工作報告.md` 開頭包含 2026-06-01 維護與整理紀錄。
- 已確認 `docs/工作報告.md` 內的資訊圖表路徑改為 `../sources/workflow_infographic.jpg`。
- 已確認 README 的檔案結構列出 `docs/工作報告.md`。

### 遇到的問題
- README 的 `docs/` 樹狀結構第一次更新後縮排不一致，已修正。

### 下一步建議
- commit 並推送這次文件整理變更。

---

## 2026-06-01 13:21

### 任務摘要
- 參照 `docs/dev-log.md` 產生今天的工作日誌。
- 新增 `docs/2026-06-01-work-log.md`，整理今日所有主要工作項目、驗證結果與後續建議。
- 更新 README 檔案結構，加入今日工作日誌檔案。

### 變更檔案
- `docs/2026-06-01-work-log.md`
- `README.md`
- `docs/dev-log.md`

### 重要決策
- 將今日工作日誌獨立成單一 Markdown 檔，方便查看與提交。
- 日誌內容使用乾淨繁體中文整理，不直接複製 `dev-log.md` 中已出現編碼亂碼的段落。
- README 的檔案結構同步列出新的工作日誌檔案。

### 執行指令
```bash
Get-Content -Raw docs\dev-log.md
git status --short
Get-ChildItem -Force
Get-Date -Format 'yyyy-MM-dd HH:mm'
```

### 測試 / 驗證結果
- 已新增 `docs/2026-06-01-work-log.md`。
- 已更新 README 檔案結構與檔案說明。
- 待後續執行 Git 狀態檢查、commit 與 push。

### 遇到的問題
- `docs/dev-log.md` 中部分舊中文內容已有編碼亂碼，因此今日工作日誌採摘要重寫。

### 下一步建議
- 將所有變更 commit 並推送到 GitHub。

---

## 2026-06-01 13:19

### 任務摘要
- 擷取首頁開啟後會看到的首屏畫面。
- 將截圖存入 `sources/demo-screenshot.png`。
- 將截圖插入 `README.md` 的 Live Demo 連結下方。
- 順手將 README 的檔案結構改成 ASCII 樹狀文字，避免特殊線條符號在部分終端顯示成亂碼。

### 變更檔案
- `README.md`
- `sources/demo-screenshot.png`
- `docs/dev-log.md`

### 重要決策
- 使用本機 Chrome headless 產生實際網頁截圖，而不是手動製作示意圖。
- 截圖放在既有的 `sources/` 資料夾中，讓 README 可以用相對路徑引用。
- README 圖片放在 Live Demo 連結正下方，方便讀者先看到線上連結與畫面預覽。

### 執行指令
```bash
Get-Command npx -ErrorAction SilentlyContinue
Get-Command msedge -ErrorAction SilentlyContinue
Get-Command chrome -ErrorAction SilentlyContinue
Get-ChildItem -Force sources
Test-Path 'C:\Program Files\Google\Chrome\Application\chrome.exe'
Test-Path 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
Test-Path 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
Test-Path 'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless=new --disable-gpu --window-size=1440,1000 --screenshot=D:\ChenYu\sources\demo-screenshot.png file:///D:/ChenYu/index.html
Get-ChildItem -Force sources
Get-Date -Format 'yyyy-MM-dd HH:mm'
```

### 測試 / 驗證結果
- 已確認 `sources/demo-screenshot.png` 成功產生。
- 已檢視截圖，確認內容為首頁首屏且不是空白畫面。
- 已將 `![Site preview](sources/demo-screenshot.png)` 插入 README 的 Live Demo 下方。

### 遇到的問題
- 在一般沙盒執行 Chrome / Edge headless 時沒有產出檔案，改用授權後的本機 Chrome 執行成功。

### 下一步建議
- commit 並推送 README 與截圖，讓 GitHub Repo 首頁能顯示預覽圖。

---

## 2026-06-01 13:16

### 任務摘要
- 將 `index.html` 內嵌的 CSS 與 JavaScript 拆成獨立檔案。
- 建立 `style.css` 與 `script.js`。
- 重寫 `README.md`，補上目前專案檔案結構。
- 同步更新 `工作報告.md` 中過期的「HTML/CSS/JS 全合一」描述。

### 變更檔案
- `index.html`
- `style.css`
- `script.js`
- `README.md`
- `工作報告.md`
- `docs/dev-log.md`

### 重要決策
- 保留原本 CSS 與 JavaScript 內容，只做機械式抽取，降低重寫造成行為變更的風險。
- `index.html` 只保留頁面結構，透過 `<link rel="stylesheet" href="style.css">` 載入樣式，透過 `<script src="script.js"></script>` 載入互動邏輯。
- README 的檔案結構改以目前實際專案狀態為準，列出 `docs/` 與 `sources/`。

### 執行指令
```bash
Select-String -Path index.html -Pattern "<style>|</style>|<script>|</script>|<link" -Context 0,2
Get-Content -Raw README.md
Get-Content -Raw index.html
$html = Get-Content -Raw index.html
$stylePattern = '(?s)    <style>\r?\n(?<css>.*?)\r?\n    </style>'
$scriptPattern = '(?s)    <script>\r?\n(?<js>.*?)\r?\n    </script>'
$css = [regex]::Match($html, $stylePattern).Groups['css'].Value -replace '(?m)^        ', ''
$js = [regex]::Match($html, $scriptPattern).Groups['js'].Value -replace '(?m)^        ', ''
Set-Content -Path style.css -Value $css -Encoding UTF8
Set-Content -Path script.js -Value $js -Encoding UTF8
$html = [regex]::Replace($html, $stylePattern, '    <link rel="stylesheet" href="style.css">')
$html = [regex]::Replace($html, $scriptPattern, '    <script src="script.js"></script>')
Set-Content -Path index.html -Value $html -Encoding UTF8
Get-Content -TotalCount 30 style.css
Get-Content -Raw script.js
Get-ChildItem -Force
Select-String -Path 工作報告.md -Pattern "index.html|README.md|sources|dev-log" -Context 1,2
Get-Date -Format 'yyyy-MM-dd HH:mm'
```

### 測試 / 驗證結果
- 已確認 `index.html` 不再包含內嵌 `<style>`，並已引用 `style.css`。
- 已確認 `index.html` 頁尾改為引用 `script.js`。
- 已讀取 `style.css` 開頭與 `script.js` 全文，確認拆出的內容存在。
- 已更新 README 的檔案結構與檔案說明。

### 遇到的問題
- 無。

### 下一步建議
- 用瀏覽器開啟 `index.html`，確認樣式與即時時間更新都正常。

---

本檔案依照 `AGENT.md` 的 Development Log Rule 維護。每次有開發、修正、重構、設定或文件更新時，新增紀錄放在最上方，並避免寫入任何密碼、Token 或私密環境變數。

---

## 2026-06-01 13:11

### 任務摘要
- 整理今日所有變更紀錄與執行過的指令。
- 依照 `AGENT.md` 規則重寫開發紀錄格式。
- 將 `log.md` 的早期對話紀錄整理成可讀的開發紀錄，接到本檔案最後面。
- 刪除合併後不再需要的 `log.md`。

### 變更檔案
- `docs/dev-log.md`
- `log.md`

### 重要決策
- 使用繁體中文重新整理 dev log，保留必要的開發脈絡，不保留亂碼對話全文。
- 將今日指令集中放在最新紀錄的「執行指令」區塊，方便日後追蹤。
- `log.md` 內容已整併進 `docs/dev-log.md`，因此刪除原檔以避免重複維護。

### 執行指令
```bash
Get-Content -Raw index.html
Get-ChildItem -Force
Select-String -Path index.html -Pattern "hero-time|current-time|updateCurrentTime" -Context 3,4
git diff -- index.html
Get-Content -TotalCount 60 README.md
Select-String -Path index.html -Pattern "nav-links|brand|topbar" -Context 0,8
git diff -- index.html README.md
Get-Content -TotalCount 8 README.md
git status --short
git remote -v
git branch --show-current
Get-ChildItem -Force .vscode
Get-Content -Raw .vscode\extensions.json
git add README.md index.html .vscode/extensions.json
git commit -m "Update portfolio links and live time"
git push origin main
git pull --rebase origin main
git push origin main
git log -1 --oneline
Get-Content -Raw .vscode\extensions.json
Get-Content -Raw .gitignore
Get-ChildItem -File -Filter *.jpg
rg "workflow_infographic|\.jpg|gitignore|vscode" -n .
Test-Path .gemini
Test-Path node_modules
Get-Content -TotalCount 80 docs\dev-log.md
New-Item -ItemType Directory -Force sources
Move-Item -LiteralPath workflow_infographic.jpg -Destination sources\workflow_infographic.jpg
Remove-Item -LiteralPath .vscode
Select-String -Path 工作報告.md -Pattern "gitignore|workflow_infographic" -Context 2,3
Select-String -Path 工作報告.md -Pattern "檔案|專案|結構" -Context 1,8
Get-Content -Raw AGENT.md
Get-Content -Raw log.md
Get-Content -Raw docs\dev-log.md
Get-Content AGENT.md
Get-Date -Format 'yyyy-MM-dd HH:mm'
Get-Content -TotalCount 80 docs\dev-log.md
Get-Content -Tail 80 docs\dev-log.md
rg "log\.md" -n .
```

### 測試 / 驗證結果
- 已讀取 `AGENT.md`，確認開發紀錄需要包含時間、摘要、異動檔案、決策、指令、驗證、問題與下一步。
- 已確認 `log.md` 內容可整理為早期開發歷程。
- 已檢查 `docs/dev-log.md` 開頭與結尾，確認重寫內容已接合。
- 已用 `rg "log\.md"` 檢查殘留引用，並同步修正 `工作報告.md` 的核心檔案清單。

### 遇到的問題
- `AGENT.md` 的範例標題文字出現編碼亂碼，因此採用同義且可讀的繁體中文標題。
- 舊的 `docs/dev-log.md` 也有亂碼，需整份重寫為乾淨格式。

### 下一步建議
- 檢查合併後的 `docs/dev-log.md` 是否符合預期，再 commit 並推送到 GitHub。

---

## 2026-06-01 13:08

### 任務摘要
- 檢查 `.vscode` 內容是否必要。
- 說明 `.gitignore` 的用途並依需求移除。
- 將 JPG 圖片整理到 `sources/` 資料夾。

### 變更檔案
- `.vscode/extensions.json`
- `.gitignore`
- `workflow_infographic.jpg`
- `sources/workflow_infographic.jpg`
- `工作報告.md`

### 重要決策
- `.vscode/extensions.json` 只包含 VS Code 擴充套件推薦，非網站必要設定，因此刪除。
- `.gitignore` 對專案有清理用途，但目前此靜態網站沒有需要忽略的大型依賴或暫存資料夾，因此依使用者要求刪除。
- 將圖片集中於 `sources/`，並同步修正 `工作報告.md` 的圖片路徑與核心檔案清單。

### 執行指令
```bash
git status --short
Get-ChildItem -Force .vscode
Get-Content -Raw .vscode\extensions.json
Get-Content -Raw .gitignore
Get-ChildItem -File -Filter *.jpg
rg "workflow_infographic|\.jpg|gitignore|vscode" -n .
Get-ChildItem -Force
Get-ChildItem -Force docs
Test-Path .gemini
Test-Path node_modules
Get-Content -TotalCount 80 docs\dev-log.md
New-Item -ItemType Directory -Force sources
Move-Item -LiteralPath workflow_infographic.jpg -Destination sources\workflow_infographic.jpg
Remove-Item -LiteralPath .vscode
rg "workflow_infographic|\.vscode|\.gitignore" -n .
Select-String -Path 工作報告.md -Pattern "gitignore|workflow_infographic" -Context 2,3
Select-String -Path 工作報告.md -Pattern "檔案|專案|結構" -Context 1,8
```

### 測試 / 驗證結果
- `sources/workflow_infographic.jpg` 已存在。
- `.vscode` 已不存在。
- `工作報告.md` 已改用 `sources/workflow_infographic.jpg`。

### 遇到的問題
- `log.md` 與 `工作報告.md` 仍有歷史文字提到 `.gitignore`；保留歷史紀錄，但修正目前核心檔案清單。

### 下一步建議
- 將整理後的檔案結構 commit 並推送。

---

## 2026-06-01 13:05

### 任務摘要
- 將頁首即時時間、GitHub 導覽連結與 README Repo 連結推送到 GitHub。

### 變更檔案
- `index.html`
- `README.md`
- `.vscode/extensions.json`

### 重要決策
- 將當時工作區所有變更加入同一個 commit。
- 遠端 `main` 有新提交，因此先 rebase 再 push，避免覆蓋遠端內容。

### 執行指令
```bash
git status --short
git remote -v
git branch --show-current
Get-ChildItem -Force .vscode
Get-Content -Raw .vscode\extensions.json
git add README.md index.html .vscode/extensions.json
git commit -m "Update portfolio links and live time"
git push origin main
git pull --rebase origin main
git push origin main
git status --short
git log -1 --oneline
```

### 測試 / 驗證結果
- 推送成功到 `origin/main`。
- 最新 commit 為 `08a1a95 Update portfolio links and live time`。
- 最後檢查工作區為乾淨狀態。

### 遇到的問題
- 第一次 push 因本機 Git 認證問題失敗。
- 使用本機認證後，push 因遠端有新提交被拒絕；執行 `git pull --rebase origin main` 後解決。

### 下一步建議
- 到 GitHub Repo 確認線上內容與提交紀錄。

---

## 2026-06-01 13:03

### 任務摘要
- 在頁首導覽列加入 GitHub 圖示與個人 Repo 連結。
- 在 `README.md` 開頭加入 Repo 連結。

### 變更檔案
- `index.html`
- `README.md`

### 重要決策
- 使用 inline SVG 作為 GitHub 圖示，避免新增外部 icon 套件。
- 導覽列 GitHub 連結使用 `target="_blank"` 與 `rel="noreferrer"`。

### 執行指令
```bash
Get-Content -TotalCount 60 README.md
Select-String -Path index.html -Pattern "nav-links|brand|topbar" -Context 0,8
git diff -- index.html README.md
Get-Content -TotalCount 8 README.md
```

### 測試 / 驗證結果
- 已檢查 diff，確認 GitHub 連結為 `https://github.com/ChenYuHsu413/ChenYu`。
- 已確認 README 開頭出現 Repo 連結。

### 遇到的問題
- 無。

### 下一步建議
- 視覺上可再用瀏覽器確認導覽列在手機寬度下的排列。

---

## 2026-06-01 13:00

### 任務摘要
- 在頁首主視覺加入即時顯示與每秒更新的目前時間區塊。

### 變更檔案
- `index.html`

### 重要決策
- 使用原生 JavaScript `Date` 與 `Intl.DateTimeFormat`，不引入額外套件。
- 將時間面板放在 hero 左側 CTA 下方，維持原本作品集設計風格。

### 執行指令
```bash
Get-Content -Raw index.html
Get-ChildItem -Force
Select-String -Path index.html -Pattern "hero-time|current-time|updateCurrentTime" -Context 3,4
git diff -- index.html
```

### 測試 / 驗證結果
- 已檢查 HTML、CSS 與 JavaScript 插入位置。
- 已確認時間元素 ID 與更新函式名稱一致。

### 遇到的問題
- 一次平行讀檔時遇到 Windows sandbox `CreateProcessWithLogonW failed: 1056`，改用單獨讀檔後完成。

### 下一步建議
- 可啟動瀏覽器預覽實際排版與時間更新效果。

---

## 2026-05-29 21:20

### 任務摘要
- 安裝 Node.js LTS 與 OpenCode CLI，並確認工具版本。

### 變更檔案
- `docs/dev-log.md`

### 重要決策
- 透過 `winget` 安裝 Node.js LTS。
- 因 PowerShell 執行原則可能阻擋 `opencode.ps1`，改用 `opencode.cmd` 驗證 CLI。

### 執行指令
```bash
node -v
npm -v
winget --version
winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
& 'C:\Program Files\nodejs\node.exe' -v
& 'C:\Program Files\nodejs\npm.cmd' -v
$env:Path = 'C:\Program Files\nodejs;' + $env:Path; & 'C:\Program Files\nodejs\npm.cmd' install -g opencode-ai
& "$env:APPDATA\npm\opencode.cmd" --version
```

### 測試 / 驗證結果
- Node.js 版本：`v24.16.0`
- npm 版本：`11.13.0`
- OpenCode 版本：`1.15.12`

### 遇到的問題
- `opencode-ai` 的 postinstall 一開始找不到 `node`，補上 Node.js 路徑後解決。
- PowerShell 可能因 execution policy 擋下 `.ps1`，因此使用 `.cmd`。

### 下一步建議
- 重新開啟 PowerShell 或 VS Code 終端機，確認 Node.js 與 npm PATH 已穩定生效。

---

## 2026-05-29 21:07

### 任務摘要
- 建立 `AGENT.md` 的 Development Log Rule，指定開發紀錄需寫入 `docs/dev-log.md`。

### 變更檔案
- `AGENT.md`
- `docs/dev-log.md`

### 重要決策
- 使用 `docs/dev-log.md` 作為唯一的開發紀錄位置。
- 規定紀錄需包含日期時間、摘要、異動檔案、決策、指令、驗證、問題與下一步。

### 執行指令
```bash
Get-ChildItem -Force
Get-ChildItem -Recurse -Force -Filter AGENT*.md
Get-Content AGENT.md
Get-Content docs\dev-log.md
Get-Content dev-log.md
Get-Content AGENT.md -Raw
git status --short
Get-Date -Format 'yyyy-MM-dd HH:mm'
Get-Content docs\dev-log.md -Encoding UTF8
```

### 測試 / 驗證結果
- 已確認專案根目錄存在 `AGENT.md`。
- 已確認開發紀錄檔案位置為 `docs/dev-log.md`。

### 遇到的問題
- 舊紀錄中有部分中文編碼亂碼。

### 下一步建議
- 後續每次完成有意義變更後，都依規則更新 `docs/dev-log.md`。

---

## 2026-05-29 初始開發紀錄整理

### 任務摘要
- 由 `log.md` 重寫早期對話紀錄，整理專案從建立頁面、初始化 Git、連接 GitHub 到補 README 的流程。

### 變更檔案
- `index.html`
- `.gitignore`
- `README.md`
- `log.md`

### 重要決策
- 建立單頁個人作品集 / 即時時鐘頁面。
- 使用 HTML、CSS、JavaScript 完成即時日期與時間顯示。
- 初始化 Git repo，使用 `main` 分支。
- GitHub 遠端設定為 `https://github.com/ChenYuHsu413/ChenYu.git`。
- README 補上專案說明、功能、技術棧與本機執行方式。

### 執行指令
```bash
git --version; gh --version
git status
Get-ChildItem Env: | Where-Object { $_.Name -like "*GIT*" -or $_.Name -like "*TOKEN*" }
git init; git checkout -b main; git add .; git commit -m "Initial commit"
git config user.name "ChenYuHsu413"; git config user.email "ChenYuHsu413@users.noreply.github.com"; git commit -m "Initial commit"
Get-ChildItem d:\
Get-ChildItem -Recurse
Get-ChildItem -Path d:\ -Filter opencode.json -Recurse -ErrorAction SilentlyContinue
Get-ChildItem -Path d:\ -Filter "*0528test*" -Recurse -ErrorAction SilentlyContinue
Get-Content (Get-PSReadLineOption).HistorySavePath -Tail 50
Get-ChildItem -Path d:\ -Filter index.css -Recurse -ErrorAction SilentlyContinue
Get-ChildItem -Path C:\Users\admin -Filter index.css -Recurse -ErrorAction SilentlyContinue
Get-ChildItem -Path C:\Users\admin -Filter "*0528test*" -Recurse -ErrorAction SilentlyContinue
Get-ChildItem -Path d:\ -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-1) } | Select-Object FullName, LastWriteTime
Get-ChildItem -Path C:\Users\admin -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-1) } | Select-Object FullName, LastWriteTime
Get-ChildItem -Force
git remote -v
git remote add origin https://github.com/ChenYuHsu413/ChenYu.git
git push -u origin main
git add index.html; git commit -m "Update name to Chen Yu Hsu"; git push origin main
git add README.md; git commit -m "Add README.md with project description"; git push origin main
```

### 測試 / 驗證結果
- 初始頁面已建立並可在本機瀏覽器開啟。
- Git repo 已初始化並成功連到 GitHub。
- `index.html` 的姓名更新為 Chen Yu Hsu 後已推送。
- README 已建立並推送到 GitHub。

### 遇到的問題
- GitHub CLI / 認證流程需要確認。
- 曾搜尋遺失或預期外的檔案位置，確認專案目錄實際內容。
- 舊對話紀錄中有大量中文編碼亂碼，因此改以摘要方式保留有效開發資訊。

### 下一步建議
- 持續用 `docs/dev-log.md` 作為唯一開發紀錄。
- 若再次調整專案結構，記得同步更新 README 與工作報告。

