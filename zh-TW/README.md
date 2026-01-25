# Vibe Coding Agent 配置指南

> 讓 AI 幫你寫程式的「說明書」

---

## 這是什麼？

當你用 AI 工具（如 Claude、Cursor、Copilot）寫程式時，AI 有時候會：

- 問太多問題
- 寫的程式碼風格不統一
- 解釋太多你不需要的東西
- 出錯時不知道怎麼辦

**這套配置文件就是用來解決這些問題的。**

把這些文件放到你的專案裡，AI 就會按照你的規則來工作。

---

## 快速開始

### 方法一：用命令行（推薦）

```bash
npx vibe-coding-config init
```

### 方法二：手動複製

1. 下載這個資料夾
2. 在你的專案裡建立 `.agent` 資料夾
3. 把所有 `.md` 文件複製進去
4. 告訴 AI：「請先閱讀 .agent 資料夾裡的配置」

---

## 文件說明

| 文件 | 用途 | 什麼時候需要看 |
|------|------|---------------|
| **AGENT.md** | AI 的「工作手冊」 | 不需要看，AI 自己會讀 |
| **CODE_STANDARDS.md** | 程式碼規範 | 想改命名規則時 |
| **SKILLS.md** | AI 的技能清單 | 好奇 AI 能做什麼時 |
| **EXAMPLES.md** | 使用範例 | 想看 AI 應該怎麼回應時 |
| **UI_STYLES.md** | 介面設計風格 | 做前端專案時 |
| **GIT_WORKFLOW.md** | Git 使用規則 | 需要版本控制時 |

---

## 支援哪些 AI 工具？

基本上，主流的 AI 程式設計工具都能用：

| 工具 | 公司 |
|------|------|
| Claude Code | Anthropic |
| Cursor | Anysphere |
| Windsurf | Codeium |
| GitHub Copilot | Microsoft |
| Gemini CLI | Google |

用 `export` 命令可以轉換成不同工具的格式：

```bash
npx vibe-coding-config export --target cursor
npx vibe-coding-config export --target copilot
```

---

## 常見問題

### Q: 我完全不懂程式，能用嗎？

可以。這套配置就是為非技術背景的人設計的。你只需要把文件複製到專案裡，AI 會自己讀懂。

### Q: 我用的是 Cursor / Copilot，能用嗎？

可以。使用 `npx vibe-coding-config export --target cursor` 命令可以轉換成對應格式。

### Q: 我想改一些規則怎麼辦？

直接編輯 `.md` 文件就行。這些都是普通的文字檔案，用任何編輯器都能打開。

### Q: AI 不按規則來怎麼辦？

在對話開頭提醒它：「請先閱讀 .agent 資料夾裡的配置文件，然後按照配置來工作。」

### Q: 看完還是不懂怎麼操作？

沒關係！直接把這個 GitHub 倉庫的連結發給你正在用的 AI（Claude、ChatGPT、Gemini 都行），然後說：

> 「我想用這套配置來幫助你更好地幫我寫程式，請一步一步指導我怎麼設置。」

AI 會手把手教你操作的。

---

## 需要幫助？

- 有問題或建議：[GitHub Issues](https://github.com/lumihelia/vibe-coding-agent-config/issues)
- 想貢獻程式碼：歡迎 PR

---

MIT License
