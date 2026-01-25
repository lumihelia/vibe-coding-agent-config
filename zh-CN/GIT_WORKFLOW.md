# Git 工作流程

> 版本控制的基本规则。Agent 在进行 Git 操作时必须遵循这些规范。

---

## 为什么需要 Git？

Git 就像游戏的「存档点」：

- **可以回溯** - 搞砸了可以回到之前的版本
- **可以分支** - 尝试新功能不会影响正常运作的代码
- **可以协作** - 多人开发时不会互相覆盖

---

## Commit 规则

### 何时该 Commit

| 应该 Commit | 不应该 Commit |
|-------------|---------------|
| 完成一个小功能 | 代码还不能执行 |
| 修好一个 bug | 改到一半 |
| 重构完成且测试通过 | 「先 commit 等等再说」 |
| 新增/删除文件后 | 包含 API key 或密码的文件 |

### Commit Message 格式

```
<类型>: <简短描述>

[可选：详细说明]
```

**类型选项：**

| 类型 | 用途 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat: 新增用户登录功能` |
| `fix` | 修复 bug | `fix: 修正购物车计算错误` |
| `refactor` | 重构（不改变功能） | `refactor: 简化验证逻辑` |
| `docs` | 文档更新 | `docs: 更新 README 安装说明` |
| `style` | 格式调整（不影响逻辑） | `style: 统一缩进格式` |
| `test` | 测试相关 | `test: 新增登录功能测试` |
| `chore` | 杂项（依赖、配置） | `chore: 更新依赖版本` |

**示例：**

```bash
# 好的 commit message
git commit -m "feat: 新增密码重置功能"
git commit -m "fix: 修正手机版菜单无法关闭的问题"
git commit -m "refactor: 将 API 调用抽取到 service 层"

# 不好的 commit message
git commit -m "update"
git commit -m "fix bug"
git commit -m "改了一些东西"
```

---

## 分支策略（简化版）

对于个人项目或小团队，使用简单的两分支模式：

```
main ─────────────────────────────────────
       \                    /
        \──── feature ─────/
```

### 分支命名

```
feature/功能名称    # 新功能
fix/问题描述        # 修复
experiment/实验名   # 实验性尝试
```

**示例：**

```bash
git checkout -b feature/user-login
git checkout -b fix/cart-calculation
git checkout -b experiment/new-ui
```

### 工作流程

```bash
# 1. 从 main 创建新分支
git checkout main
git pull
git checkout -b feature/my-feature

# 2. 开发并 commit
git add .
git commit -m "feat: 实现功能"

# 3. 完成后合并回 main
git checkout main
git merge feature/my-feature

# 4. 删除用完的分支
git branch -d feature/my-feature
```

---

## 永远不要 Commit 的文件

这些文件必须加入 `.gitignore`：

```gitignore
# 环境变量（包含密钥）
.env
.env.local
.env.*.local

# 依赖目录
node_modules/
venv/
__pycache__/

# 编辑器设置
.vscode/
.idea/

# 系统文件
.DS_Store
Thumbs.db

# 构建产物
dist/
build/
*.pyc
```

---

## Agent Git 操作规则

### 可以自动执行

- `git status` - 查看状态
- `git diff` - 查看变更
- `git add` - 暂存文件
- `git commit` - 提交（使用规范的 message）
- `git log` - 查看历史
- `git branch` - 列出/创建分支

### 必须先询问用户

- `git push` - 推送到远端
- `git merge` - 合并分支
- `git reset --hard` - 硬重置（会丢失变更）
- `git rebase` - 变基操作
- 任何涉及 `--force` 的操作

### 发现问题时

如果 Agent 发现：

```
1. .env 文件被暂存 → 警告用户并从暂存移除
2. 大型二进制文件 → 建议加入 .gitignore
3. 敏感信息在代码中 → 停止并警告
```

---

## 常见情境处理

### 情境 1：忘记创建分支就开始改了

```bash
# 还没 commit 的话
git stash                          # 暂存变更
git checkout -b feature/new        # 创建新分支
git stash pop                      # 恢复变更
```

### 情境 2：Commit 了但消息写错

```bash
# 只能改最后一次 commit
git commit --amend -m "正确的消息"
```

### 情境 3：想撤销最后一次 commit（保留变更）

```bash
git reset --soft HEAD~1
```

### 情境 4：想完全放弃所有变更

```bash
# 警告：这会丢失所有未 commit 的变更！
git checkout .
git clean -fd
```

---

## 快速参考

```bash
# 基本操作
git status                    # 查看状态
git add .                     # 暂存所有变更
git commit -m "消息"          # 提交
git log --oneline -5          # 查看最近 5 笔 commit

# 分支操作
git branch                    # 列出分支
git checkout -b 分支名        # 创建并切换
git checkout main            # 切换到 main
git merge 分支名             # 合并分支

# 撤销操作
git checkout -- 文件名       # 撤销单一文件变更
git reset --soft HEAD~1      # 撤销最后 commit（保留变更）
```
