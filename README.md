# Vibe Coding Agent Config Kit

中文 · [English](./README.en.md)

一套用于稳定 AI coding agent 项目行为的配置工具。仓库目前包含可复用的项目配置模板、用于安装和转换 portable `.agent/` 规则的 CLI，以及一份可以通过对话生成定制 Claude Code 配置的独立 Skill。

## 仓库现在包含什么

### 1. 项目配置模板

仓库保留了三套语言目录，目前**并不处在同一个功能版本**。

| 目录 | 当前状态 |
|---|---|
| [`zh-CN/`](./zh-CN/) | 最近扩展过的模板集：包含 `CLAUDE.md`、`AGENT.md`、代码规范、Git 工作流、UI 规则、MCP 指南和 Claude Code 权限示例 |
| [`en/`](./en/) | Portable 六文件 `.agent/` 配置集 |
| [`zh-TW/`](./zh-TW/) | Portable 六文件 `.agent/` 配置集 |

`zh-CN/` 后来新增的 Claude 专用文件目前还没有同步到 `en/` 和 `zh-TW/`。这里直接保留这层差异，让文档对应仓库真实存在的状态。

### 2. CLI

[`cli/`](./cli/) 保存 JavaScript CLI 源码。

`init` 当前会在 `.agent/` 中生成六个 portable 配置文件：

```text
.agent/
├── AGENT.md
├── SKILLS.md
├── CODE_STANDARDS.md
├── EXAMPLES.md
├── UI_STYLES.md
└── GIT_WORKFLOW.md
```

CLI 默认使用繁体中文，也支持简体中文和英文。当前 `init` **不会**自动安装后来加入 `zh-CN/` 的 `CLAUDE.md`、`MCP_GUIDE.md` 和 `settings.json.example`。

`export` 可以把 portable 规则合并成 Cursor、GitHub Copilot、Windsurf、Claude Code 或 Gemini CLI 对应的单一配置文件；`check` 提供轻量的规则扫描。

具体命令以 [`cli/README.md`](./cli/README.md) 为准。

### 3. `SKILL.md`

根目录的 [`SKILL.md`](./SKILL.md) 是一份带 BotLearn-style metadata 的 Vibe Agent Starter Skill。它通过一轮项目信息收集，继续生成定制的 `CLAUDE.md`、Claude Code 权限配置，并在需要时提供 MCP 设置建议。

这条路径和静态模板承担不同作用：模板提供可复用默认值，Skill 根据具体项目动态生成配置。

## 怎么选

| 目标 | 路径 |
|---|---|
| 使用当前扩展最完整的 Claude Code 模板 | 从 [`zh-CN/`](./zh-CN/) 开始 |
| 使用 portable `.agent/` 规则 | 选择语言目录，或使用 CLI |
| 为具体项目生成一份定制 Claude Code 配置 | 在兼容的 Skill runtime 中使用 [`SKILL.md`](./SKILL.md) |
| 把 portable 规则转换成特定工具格式 | 使用 `cli export` |

## 简体中文 / Claude Code 配置方式

当前 `zh-CN/` 支持 Claude Code-first 的项目结构：

1. 将 `zh-CN/CLAUDE.md` 复制到项目根目录，命名为 `CLAUDE.md`。
2. 创建 `.agent/`，再复制项目实际需要的辅助规则文件。
3. 权限默认值合适时，将 `zh-CN/settings.json.example` 复制为 `.claude/settings.json`。
4. 需要增加外部工具时，以 `zh-CN/MCP_GUIDE.md` 作为参考。

这些文件都是普通 Markdown / JSON，可以随着项目要求继续修改。

## Portable `.agent/` 配置方式

Portable 模型把规则集中在 `.agent/` 目录中，以 `AGENT.md` 作为主要入口，再把代码规范、Git 行为、UI 约定、技能和示例拆进独立文件。

部分 AI coding 工具不会自动发现 `.agent/AGENT.md`，这类工具需要在会话开始时显式要求读取该文件。

## 仓库结构

```text
.
├── README.md              # 中文仓库入口
├── README.en.md           # English repository overview
├── SKILL.md               # 对话式配置生成器
├── zh-CN/                 # 最近扩展过的简体中文模板集
├── en/                    # 英文 portable 模板集
├── zh-TW/                 # 繁体中文 portable 模板集
├── cli/                   # CLI 源码与模板
└── .claude/               # Claude Code Skill 集成
```

## 当前状态

这个仓库仍在演进。三套语言模板目前没有完全同步，CLI 也仍然沿用较早的 portable 六文件模型。文档会直接记录这些差异，让公开入口持续对应真实实现。

欢迎通过 Issues 和 Pull Requests 补充模板、CLI 或文档，也欢迎继续推动不同语言版本之间的同步。

## License

MIT License，见 [`LICENSE`](./LICENSE)。
