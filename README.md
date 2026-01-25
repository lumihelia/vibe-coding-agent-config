# Vibe Coding Agent Config Kit

**让 AI 更懂你的「说明书」**

---

## 你不需要懂代码

这套工具是给「用 AI 写代码的人」准备的。

不管你是：

- 第一次用 AI 写程序的创业者
- 想让 AI 帮忙做项目的设计师
- 只是好奇想试试的普通人

**你都可以用。**

---

## 它能帮你解决什么？

用 AI 写代码时，你可能遇到过这些问题：

| 问题 | 用了这套配置后 |
|------|---------------|
| AI 问太多问题，很烦 | AI 会自己判断，小问题自己解决 |
| AI 写的代码乱七八糟 | AI 会按照统一的规范写代码 |
| AI 解释一大堆看不懂 | AI 会简洁回答，不啰嗦 |
| 每次都要重新教 AI | 配置文件帮你记住所有规则 |

---

## 选择你的语言

| 语言 | 说明 | 开始使用 |
|------|------|---------|
| **简体中文** | 为大陆用户优化 | [开始使用 →](./zh-CN/README.md) |
| **繁體中文** | 為台港澳用戶設計 | [開始使用 →](./zh/README.md) |
| **English** | For English speakers | [Get Started →](./en/README.md) |

---

## 怎么用？

### 方法一：一条命令搞定（推荐）

打开终端（Terminal），输入：

```bash
npx vibe-coding-config init
```

就这样，配置文件会自动复制到你的项目里。

**其他语言版本：**

```bash
npx vibe-coding-config init --lang en      # English
npx vibe-coding-config init --lang zh-CN   # 简体中文
```

### 方法二：手动下载

1. 点击页面上的绿色「Code」按钮
2. 选择「Download ZIP」
3. 解压后，把对应语言文件夹里的文件复制到你的项目

---

## 支持哪些 AI 工具？

基本上，主流的 AI 编程工具都能用：

| 工具 | 公司 |
|------|------|
| Claude Code | Anthropic |
| Cursor | Anysphere |
| Windsurf | Codeium |
| GitHub Copilot | Microsoft |
| Gemini CLI | Google |

用 `export` 命令可以转换成不同工具的格式：

```bash
npx vibe-coding-config export --target cursor
npx vibe-coding-config export --target copilot
```

---

## 里面有什么？

```
zh-CN/（或 zh/ 或 en/）
├── AGENT.md           # AI 的工作手册（你不用看）
├── CODE_STANDARDS.md  # 代码规范
├── SKILLS.md          # AI 能做什么
├── EXAMPLES.md        # 使用示例
├── UI_STYLES.md       # 界面设计风格
└── GIT_WORKFLOW.md    # 版本控制规则
```

**你需要看哪个？**

- 大部分情况下：**都不用看**，AI 会自己读
- 想改规则：看 `CODE_STANDARDS.md`
- 做前端项目：看 `UI_STYLES.md`
- 好奇 AI 能做什么：看 `SKILLS.md`

---

## 常见问题

**Q: 我完全不懂代码，真的能用吗？**

能。把文件放到项目里，告诉 AI「请先读 .agent 文件夹」，就可以了。

**Q: 免费吗？**

完全免费，MIT 开源协议。

**Q: 遇到问题怎么办？**

[提一个 Issue](https://github.com/lumihelia/vibe-coding-agent-config/issues)，我会尽量帮忙。

**Q: 看完还是不懂怎么办？**

没关系！直接把这个仓库的链接发给你正在用的 AI（Claude、ChatGPT、Gemini 都行），然后说：

> 「我想用这套配置来帮助你更好地帮我写代码，请一步一步指导我怎么设置。」

AI 会手把手教你操作的。

---

## 关于这个项目

这套配置是为「非技术背景但想用 AI 写代码的人」设计的。

我自己是从几乎不太懂代码开始的。第一次看到满屏幕的技术文档时（给 Claude Code 配置终端），那种「两眼发黑崩溃到想哭」的感觉…我懂。

所以我想做一套真正对新手友好的东西。

希望它能帮到你。

---

MIT License | Made by [lumihelia](https://github.com/lumihelia)
