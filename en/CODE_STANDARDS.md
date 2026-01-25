# CODE STANDARDS

> Coding conventions for consistent, maintainable code. Agent must follow these when generating code.

---

## NAMING CONVENTIONS

### General Rules

| Type | Convention | Example |
|------|------------|---------|
| Variables | snake_case | `user_name`, `total_count` |
| Functions | snake_case | `get_user()`, `calculate_total()` |
| Classes | PascalCase | `UserService`, `DataProcessor` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES`, `API_BASE_URL` |
| Files (Python) | snake_case | `user_service.py` |
| Files (JS/TS) | camelCase or kebab-case | `userService.js`, `user-service.ts` |

### Naming Quality

```python
# BAD: Vague names
def process(d):
    x = d['a'] + d['b']
    return x

# GOOD: Descriptive names
def calculate_total_price(order_data):
    subtotal = order_data['item_price'] + order_data['tax']
    return subtotal
```

---

## FILE STRUCTURE

### Python Projects

```
project/
├── src/
│   ├── __init__.py
│   ├── main.py              # Entry point
│   ├── config.py            # Environment & settings
│   ├── models/              # Data models (Pydantic, dataclass)
│   │   ├── __init__.py
│   │   └── user.py
│   └── services/            # Business logic
│       ├── __init__.py
│       └── user_service.py
├── tests/
│   ├── __init__.py
│   └── test_user_service.py
├── scripts/
│   └── setup.py             # One-click setup
├── .env.example
├── requirements.txt
└── README.md
```

### JavaScript/TypeScript Projects

```
project/
├── src/
│   ├── index.js             # Entry point
│   ├── config.js            # Environment & settings
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

## FUNCTION DESIGN

### Single Responsibility

Each function should do ONE thing.

```python
# BAD: Does too much
def process_and_save_user(user_data):
    validated = validate(user_data)
    enriched = add_defaults(validated)
    db.save(enriched)
    send_email(enriched)
    log_action(enriched)
    return enriched

# GOOD: Single responsibility
def validate_user(user_data):
    # validation only
    pass

def save_user(user):
    # saving only
    pass
```

### Function Length

- Target: Under 20 lines
- Max: 50 lines (consider splitting if longer)

### Parameters

- Max 4 parameters
- If more needed, use a config object/dataclass

```python
# BAD: Too many parameters
def create_user(name, email, age, city, country, phone, role, status):
    pass

# GOOD: Use a dataclass
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

## ERROR HANDLING

### Always Handle External Calls

```python
# BAD: No error handling
def fetch_data(url):
    response = requests.get(url)
    return response.json()

# GOOD: With error handling
def fetch_data(url):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.Timeout:
        raise DataFetchError(f"Request to {url} timed out")
    except requests.HTTPError as e:
        raise DataFetchError(f"HTTP error: {e.response.status_code}")
```

### Custom Exceptions

```python
# Define project-specific exceptions
class ProjectError(Exception):
    """Base exception for this project."""
    pass

class DataFetchError(ProjectError):
    """Failed to fetch external data."""
    pass

class ValidationError(ProjectError):
    """Input validation failed."""
    pass
```

---

## COMMENTS & DOCUMENTATION

### Docstrings (Required for Functions)

```python
def calculate_discount(price: float, discount_percent: float) -> float:
    """
    Apply discount to price.
    
    Args:
        price: Original price in dollars
        discount_percent: Discount as percentage (0-100)
        
    Returns:
        Discounted price
        
    Raises:
        ValueError: If discount_percent is negative or > 100
    """
    if not 0 <= discount_percent <= 100:
        raise ValueError("Discount must be between 0 and 100")
    return price * (1 - discount_percent / 100)
```

### Inline Comments

```python
# BAD: Explains what (obvious)
x = x + 1  # add 1 to x

# GOOD: Explains why (not obvious)
x = x + 1  # compensate for 0-indexed array
```

### When to Comment

| Situation | Comment? |
|-----------|----------|
| Complex algorithm | Yes - explain the logic |
| Business rule | Yes - link to spec/ticket |
| Obvious code | No |
| Workaround/hack | Yes - explain why needed |

### Comment Language Preference

> **💡 Customization Area**: Adjust the setting below based on what language you use to instruct the Agent.

```text
# ====================================================
# COMMENT LANGUAGE SETTING
# ====================================================
# 
# Set what language Agent should use for code comments.
# This should match the language you use to instruct the Agent.
#
# Options:
#   - "zh-TW" = Traditional Chinese
#   - "zh-CN" = Simplified Chinese  
#   - "en"    = English
#   - "ja"    = Japanese
#
# Modify here:
COMMENT_LANGUAGE = "en"
# ====================================================
```

**Agent Execution Rules:**

When `COMMENT_LANGUAGE = "en"`:

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

When `COMMENT_LANGUAGE = "zh-TW"`:

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

---

## CONSTANTS & CONFIGURATION

### No Magic Numbers

```python
# BAD: Magic numbers
if retry_count > 3:
    raise Exception("Failed")

time.sleep(5)

# GOOD: Named constants
MAX_RETRIES = 3
RETRY_DELAY_SECONDS = 5

if retry_count > MAX_RETRIES:
    raise RetryLimitExceeded()

time.sleep(RETRY_DELAY_SECONDS)
```

### Environment Variables

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

## CODE QUALITY CHECKLIST

Before delivering code, verify:

```
[ ] All functions have docstrings
[ ] No magic numbers (use constants)
[ ] Error handling for I/O operations
[ ] Consistent naming conventions
[ ] No hardcoded secrets
[ ] File structure follows standard
[ ] Single responsibility per function
[ ] Max 4 parameters per function
```
