# MCP 工具配置指南

> MCP（Model Context Protocol）是让 AI Agent 直接操作外部工具的插件机制。
> 就像给 Claude 安装「外接设备」，让它能直接行动，而不只是给你操作步骤。

---

## 什么时候需要 MCP？

Claude Code 自身已经能读写文件、执行终端命令。MCP 解决的是**更专用的需求**：

| 你想做的事 | 没有 MCP | 有了 MCP |
|-----------|---------|---------|
| 测试网页界面 | Claude 给你步骤，你手动操作 | Claude 直接控制浏览器测试 |
| 查数据库内容 | Claude 帮你写查询，你执行后贴回结果 | Claude 直接执行查询并读取结果 |
| 管理 GitHub Issue | Claude 给你 API 命令，你逐条执行 | Claude 直接读写 Issue |
| 查最新文档 | Claude 只有训练数据，知识有截止日期 | Claude 实时搜索网络 |

---

## 安装前提条件

确认 Node.js 已安装（大多数 MCP 通过 npm 运行）：

```bash
node --version
```

如果显示版本号（如 `v20.x.x`）就 OK。如果提示 command not found，先到 [nodejs.org](https://nodejs.org) 安装 LTS 版本。

---

## 配置方法

MCP 在 `.claude/settings.json` 文件里配置。这个文件放在你的**项目根目录**的 `.claude/` 文件夹里。

### 第 1 步：创建配置文件夹

```bash
mkdir -p .claude
```

### 第 2 步：复制配置模板

把 `.agent/settings.json.example` 复制为 `.claude/settings.json`：

```bash
cp .agent/settings.json.example .claude/settings.json
```

### 第 3 步：在文件里取消注释你需要的 MCP

用任何文本编辑器打开 `.claude/settings.json`，按下方说明修改。

### 第 4 步：验证连接

在 Claude Code 里输入 `/mcp`，会显示已连接的 MCP 服务器列表。

---

## 常用 MCP 配置

### MCP 1：Puppeteer（控制浏览器）

**适合：** 做网页开发的人，想让 Agent 直接打开浏览器测试界面

```json
{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

**配置后 Agent 可以做：**
- 打开你的本地网页，截图检查界面是否正常
- 填写表单、点击按钮测试功能
- 检查控制台错误

---

### MCP 2：SQLite（操作本地数据库）

**适合：** 项目使用 SQLite 数据库的人

把 `your-database.db` 替换成你实际的数据库文件路径：

```json
{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "your-database.db"]
    }
  }
}
```

**配置后 Agent 可以做：**
- 直接查询数据库验证数据是否正确
- 检查表结构
- 修复数据问题

---

### MCP 3：GitHub（管理代码仓库）

**适合：** 使用 GitHub 管理项目的人

**前提：** 需要 GitHub Personal Access Token
1. 打开 GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 点 Generate new token，勾选 `repo` 权限
3. 复制生成的 token

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_你的token"
      }
    }
  }
}
```

**配置后 Agent 可以做：**
- 读取和创建 Issue
- 查看 PR 状态和评论
- 搜索代码仓库

---

### MCP 4：Brave Search（实时网络搜索）

**适合：** 想让 Agent 查询最新文档、库版本、或实时资讯的人

**前提：** 需要 Brave Search API Key
1. 访问 [brave.com/search/api](https://brave.com/search/api/)
2. 注册后申请 API Key（免费额度 2000 次/月）

```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "你的API_KEY"
      }
    }
  }
}
```

**配置后 Agent 可以做：**
- 搜索最新的库文档
- 查找 error message 的解决方案
- 获取实时信息

---

## 同时使用多个 MCP

将多个 MCP 合并到同一个 `settings.json` 的 `mcpServers` 对象里：

```json
{
  "permissions": {
    "allow": [
      "Bash(git *)",
      "Bash(npm *)",
      "Bash(python *)"
    ],
    "deny": [
      "Bash(git push --force*)",
      "Bash(rm -rf *)"
    ]
  },
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "data.db"]
    }
  }
}
```

---

## 配置完成后，更新 CLAUDE.md

在 `CLAUDE.md` 的「MCP 工具」章节里记录你配置了什么，这样 Agent 知道有哪些工具可用：

```markdown
## MCP 工具

**本项目已配置的 MCP：**
- puppeteer — 控制浏览器测试 Web 界面
- sqlite — 直接查询 data.db 数据库
```

---

## 安全提醒

- `.claude/settings.json` 如果包含 API Key，应该加入 `.gitignore`
- 建议用环境变量替代硬写 token：`"GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"`
- 只安装来自官方或你信任来源的 MCP 包
