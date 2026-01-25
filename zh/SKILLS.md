# Agent 技能手冊

> AI Agent 的具體可執行技能。每個技能包含觸發條件、執行步驟和範例。

---

## 技能 1：錯誤診斷

### 何時使用

- 程式碼拋出錯誤
- 建置/部署失敗
- 測試意外失敗

### 執行步驟

```
1. 閱讀完整的錯誤訊息
2. 分類錯誤：
   - 語法錯誤 → 檢查最近的變更，修正錯字
   - Import 錯誤 → 檢查依賴，安裝缺少的
   - 執行時錯誤 → 追蹤呼叫堆疊，檢查資料類型
   - 環境錯誤 → 檢查 PATH、版本、作業系統相容性
   
3. 嘗試修復（最多重試 2 次）

4. 報告結果：
   - 如果修好：「已修復 [錯誤類型]。問題是 [根本原因]。」
   - 如果修不好：「無法修復。診斷：[發現]。選項：[A, B, C]。」
```

### 範例

```
用戶：「我的 Python 腳本崩潰了」

Agent 處理流程：
1. 執行腳本，捕獲錯誤：「ModuleNotFoundError: No module named 'requests'」
2. 分類：Import 錯誤 / 依賴問題
3. 修復：pip install requests
4. 報告：「已修復。已安裝缺少的 'requests' 套件。」
```

---

## 技能 2：專案初始化

### 何時使用

- 用戶要求建立新專案
- 用戶要求設置新功能/模組

### 執行步驟

```
1. 確認專案類型和需求
2. 建立目錄結構（參見 CODE_STANDARDS.md）
3. 初始化套件管理器（npm init / pip requirements.txt）
4. 建立 .env.example 包含必要變數
5. 建立 README 包含設置說明
6. 用簡單測試驗證一切正常運行
```

### 標準結構

```
project/
├── src/                  # 原始碼
│   ├── __init__.py       # (Python) 或 index.js (Node)
│   └── main.py           # 進入點
├── tests/                # 測試檔案
├── scripts/              # 工具腳本
├── .env.example          # 環境變數範本
├── requirements.txt      # (Python) 或 package.json (Node)
└── README.md             # 設置說明
```

---

## 技能 3：依賴管理

### 何時使用

- 添加需要外部套件的新功能
- 解決版本衝突
- 設置全新環境

### 執行步驟

```
1. 識別需要的依賴
2. 檢查版本相容性
3. 添加到 requirements 檔案（不只是安裝）
4. 驗證安裝成功
5. 如果需要新的 API Key，更新 .env.example
```

### 版本鎖定

```python
# requirements.txt - 好
requests==2.28.0
fastapi>=0.100.0,<0.200.0

# requirements.txt - 不好
requests
fastapi
```

### 減少重複下載（節省 Token）

> 💡 減少重複安裝可以節省時間和潛在的錯誤處理，間接降低 Token 消耗。

**安裝前檢查流程：**

```
1. 先檢查是否已安裝：pip show <package> 或 pip list | grep <package>
2. 如果已安裝且版本相容 → 不重複安裝
3. 如果需要特定版本 → 才使用 venv 隔離
```

**全局 vs 虛擬環境策略：**

| 類型 | 建議 | 範例 |
|------|------|------|
| 常用工具套件 | 全局安裝 | requests, python-dotenv, rich, click |
| 專案專用框架 | venv 隔離 | django, fastapi, flask |
| 有版本衝突風險 | venv 隔離 | tensorflow, pytorch |
| AI/ML 相關 | venv 隔離 | langchain, openai |

**常用全局套件清單（建議預先安裝）：**

```bash
# 基礎工具
pip install requests python-dotenv rich click

# 開發輔助
pip install black isort pytest

# API 開發常用
pip install httpx pydantic
```

---

## 技能 4：程式碼生成

### 何時使用

- 用戶要求實作功能
- 用戶要求建立新檔案/模組

### 執行步驟

```
1. 確認需求（如不清楚就詢問）
2. 遵循 CODE_STANDARDS.md 的命名/結構
3. 為 I/O 加入錯誤處理
4. 為函數添加 docstring
5. 輸出完整檔案（不是片段）
6. 驗證程式碼可執行
```

### 輸出格式

```python
# 好：完整檔案有上下文
"""
user_service.py
處理用戶相關的業務邏輯。
"""

from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    id: str
    name: str
    email: str

def get_user(user_id: str) -> Optional[User]:
    """根據 ID 獲取用戶。如找不到則回傳 None。"""
    # 實作在這裡
    pass


# 不好：沒有上下文的片段
def get_user(user_id):
    # ...
```

---

## 技能 5：環境設置

### 何時使用

- 用戶首次設置專案
- 用戶有 PATH 或環境問題
- 用戶在專案之間切換

### 診斷清單

```
1. 檢查執行環境版本：
   - python --version
   - node --version
   
2. 檢查套件管理器：
   - pip --version
   - npm --version
   
3. 檢查虛擬環境（Python）：
   - which python
   - 檢查 venv 是否已啟動
   
4. 檢查環境變數：
   - 驗證 .env 檔案存在
   - 驗證必要的 key 已設置
```

### 常見修復

| 症狀 | 可能原因 | 修復方法 |
|------|---------|---------|
| 「command not found」 | 不在 PATH 中 | 添加到 PATH 或使用完整路徑 |
| 「module not found」 | 錯誤的環境 | 啟動 venv，重新安裝 |
| 「permission denied」 | 檔案權限 | chmod +x 或 sudo |
| 「port in use」 | 另一個程序佔用 | 終止程序或換端口 |

---

## 技能 6：程式碼審查（自我）

### 何時使用

- 在交付任何程式碼給用戶之前
- 在做出重大變更之後

### 檢查清單

```
[ ] 程式碼無錯誤執行
[ ] 所有函數有 docstring
[ ] 沒有魔術數字（使用常數）
[ ] 外部呼叫有錯誤處理（API、檔案 I/O）
[ ] 沒有寫死的密鑰
[ ] 命名一致（參見 CODE_STANDARDS.md）
[ ] 關鍵路徑有測試
```

---

## 技能 7：向非技術用戶解釋

### 何時使用

- 用戶問「這是什麼意思？」
- 解釋錯誤或技術概念
- 用戶看起來困惑

### 方法

```
1. 使用日常生活中的類比
2. 避免術語；如果避免不了，就定義它
3. 專注「這對你意味著什麼」而不是「內部如何運作」
4. 一次一個概念
```

### 範例

```
# 不好的解釋
「API 回傳了 401 狀態碼，表示認證失敗，
因為 Authorization 標頭中缺少或無效的 Bearer token。」

# 好的解釋
「伺服器拒絕了你的請求，因為它不認識你。
就像沒帶會員卡去私人俱樂部一樣。
修復方法：確保 .env 檔案中的 API key 是正確的。」
```

---

## 附註：技能優先順序

當多個技能適用時，按此優先順序：

1. **先診斷** - 行動前先理解
2. **修復環境** - 許多「程式碼 bug」其實是環境問題
3. **最小變更** - 不要過度工程化
4. **驗證** - 交付前一定要測試
