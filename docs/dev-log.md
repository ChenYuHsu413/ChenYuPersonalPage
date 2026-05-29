# Development Log

本文件依 `AGENT.md` 規則記錄 Codex / AI Agent 執行過的重要開發、修正、重構、設定與文件更新。

---

## 2026-05-29 21:20

### 任務摘要
- 安裝 Node.js LTS 與 OpenCode CLI，並確認 OpenCode 可執行。

### 變更檔案
- `docs/dev-log.md`

### 關鍵決策
- 先以 `winget` 安裝 Node.js LTS，取得 npm 後再用 npm 全域安裝 `opencode-ai`。
- 因 PowerShell 執行原則阻擋 `opencode.ps1`，驗證時改用 `opencode.cmd`。

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

### 遇到問題
- 第一次安裝 `opencode-ai` 時，postinstall 子程序找不到 `node`；臨時補上 Node.js 路徑後安裝成功。
- PowerShell 目前禁止執行 `opencode.ps1`，可使用 `opencode.cmd` 或調整 PowerShell execution policy。

### 下一步建議
- 重新開啟 PowerShell / VS Code 終端機，讓 Node.js 與 npm 的 PATH 設定生效。
- 若要直接輸入 `opencode`，可使用 Command Prompt，或在 PowerShell 執行 `opencode.cmd`。

## 2026-05-29 21:07

### 任務摘要
- 依照 `AGENT.md` 的 Development Log Rule 更新 `docs/dev-log.md`。

### 變更檔案
- `docs/dev-log.md`

### 關鍵決策
- 以繁體中文記錄本次文件更新。
- 依規則補齊每筆紀錄需要包含的欄位。
- 原檔案含有不可讀亂碼，因此整理為乾淨且可維護的開發紀錄格式。

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
- 已確認專案內存在 `AGENT.md`，未找到 `AGENTS.md`。
- 已確認 `docs/dev-log.md` 依規則建立最新紀錄於檔案上方。

### 遇到的問題
- `docs/dev-log.md` 原內容出現亂碼。
- `dev-log.md` 根目錄檔案不存在，實際需更新的是 `docs/dev-log.md`。
- `AGENT.md` 的 Log Format 範例後半段疑似截斷或亂碼，因此依英文規則欄位整理完整格式。

### 下一步建議
- 後續每次完成有意義的開發、修正、重構、設定或文件更新時，持續將最新紀錄追加到本檔案最上方。
