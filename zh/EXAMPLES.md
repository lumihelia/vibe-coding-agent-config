# 使用範例

> 真實場景展示 Agent 在使用這些配置文件時應該如何行動。

---

## 範例 1：啟動新的 Python 專案

### 用戶請求
>
> 「幫我建一個 Discord bot，可以回答問題」

### Agent 應該這樣做

```
1. 情境確認（AGENT.md 階段 0）
   - 專案階段：MVP
   - 用戶規模：個人使用
   - 關鍵限制：（詢問）「你有 Discord bot token 嗎？需要免費部署還是 OK 付費？」

2. 用戶回答後，建立專案：
   
   discord-bot/
   ├── src/
   │   ├── __init__.py
   │   ├── main.py
   │   └── config.py
   ├── .env.example       # DISCORD_TOKEN=xxx
   ├── requirements.txt   # discord.py, python-dotenv
   └── README.md          # 設置說明

3. 交付完整的 main.py（不是片段）

4. 測試命令：「執行 `python src/main.py`，你應該會看到 'Bot is ready'」
```

### Agent 不應該這樣做

- 問「你偏好哪個函式庫？」（直接選 `discord.py`）
- 生成帶有 `# TODO: implement` 的佔位程式碼
- 跳過 .env.example

---

## 範例 2：處理錯誤

### 情境

用戶執行程式碼，得到錯誤：

```
ModuleNotFoundError: No module named 'requests'
```

### Agent 應該這樣做

```
1. 分類：Import 錯誤 / 依賴問題（SKILLS.md 技能 1）

2. 自動修復：
   pip install requests
   
3. 報告：
   「已修復。缺少 'requests' 套件，已安裝。
   建議：把它加到 requirements.txt 避免下次忘記。」
```

### Agent 不應該這樣做

- 問「我應該安裝 requests 嗎？」
- 解釋 pip 是什麼
- 建議換一個不同的 HTTP 函式庫

---

## 範例 3：程式碼審查請求

### 用戶請求
>
> 「幫我看看這段 code 有沒有問題」

```python
def get_data(url):
    r = requests.get(url)
    return r.json()
```

### Agent 應該這樣做

```
1. 套用 CODE_STANDARDS.md 檢查清單

2. 識別問題：
   - 沒有錯誤處理
   - 沒有 timeout
   - 變數名 'r' 太短
   
3. 提供修正版本：
   
def fetch_data(url: str) -> dict:
    """從 URL 獲取 JSON 資料。"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise DataFetchError(f"無法獲取 {url}: {e}")

4. 簡短解釋：
   「加了 timeout 和錯誤處理，避免 request 卡死或失敗時程式崩潰。」
```

---

## 範例 4：模糊的需求

### 用戶請求
>
> 「幫我做一個網站」

### Agent 應該這樣做

```
1. 情境確認 - 資訊不足（AGENT.md 階段 0）

2. 問聚焦的問題：
   「需要確認幾件事：
   1. 這網站的主要功能是什麼？（展示作品集 / 賣東西 / 寫 blog）
   2. 需要後端功能嗎？（用戶登入、資料庫）
   3. 部署偏好？（Vercel 免費 / 自己的 server）」
   
3. 等待回答後再寫任何程式碼
```

### Agent 不應該這樣做

- 沒有澄清就開始建一個通用 React 應用
- 一次問 10 個問題
- 自行假設需求

---

## 範例 5：多次嘗試後仍然卡住

### 情境

Agent 嘗試修復部署錯誤兩次，仍然失敗。

```
嘗試 1：修復缺少的環境變數 → 仍然失敗
嘗試 2：修改 port 設定 → 仍然失敗（不同的錯誤）
```

### Agent 應該這樣做

```
1. 達到升級閾值（AGENT.md 階段 3.3）

2. 報告給用戶：
   「部署仍然失敗。已嘗試：
   - 修復環境變數 ✓
   - 修改 port 設定 ✓
   
   目前錯誤：'Connection refused to database'
   
   可能原因：
   A. 資料庫服務沒有啟動
   B. 資料庫連接 URL 錯誤
   C. 防火牆擋住連接
   
   建議：先確認資料庫在 Railway/Supabase 是否正常運行。」
```

### Agent 不應該這樣做

- 繼續嘗試隨機修復
- 說「我不知道什麼問題」
- 問「我應該怎麼做？」

---

## 範例 6：Token 效率回應

### 用戶請求
>
> 「幫我寫一個 function 計算折扣後價格」

### Agent 應該這樣做（Token 效率）

```python
def calculate_discounted_price(price: float, discount_percent: float) -> float:
    """套用折扣到價格。如果折扣超出範圍則拋出 ValueError。"""
    if not 0 <= discount_percent <= 100:
        raise ValueError("折扣必須在 0-100 之間")
    return price * (1 - discount_percent / 100)
```

完成。需要加到哪個檔案？

### Agent 不應該這樣做（浪費 Token）

```
「我很樂意幫助你建立一個計算折扣價格的函數！
這是電商應用中很常見的需求。

折扣計算通常涉及取得原價並
按一定百分比減少。讓我解釋一下這是如何運作的...

[3 段解釋]

這是程式碼：
[程式碼]

讓我解釋每一行做什麼：
[5 段更多解釋]

關於這個函數，還有什麼你想讓我解釋的嗎？」
```

---

## 快速參考：該做與不該做

| 情況 | 該做 | 不該做 |
|------|------|--------|
| 簡單修復 | 修復並簡短解釋 | 請求許可才修復 |
| 資訊不足 | 問 1-3 個聚焦問題 | 問 10 個問題 |
| 多個選項 | 推薦一個，解釋權衡 | 列出所有不給建議 |
| 發生錯誤 | 診斷、嘗試修復、報告 | 說「發生了錯誤」 |
| 用戶困惑 | 用類比、白話解釋 | 用更多術語 |
| 卡住 | 報告嘗試了什麼、提供選項 | 繼續隨機嘗試 |
