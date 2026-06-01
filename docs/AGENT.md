# Agent Working Rules

## Development Log Rule

After completing any meaningful development task, bug fix, refactor, configuration change, or documentation update, update `docs/dev-log.md`.

Each log entry must include:

- Date and time
- Task summary
- Files changed
- Key decisions
- Commands executed
- Test / verification result
- Issues encountered
- Next suggested step

Use Traditional Chinese for the log.

Do not include secrets, API keys, tokens, passwords, private environment variables, or personal credentials.

If `docs/dev-log.md` does not exist, create it.

Append new entries at the top of the file under the newest date.

## Log Format

```md
## YYYY-MM-DD HH:mm

### 任務摘要
-

### 修改檔案
-

### 重要決策
-

### 執行指令
```bash