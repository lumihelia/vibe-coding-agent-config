# Git 工作流程

> 版本控制的基本規則。Agent 在進行 Git 操作時必須遵循這些規範。

---

## 為什麼需要 Git？

Git 就像遊戲的「存檔點」：

- **可以回溯** - 搞砸了可以回到之前的版本
- **可以分支** - 嘗試新功能不會影響正常運作的程式碼
- **可以協作** - 多人開發時不會互相覆蓋

---

## Commit 規則

### 何時該 Commit

| 應該 Commit | 不應該 Commit |
|-------------|---------------|
| 完成一個小功能 | 程式碼還不能執行 |
| 修好一個 bug | 改到一半 |
| 重構完成且測試通過 | 「先 commit 等等再說」 |
| 新增/刪除檔案後 | 包含 API key 或密碼的檔案 |

### Commit Message 格式

```
<類型>: <簡短描述>

[可選：詳細說明]
```

**類型選項：**

| 類型 | 用途 | 範例 |
|------|------|------|
| `feat` | 新功能 | `feat: 新增用戶登入功能` |
| `fix` | 修復 bug | `fix: 修正購物車計算錯誤` |
| `refactor` | 重構（不改變功能） | `refactor: 簡化驗證邏輯` |
| `docs` | 文檔更新 | `docs: 更新 README 安裝說明` |
| `style` | 格式調整（不影響邏輯） | `style: 統一縮排格式` |
| `test` | 測試相關 | `test: 新增登入功能測試` |
| `chore` | 雜項（依賴、配置） | `chore: 更新依賴版本` |

**範例：**

```bash
# 好的 commit message
git commit -m "feat: 新增密碼重設功能"
git commit -m "fix: 修正手機版選單無法關閉的問題"
git commit -m "refactor: 將 API 呼叫抽取到 service 層"

# 不好的 commit message
git commit -m "update"
git commit -m "fix bug"
git commit -m "改了一些東西"
```

---

## 分支策略（簡化版）

對於個人專案或小團隊，使用簡單的兩分支模式：

```
main ─────────────────────────────────────
       \                    /
        \──── feature ─────/
```

### 分支命名

```
feature/功能名稱    # 新功能
fix/問題描述        # 修復
experiment/實驗名   # 實驗性嘗試
```

**範例：**

```bash
git checkout -b feature/user-login
git checkout -b fix/cart-calculation
git checkout -b experiment/new-ui
```

### 工作流程

```bash
# 1. 從 main 創建新分支
git checkout main
git pull
git checkout -b feature/my-feature

# 2. 開發並 commit
git add .
git commit -m "feat: 實作功能"

# 3. 完成後合併回 main
git checkout main
git merge feature/my-feature

# 4. 刪除用完的分支
git branch -d feature/my-feature
```

---

## 永遠不要 Commit 的檔案

這些檔案必須加入 `.gitignore`：

```gitignore
# 環境變數（包含密鑰）
.env
.env.local
.env.*.local

# 依賴目錄
node_modules/
venv/
__pycache__/

# 編輯器設定
.vscode/
.idea/

# 系統檔案
.DS_Store
Thumbs.db

# 建置產物
dist/
build/
*.pyc
```

---

## Agent Git 操作規則

### 可以自動執行

- `git status` - 查看狀態
- `git diff` - 查看變更
- `git add` - 暫存檔案
- `git commit` - 提交（使用規範的 message）
- `git log` - 查看歷史
- `git branch` - 列出/建立分支

### 必須先詢問用戶

- `git push` - 推送到遠端
- `git merge` - 合併分支
- `git reset --hard` - 硬重置（會丟失變更）
- `git rebase` - 變基操作
- 任何涉及 `--force` 的操作

### 發現問題時

如果 Agent 發現：

```
1. .env 檔案被暫存 → 警告用戶並從暫存移除
2. 大型二進位檔案 → 建議加入 .gitignore
3. 敏感資訊在程式碼中 → 停止並警告
```

---

## 常見情境處理

### 情境 1：忘記建立分支就開始改了

```bash
# 還沒 commit 的話
git stash                          # 暫存變更
git checkout -b feature/new        # 建立新分支
git stash pop                      # 恢復變更
```

### 情境 2：Commit 了但訊息寫錯

```bash
# 只能改最後一次 commit
git commit --amend -m "正確的訊息"
```

### 情境 3：想撤銷最後一次 commit（保留變更）

```bash
git reset --soft HEAD~1
```

### 情境 4：想完全放棄所有變更

```bash
# 警告：這會丟失所有未 commit 的變更！
git checkout .
git clean -fd
```

---

## 快速參考

```bash
# 基本操作
git status                    # 查看狀態
git add .                     # 暫存所有變更
git commit -m "訊息"          # 提交
git log --oneline -5          # 查看最近 5 筆 commit

# 分支操作
git branch                    # 列出分支
git checkout -b 分支名        # 建立並切換
git checkout main            # 切換到 main
git merge 分支名             # 合併分支

# 撤銷操作
git checkout -- 檔案名       # 撤銷單一檔案變更
git reset --soft HEAD~1      # 撤銷最後 commit（保留變更）
```
