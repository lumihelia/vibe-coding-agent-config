# 代码规范

> 统一、可维护的代码规范。Agent 在生成代码时必须遵循这些规范。

---

## 命名规范

### 通用规则

| 类型 | 规范 | 示例 |
|------|------|------|
| 变量 | snake_case | `user_name`, `total_count` |
| 函数 | snake_case | `get_user()`, `calculate_total()` |
| 类 | PascalCase | `UserService`, `DataProcessor` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| 文件（Python） | snake_case | `user_service.py` |
| 文件（JS/TS 一般） | kebab-case | `user-service.js`, `api-client.ts` |
| 文件（React 组件） | PascalCase | `UserProfile.tsx`, `LoginForm.jsx` |

### 命名质量

```python
# 不好：模糊的名称
def process(d):
    x = d['a'] + d['b']
    return x

# 好：描述性的名称
def calculate_total_price(order_data):
    subtotal = order_data['item_price'] + order_data['tax']
    return subtotal
```

---

## 文件结构

### Python 项目

```
project/
├── src/
│   ├── __init__.py
│   ├── main.py              # 入口点
│   ├── config.py            # 环境和配置
│   ├── models/              # 数据模型（Pydantic、dataclass）
│   │   ├── __init__.py
│   │   └── user.py
│   └── services/            # 业务逻辑
│       ├── __init__.py
│       └── user_service.py
├── tests/
│   ├── __init__.py
│   └── test_user_service.py
├── scripts/
│   └── setup.py             # 一键设置
├── .env.example
├── requirements.txt
└── README.md
```

### JavaScript/TypeScript 项目

```
project/
├── src/
│   ├── index.js             # 入口点
│   ├── config.js            # 环境和配置
│   ├── models/
│   │   └── user.js
│   └── services/
│       └── user-service.js
├── tests/
│   └── user-service.test.js
├── .env.example
├── package.json
└── README.md
```

---

## 函数设计

### 单一职责

每个函数应该只做一件事。

```python
# 不好：做太多事
def process_and_save_user(user_data):
    validated = validate(user_data)
    enriched = add_defaults(validated)
    db.save(enriched)
    send_email(enriched)
    log_action(enriched)
    return enriched

# 好：单一职责
def validate_user(user_data):
    # 只做验证
    pass

def save_user(user):
    # 只做存储
    pass
```

### 函数长度

- 目标：20 行以内
- 最大：50 行（超过就考虑拆分）

### 参数

- 最多 4 个参数
- 如果需要更多，使用配置对象/dataclass

```python
# 不好：太多参数
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

## 错误处理

### 始终处理外部调用

```python
# 不好：没有错误处理
def fetch_data(url):
    response = requests.get(url)
    return response.json()

# 好：有错误处理
def fetch_data(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.Timeout:
        raise DataFetchError(f"请求 {url} 超时")
    except requests.HTTPError as e:
        raise DataFetchError(f"HTTP 错误：{e.response.status_code}")
```

### 自定义异常

```python
# 定义项目专用的异常
class ProjectError(Exception):
    """此项目的基础异常。"""
    pass

class DataFetchError(ProjectError):
    """无法获取外部数据。"""
    pass

class ValidationError(ProjectError):
    """输入验证失败。"""
    pass
```

---

## 注释与文档

### Docstring（函数必须有）

```python
def calculate_discount(price: float, discount_percent: float) -> float:
    """
    计算折扣后的价格。

    参数：
        price: 原价（美元）
        discount_percent: 折扣百分比（0-100）

    返回：
        折扣后价格

    异常：
        ValueError: 如果 discount_percent 为负数或 > 100
    """
    if not 0 <= discount_percent <= 100:
        raise ValueError("折扣必须在 0 到 100 之间")
    return price * (1 - discount_percent / 100)
```

### 行内注释

```python
# 不好：说明做什么（显而易见）
x = x + 1  # 将 x 加 1

# 好：说明为什么（不明显）
x = x + 1  # 补偿 0 索引数组
```

### 何时加注释

| 情况 | 需要注释？ |
|------|----------|
| 复杂算法 | 是 - 解释逻辑 |
| 业务规则 | 是 - 链接到规格/工单 |
| 显而易见的代码 | 否 |
| 变通方案/hack | 是 - 解释为什么需要 |

### 注释语言偏好

> **自定义区域**：根据你用什么语言指挥 Agent，调整下面的设置。

```text
# ====================================================
# 注释语言设置
# ====================================================
#
# 设置 Agent 在代码中使用什么语言写注释。
# 这应该与你用来指挥 Agent 的语言一致。
#
# 选项：
#   - "zh-TW" = 繁体中文
#   - "zh-CN" = 简体中文
#   - "en"    = English
#   - "ja"    = 日本语
#
# 修改这里：
COMMENT_LANGUAGE = "zh-CN"
# ====================================================
```

**Agent 执行规则：**

当 `COMMENT_LANGUAGE = "zh-CN"` 时：

```python
def calculate_discount(price: float, discount_percent: float) -> float:
    """
    计算折扣后的价格。

    参数：
        price: 原价（美元）
        discount_percent: 折扣百分比（0-100）

    返回：
        折扣后价格
    """
    if not 0 <= discount_percent <= 100:
        raise ValueError("折扣必须在 0-100 之间")

    # 将百分比转换为小数并计算
    return price * (1 - discount_percent / 100)
```

当 `COMMENT_LANGUAGE = "en"` 时：

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

## 常量与配置

### 不要使用魔术数字

```python
# 不好：魔术数字
if retry_count > 3:
    raise Exception("失败")

time.sleep(5)

# 好：命名常量
MAX_RETRIES = 3
RETRY_DELAY_SECONDS = 5

if retry_count > MAX_RETRIES:
    raise RetryLimitExceeded()

time.sleep(RETRY_DELAY_SECONDS)
```

### 环境变量

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

## 代码质量检查清单

交付代码之前，验证：

```
[ ] 所有函数有 docstring
[ ] 没有魔术数字（使用常量）
[ ] I/O 操作有错误处理
[ ] 命名规范一致
[ ] 没有写死的密钥
[ ] 文件结构遵循标准
[ ] 每个函数单一职责
[ ] 每个函数最多 4 个参数
```
