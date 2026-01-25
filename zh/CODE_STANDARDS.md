# 程式碼規範

> 統一、可維護的程式碼規範。Agent 在生成程式碼時必須遵循這些規範。

---

## 命名規範

### 通用規則

| 類型 | 規範 | 範例 |
|------|------|------|
| 變數 | snake_case | `user_name`, `total_count` |
| 函數 | snake_case | `get_user()`, `calculate_total()` |
| 類別 | PascalCase | `UserService`, `DataProcessor` |
| 常數 | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| 檔案（Python） | snake_case | `user_service.py` |
| 檔案（JS/TS） | camelCase 或 kebab-case | `userService.js`, `user-service.ts` |

### 命名品質

```python
# 不好：模糊的名稱
def process(d):
    x = d['a'] + d['b']
    return x

# 好：描述性的名稱
def calculate_total_price(order_data):
    subtotal = order_data['item_price'] + order_data['tax']
    return subtotal
```

---

## 檔案結構

### Python 專案

```
project/
├── src/
│   ├── __init__.py
│   ├── main.py              # 進入點
│   ├── config.py            # 環境和設定
│   ├── models/              # 資料模型（Pydantic、dataclass）
│   │   ├── __init__.py
│   │   └── user.py
│   └── services/            # 業務邏輯
│       ├── __init__.py
│       └── user_service.py
├── tests/
│   ├── __init__.py
│   └── test_user_service.py
├── scripts/
│   └── setup.py             # 一鍵設置
├── .env.example
├── requirements.txt
└── README.md
```

### JavaScript/TypeScript 專案

```
project/
├── src/
│   ├── index.js             # 進入點
│   ├── config.js            # 環境和設定
│   ├── models/
│   │   └── user.js
│   └── services/
│       └── userService.js
├── tests/
│   └── userService.test.js
├── .env.example
├── package.json
└── README.md
```

---

## 函數設計

### 單一職責

每個函數應該只做一件事。

```python
# 不好：做太多事
def process_and_save_user(user_data):
    validated = validate(user_data)
    enriched = add_defaults(validated)
    db.save(enriched)
    send_email(enriched)
    log_action(enriched)
    return enriched

# 好：單一職責
def validate_user(user_data):
    # 只做驗證
    pass

def save_user(user):
    # 只做儲存
    pass
```

### 函數長度

- 目標：20 行以內
- 最大：50 行（超過就考慮拆分）

### 參數

- 最多 4 個參數
- 如果需要更多，使用設定物件/dataclass

```python
# 不好：太多參數
def create_user(name, email, age, city, country, phone, role, status):
    pass

# 好：使用 dataclass
@dataclass
class UserCreateRequest:
    name: str
    email: str
    age: int
    city: str
    country: str
    phone: str
    role: str = "user"
    status: str = "active"

def create_user(request: UserCreateRequest):
    pass
```

---

## 錯誤處理

### 始終處理外部呼叫

```python
# 不好：沒有錯誤處理
def fetch_data(url):
    response = requests.get(url)
    return response.json()

# 好：有錯誤處理
def fetch_data(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.Timeout:
        raise DataFetchError(f"請求 {url} 逾時")
    except requests.HTTPError as e:
        raise DataFetchError(f"HTTP 錯誤：{e.response.status_code}")
```

### 自定義例外

```python
# 定義專案專用的例外
class ProjectError(Exception):
    """此專案的基底例外。"""
    pass

class DataFetchError(ProjectError):
    """無法獲取外部資料。"""
    pass

class ValidationError(ProjectError):
    """輸入驗證失敗。"""
    pass
```

---

## 註釋與文檔

### Docstring（函數必須有）

```python
def calculate_discount(price: float, discount_percent: float) -> float:
    """
    計算折扣後的價格。
    
    參數：
        price: 原價（美元）
        discount_percent: 折扣百分比（0-100）
        
    回傳：
        折扣後價格
        
    例外：
        ValueError: 如果 discount_percent 為負數或 > 100
    """
    if not 0 <= discount_percent <= 100:
        raise ValueError("折扣必須在 0 到 100 之間")
    return price * (1 - discount_percent / 100)
```

### 行內註釋

```python
# 不好：說明做什麼（顯而易見）
x = x + 1  # 將 x 加 1

# 好：說明為什麼（不明顯）
x = x + 1  # 補償 0 索引陣列
```

### 何時加註釋

| 情況 | 需要註釋？ |
|------|----------|
| 複雜演算法 | 是 - 解釋邏輯 |
| 業務規則 | 是 - 連結到規格/工單 |
| 顯而易見的程式碼 | 否 |
| 變通方案/hack | 是 - 解釋為什麼需要 |

### 註釋語言偏好

> **💡 自定義區域**：根據你用什麼語言指揮 Agent，調整下面的設定。

```text
# ====================================================
# 📝 註釋語言設定
# ====================================================
# 
# 設定 Agent 在程式碼中使用什麼語言寫註釋。
# 這應該與你用來指揮 Agent 的語言一致。
#
# 選項：
#   - "zh-TW" = 繁體中文
#   - "zh-CN" = 简体中文  
#   - "en"    = English
#   - "ja"    = 日本語
#
# 👇 修改這裡：
COMMENT_LANGUAGE = "zh-TW"
# ====================================================
```

**Agent 執行規則：**

當 `COMMENT_LANGUAGE = "zh-TW"` 時：

```python
def calculate_discount(price: float, discount_percent: float) -> float:
    """
    計算折扣後的價格。
    
    參數：
        price: 原價（美元）
        discount_percent: 折扣百分比（0-100）
        
    回傳：
        折扣後價格
    """
    if not 0 <= discount_percent <= 100:
        raise ValueError("折扣必須在 0-100 之間")
    
    # 將百分比轉換為小數並計算
    return price * (1 - discount_percent / 100)
```

當 `COMMENT_LANGUAGE = "en"` 時：

```python
def calculate_discount(price: float, discount_percent: float) -> float:
    """
    Calculate discounted price.
    
    Args:
        price: Original price in dollars
        discount_percent: Discount as percentage (0-100)
        
    Returns:
        Discounted price
    """
    if not 0 <= discount_percent <= 100:
        raise ValueError("Discount must be between 0 and 100")
    
    # Convert percentage to decimal and calculate
    return price * (1 - discount_percent / 100)
```

---

## 常數與設定

### 不要使用魔術數字

```python
# 不好：魔術數字
if retry_count > 3:
    raise Exception("失敗")

time.sleep(5)

# 好：命名常數
MAX_RETRIES = 3
RETRY_DELAY_SECONDS = 5

if retry_count > MAX_RETRIES:
    raise RetryLimitExceeded()

time.sleep(RETRY_DELAY_SECONDS)
```

### 環境變數

```python
# config.py
import os
from dataclasses import dataclass

@dataclass
class Config:
    api_key: str
    debug: bool
    max_retries: int

def load_config() -> Config:
    return Config(
        api_key=os.getenv("API_KEY", ""),
        debug=os.getenv("DEBUG", "false").lower() == "true",
        max_retries=int(os.getenv("MAX_RETRIES", "3")),
    )
```

---

## 程式碼品質檢查清單

交付程式碼之前，驗證：

```
[ ] 所有函數有 docstring
[ ] 沒有魔術數字（使用常數）
[ ] I/O 操作有錯誤處理
[ ] 命名規範一致
[ ] 沒有寫死的密鑰
[ ] 檔案結構遵循標準
[ ] 每個函數單一職責
[ ] 每個函數最多 4 個參數
```
