---
name: vibe-agent-starter
display_name: Vibe Agent 配置向导
version: 1.0.0
author: lumihelia
author_id: 2ff65621-64a7-47ab-a9d3-ee9b1a5357d3
source_url: https://github.com/lumihelia/vibe-coding-agent-config
description: |
  为 vibe coding 初学者生成定制化 AI 编程助手配置——3 轮对话内完成 CLAUDE.md 模板、
  权限预配置和 MCP 工具引导。包含会话清理、模型选择、系统负载保护等进阶规则。
categories:
  functional:
    - 开发工具
    - 配置生成
  roles:
    - 非技术创始人
    - vibe coder
    - 产品经理
  output_formats:
    - 配置文件
    - CLAUDE.md
    - settings.json
  use_cases:
    - 项目初始化
    - AI助手配置
    - 入门引导
  dependencies:
    - 对话即用
  platforms:
    - Claude Code
    - Cursor
    - Windsurf
tags:
  - VIBE-CODING
  - CLAUDE-CODE
  - AGENT-CONFIG
  - BEGINNERS
  - SETUP
---

# Vibe Agent 配置向导

当用户调用此 skill，执行以下引导流程。

---

## 步骤 1：收集项目信息

询问用户以下问题（一次问完，不要逐条问）：

```
我来帮你生成一份定制化的 AI 助手配置。需要了解你的项目情况：

1. 项目阶段：MVP 原型 / 正式产品 / 个人工具
2. 技术栈：Python / JavaScript / TypeScript / 其他（请说明）
3. 项目类型：
   - Web 全栈（需要前后端）
   - 纯前端（React / Vue 等）
   - 后端 API
   - 自动化脚本
   - 其他
4. 是否需要数据库：是 / 否
5. 是否做前端界面：是（需要 UI 规范）/ 否
6. 你用的 AI 工具：Claude Code / Cursor / 两者都用 / 其他

有任何不确定的直接告诉我「不确定」，我会给你最合适的默认值。
```

---

## 步骤 2：生成 CLAUDE.md

根据用户回答，生成一份完整的 `CLAUDE.md` 文件，直接输出文件内容供用户复制。

**生成规则：**

- 技术栈偏好表格只列出用户实际使用的栈
- 如果有前端需求，在「代码规范」章节引用 `.agent/UI_STYLES.md`
- 如果有数据库需求，在「MCP 工具」章节提示 SQLite MCP
- 项目阶段是 MVP 时，在「自主决策范围」加入：「MVP 阶段：优先快速交付，遇到可以简化的设计选择时，选更简单的方案」

**固定包含的章节（所有项目）：**

- 角色定义
- 阶段 0 情境确认
- 错误处理协议
- 沟通规则
- 自主决策范围
- 技术栈偏好
- 代码规范
- 模型选择
- MCP 工具（按需填写）
- 系统资源与会话清理
- 记忆与持久化
- Context Window 管理
- Git 规则
- 交付清单
- 项目决策记录（空模板）

---

## 步骤 3：生成 settings.json

输出一份适合当前项目的 `.claude/settings.json`：

- 预批准的安全命令（根据技术栈调整：Python 项目加 pip，Node 项目加 npm）
- 禁止的危险操作（rm -rf、git push --force 等）
- 空的 `mcpServers` 对象

---

## 步骤 4：安装说明

```
生成了两个文件：

1. CLAUDE.md → 放在你项目的根目录
2. settings.json → 放在你项目的 .claude/ 文件夹里（没有就创建一个）

放好之后，下次打开 Claude Code 进入这个项目，AI 会自动读取配置。

想让 AI 能控制浏览器或查询数据库？
参考 .agent/MCP_GUIDE.md 继续设置 MCP 工具。
```

---

## 步骤 5：可选后续引导

```
配置已生成。还有两个可选的进阶设置：

A. MCP 工具设置 — 让 AI 能直接控制浏览器、查询数据库（约 5 分钟）
B. UI 设计风格配置 — 如果你的项目有前端界面（约 2 分钟）

需要我继续引导任何一项吗？
```

---

## 注意事项

- 生成的文件内容要完整，不要用省略号或占位符
- 语言跟随用户：中文问就中文回，英文问就英文回
- 不要问超过必要的问题——能推断就推断，标注「我帮你选了 X，如果不对告诉我」
- 整个流程控制在 3 轮对话以内完成
