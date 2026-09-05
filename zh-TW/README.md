# Vibe Coding Agent 配置指南（繁體中文）

這個目錄保存目前的繁體中文 **portable `.agent/` 配置模板**。

目前仍維持六文件結構，尚未同步後來加入 `zh-CN/` 的 `CLAUDE.md`、`MCP_GUIDE.md` 和 `settings.json.example`。

## 目前包含的文件

| 文件 | 作用 |
|---|---|
| `AGENT.md` | Portable Agent 主要指令 |
| `CODE_STANDARDS.md` | 命名、結構與錯誤處理規則 |
| `SKILLS.md` | Agent 技能與工作流程 |
| `EXAMPLES.md` | 行為與輸出範例 |
| `UI_STYLES.md` | 前端與介面設計約定 |
| `GIT_WORKFLOW.md` | Git 工作流程與操作邊界 |

## Portable 配置方式

典型專案結構：

```text
project/
└── .agent/
    ├── AGENT.md
    ├── CODE_STANDARDS.md
    ├── SKILLS.md
    ├── EXAMPLES.md
    ├── UI_STYLES.md
    └── GIT_WORKFLOW.md
```

把實際需要的文件放進 `.agent/` 即可。部分 AI coding 工具不會自動發現 `.agent/AGENT.md`，這類工具需要在會話開始時明確要求讀取該文件。

## CLI

目前 CLI 的 `init` 預設語言就是 `zh-TW`，生成的內容與這個六文件 portable 結構一致。

從倉庫 CLI 源碼完成安裝後，可以使用：

```bash
vibe init
vibe init --lang zh-TW
vibe export --target cursor --lang zh-TW
vibe export --target copilot --lang zh-TW
vibe export --target windsurf --lang zh-TW
vibe export --target claude --lang zh-TW
vibe export --target gemini --lang zh-TW
```

完整命令與限制見 [`../cli/README.md`](../cli/README.md)。

## Claude Code 專用配置

目前有兩條路徑可以取得 Claude Code 專用配置：

- 根目錄 [`../SKILL.md`](../SKILL.md) 可以透過對話生成定制 `CLAUDE.md`、權限配置與可選 MCP 指南。
- [`../zh-CN/`](../zh-CN/) 保存目前擴展最完整的靜態模板集，語言為簡體中文。

繁體中文靜態模板目前尚未同步到這個新結構。

## 問題與貢獻

問題和建議可以提交到 [GitHub Issues](https://github.com/lumihelia/vibe-coding-agent-config/issues)。程式碼或文件修改可以透過 Pull Request 提交。

## License

MIT License。
