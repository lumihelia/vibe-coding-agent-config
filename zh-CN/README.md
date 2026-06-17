# Vibe Coding Agent 配置指南

> 让 AI 帮你写代码的「说明书」

---

## 这是什么？

当你用 AI 工具（如 Claude Code、Cursor、Copilot）写代码时，AI 有时候会：

- 问太多问题
- 写的代码风格不统一
- 解释太多你不需要的东西
- 出错时不知道怎么办

**这套配置文件就是用来解决这些问题的。**

把这些文件放到你的项目里，AI 就会按照你的规则来工作。

---

## 快速开始

### 方法一：用命令行（推荐）

```bash
npx vibe-coding-config init --lang zh-CN
```

### 方法二：手动复制

**如果你用 Claude Code：**

1. 把 `CLAUDE.md` 复制到你项目的根目录
2. 创建 `.agent/` 文件夹，把其余 `.md` 文件复制进去
3. 把 `settings.json.example` 复制为项目里的 `.claude/settings.json`
4. 完成。Claude Code 下次启动会自动读取 `CLAUDE.md`，无需任何额外指令。

**如果你用其他 AI 工具（Cursor、Copilot 等）：**

1. 在你的项目里创建 `.agent/` 文件夹
2. 把所有 `.md` 文件复制进去
3. 每次对话开头告诉 AI：「请先阅读 `.agent/AGENT.md`」

---

## 文件说明

| 文件 | 用途 | 什么时候需要看 |
|------|------|---------------|
| **CLAUDE.md** | Claude Code 原生配置（自动读取） | 想修改 AI 行为规则时 |
| **AGENT.md** | 其他工具使用的完整指令 | 用 Cursor 等工具时 |
| **CODE_STANDARDS.md** | 代码规范 | 想改命名规则时 |
| **SKILLS.md** | AI 的技能清单 | 好奇 AI 能做什么时 |
| **EXAMPLES.md** | 使用示例 | 想看 AI 应该怎么回应时 |
| **UI_STYLES.md** | 界面设计风格 | 做前端项目时 |
| **GIT_WORKFLOW.md** | Git 使用规则 | 需要版本控制时 |
| **MCP_GUIDE.md** | MCP 插件配置指南 | 想给 AI 添加浏览器 / 数据库等工具时 |
| **settings.json.example** | 权限配置模板 | 设置 Claude Code 权限时 |

---

## 常见问题

### Q: 我完全不懂代码，能用吗？

可以。这套配置就是为非技术背景的人设计的。把 `CLAUDE.md` 放到项目根目录，AI 会自己读懂，你不需要理解里面的内容。

### Q: 什么是 MCP？需要配置吗？

MCP 是给 AI 安装「外接设备」的机制，比如让它能直接控制浏览器、查询数据库。不配置也能正常使用，等你熟悉基本使用后再参考 `MCP_GUIDE.md` 设置。

### Q: 我用的是 Cursor / Copilot，能用吗？

可以，使用 `AGENT.md` 替代 `CLAUDE.md`。也可以使用命令 `npx vibe-coding-config export --target cursor` 转换成对应格式。

### Q: 我想改一些规则怎么办？

直接编辑 `CLAUDE.md`（如果用 Claude Code）或 `.agent/AGENT.md`（如果用其他工具）就行。这些都是普通文字文件，用任何编辑器都能打开。

### Q: 为什么有 CLAUDE.md 和 AGENT.md 两个文件？

- `CLAUDE.md`：Claude Code 的原生格式，放在项目根目录会被自动读取，不需要任何操作。
- `AGENT.md`：传统格式，适用于 Cursor、Copilot 等不支持自动读取的工具。

两个文件内容基本相同，`AGENT.md` 包含更多细节说明。

---

## 需要帮助？

- 有问题或建议：[GitHub Issues](https://github.com/lumihelia/vibe-coding-agent-config/issues)
- 想贡献代码：欢迎 PR

---

MIT License
