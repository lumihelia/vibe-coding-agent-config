# Vibe Coding Agent 配置指南（简体中文）

这套目录保存当前仓库里最近扩展过的简体中文项目配置模板。它同时覆盖 Claude Code 原生配置和 portable `.agent/` 规则。

## 当前包含的文件

| 文件 | 作用 |
|---|---|
| `CLAUDE.md` | Claude Code 项目级主配置，放在项目根目录后会被自动读取 |
| `AGENT.md` | Portable Agent 主规则，适用于需要显式加载规则文件的工具 |
| `CODE_STANDARDS.md` | 代码命名、结构和错误处理约定 |
| `SKILLS.md` | Agent 可执行的技能与工作方式 |
| `EXAMPLES.md` | 行为和输出示例 |
| `UI_STYLES.md` | 前端与界面设计约定 |
| `GIT_WORKFLOW.md` | Git 工作流和高风险操作边界 |
| `MCP_GUIDE.md` | MCP 工具接入说明 |
| `settings.json.example` | Claude Code 权限配置示例 |

## Claude Code 配置方式

推荐的项目结构：

```text
project/
├── CLAUDE.md
├── .claude/
│   └── settings.json
└── .agent/
    ├── AGENT.md
    ├── CODE_STANDARDS.md
    ├── SKILLS.md
    ├── EXAMPLES.md
    ├── UI_STYLES.md
    ├── GIT_WORKFLOW.md
    └── MCP_GUIDE.md
```

配置步骤：

1. 将 `CLAUDE.md` 复制到项目根目录。
2. 创建 `.agent/`，复制实际需要的辅助规则文件。
3. 权限默认值合适时，将 `settings.json.example` 复制为 `.claude/settings.json`。
4. 需要浏览器、数据库、GitHub 或搜索能力时，再参考 `MCP_GUIDE.md` 增加对应 MCP 工具。

`CLAUDE.md` 承担项目级长期规则，`.agent/` 中的文件继续拆分代码规范、Git、UI 和工具等具体约定。

## 其他 AI coding 工具

Cursor、GitHub Copilot、Windsurf 等工具可以继续使用 `AGENT.md` 和辅助规则文件。若工具不会自动发现 `.agent/AGENT.md`，会话开始时需要显式要求读取该文件。

CLI 也支持把 portable 规则转换成工具特定格式：

```bash
vibe export --target cursor --lang zh-CN
vibe export --target copilot --lang zh-CN
vibe export --target windsurf --lang zh-CN
vibe export --target claude --lang zh-CN
vibe export --target gemini --lang zh-CN
```

## CLI 与本目录的差异

当前 CLI 的 `init` 命令仍然沿用较早的 portable 六文件模型，只会生成：

```text
AGENT.md
SKILLS.md
CODE_STANDARDS.md
EXAMPLES.md
UI_STYLES.md
GIT_WORKFLOW.md
```

因此，`CLAUDE.md`、`MCP_GUIDE.md` 和 `settings.json.example` 目前需要手动复制；`init` 不会自动安装这三份后来新增的文件。

## 另一条路径：Vibe Agent Starter Skill

仓库根目录的 [`../SKILL.md`](../SKILL.md) 可以通过对话收集项目信息，并生成一份定制 `CLAUDE.md`、Claude Code 权限配置和可选 MCP 指南。

静态模板适合直接复用和继续手动维护；Skill 更适合从具体项目出发生成配置。

## 需要帮助或贡献

问题和建议可以提交到 [GitHub Issues](https://github.com/lumihelia/vibe-coding-agent-config/issues)。代码或文档修改可以通过 Pull Request 提交。

## License

MIT License。
