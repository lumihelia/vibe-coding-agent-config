# Vibe Coding 配置文件指南

> 讓 AI Agent 更聰明地幫你寫代碼

---

## 30 秒理解

這些文件是給 AI Agent（如 Claude、Gemini）的「工作說明書」。它們告訴 Agent：

- 你是什麼角色
- 你應該怎麼寫代碼
- 遇到問題時怎麼處理

**結果**：Agent 產出更高品質的代碼，減少你的維護成本。

---

## 快速開始（5 分鐘）

### Step 1: 複製文件到你的項目

```bash
# 在你的項目根目錄創建 .agent 資料夾
mkdir -p .agent

# 複製這些文件到 .agent 資料夾
cp AGENT.md SKILLS.md CODE_STANDARDS.md UI_STYLES.md .agent/
```

### Step 2: 告訴 Agent 讀取這些文件

在與 Agent 對話時，加入這句：

```
請先閱讀 .agent/ 資料夾中的配置文件，然後再開始工作。
```

### Step 3: 開始使用

正常與 Agent 對話即可。它會自動遵循你的規則。

---

## 文件結構說明

| 文件 | 給誰看 | 作用 |
|------|--------|------|
| **README.md** | 人類 | 說明這些文件怎麼用（你正在讀的這個） |
| **AGENT.md** | AI Agent | 核心系統指令：角色定義、執行規則、Token 效率 |
| **SKILLS.md** | AI Agent | 具體技能：錯誤處理流程、代碼生成模板 |
| **CODE_STANDARDS.md** | AI Agent | 代碼規範：命名、結構、註釋標準 |
| **EXAMPLES.md** | 人類 + AI | 使用示例：典型場景下 Agent 應該怎麼做 |
| **UI_STYLES.md** | AI Agent | 設計系統：顏色、字體、組件樣式（可自定義） |

---

## 你會獲得什麼

| 目標 | 對應文件 | 效果 |
|------|---------|------|
| 更可維護的代碼 | CODE_STANDARDS.md | Agent 遵循一致的命名、結構、註釋標準 |
| 自動修復錯誤 | AGENT.md + SKILLS.md | 遇錯時自動診斷和修復，不需你手動指出 |
| 節省 Token | AGENT.md | 簡潔輸出，不浪費在重複解釋上 |
| 自主解決問題 | AGENT.md | 只在真正需要時才問你 |

---

## 常見問題

### Q: 這些文件適用於哪些 AI Agent？

適用於所有支持系統指令的 Agent，包括：

| 產品 | 公司 | 指令文件格式 |
|------|------|-------------|
| Claude Code | Anthropic | CLAUDE.md |
| Cursor | Anysphere | .cursorrules |
| Windsurf | Codeium | 自定義規則 |
| Gemini CLI / Antigravity | Google | GEMINI.md |
| Jules | Google | 自定義規則 |
| GitHub Copilot | GitHub/Microsoft | .github/copilot-instructions.md |

> 💡 本套件提供通用指令，適用於所有平台。只需複製內容到對應工具的文件格式即可。

### Q: 我可以修改這些文件嗎？

當然！這些只是起點。根據你的需求調整規則。

### Q: 如果 Agent 沒有遵循規則怎麼辦？

1. 確保你在對話開始時提醒 Agent 讀取文件
2. 對於重要規則，可以在對話中再次強調
3. 考慮縮短文件長度，只保留最關鍵的規則

---

## 下一步

1. 閱讀 [AGENT.md](./AGENT.md) 了解核心規則
2. 閱讀 [EXAMPLES.md](./EXAMPLES.md) 看實際使用場景
3. 根據需要調整 [CODE_STANDARDS.md](./CODE_STANDARDS.md)
4. 自定義 [UI_STYLES.md](./UI_STYLES.md) 的設計風格
