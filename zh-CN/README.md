# Vibe Coding Agent 配置指南

> 让 AI 帮你写代码的「说明书」

---

## 这是什么？

当你用 AI 工具（如 Claude、Cursor、Copilot）写代码时，AI 有时候会：

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

1. 下载这个文件夹
2. 在你的项目里创建 `.agent` 文件夹
3. 把所有 `.md` 文件复制进去
4. 告诉 AI：「请先阅读 .agent 文件夹里的配置」

---

## 文件说明

| 文件 | 用途 | 什么时候需要看 |
|------|------|---------------|
| **AGENT.md** | AI 的「工作手册」 | 不需要看，AI 自己会读 |
| **CODE_STANDARDS.md** | 代码规范 | 想改命名规则时 |
| **SKILLS.md** | AI 的技能清单 | 好奇 AI 能做什么时 |
| **EXAMPLES.md** | 使用示例 | 想看 AI 应该怎么回应时 |
| **UI_STYLES.md** | 界面设计风格 | 做前端项目时 |
| **GIT_WORKFLOW.md** | Git 使用规则 | 需要版本控制时 |

---

## 常见问题

### Q: 我完全不懂代码，能用吗？

可以。这套配置就是为非技术背景的人设计的。你只需要把文件复制到项目里，AI 会自己读懂。

### Q: 我用的是 Cursor / Copilot，能用吗？

可以。使用 `npx vibe-coding-config export --target cursor` 命令可以转换成对应格式。

### Q: 我想改一些规则怎么办？

直接编辑 `.md` 文件就行。这些都是普通的文字文件，用任何编辑器都能打开。

### Q: AI 不按规则来怎么办？

在对话开头提醒它：「请先阅读 .agent 文件夹里的配置文件，然后按照配置来工作。」

---

## 需要帮助？

- 有问题或建议：[GitHub Issues](https://github.com/lumihelia/vibe-coding-agent-config/issues)
- 想贡献代码：欢迎 PR

---

MIT License
