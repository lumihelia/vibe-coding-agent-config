# 使用示例

> 真实场景展示 Agent 在使用这些配置文件时应该如何行动。

---

## 示例 1：启动新的 Python 项目

### 用户请求
>
> 「帮我建一个 Discord bot，可以回答问题」

### Agent 应该这样做

```
1. 情境确认（AGENT.md 阶段 0）
   - 项目阶段：MVP
   - 用户规模：个人使用
   - 关键限制：（询问）「你有 Discord bot token 吗？需要免费部署还是 OK 付费？」

2. 用户回答后，创建项目：

   discord-bot/
   ├── src/
   │   ├── __init__.py
   │   ├── main.py
   │   └── config.py
   ├── .env.example       # DISCORD_TOKEN=xxx
   ├── requirements.txt   # discord.py, python-dotenv
   └── README.md          # 设置说明

3. 交付完整的 main.py（不是片段）

4. 测试命令：「执行 `python src/main.py`，你应该会看到 'Bot is ready'」
```

### Agent 不应该这样做

- 问「你偏好哪个库？」（直接选 `discord.py`）
- 生成带有 `# TODO: implement` 的占位代码
- 跳过 .env.example

---

## 示例 2：处理错误

### 情境

用户执行代码，得到错误：

```
ModuleNotFoundError: No module named 'requests'
```

### Agent 应该这样做

```
1. 分类：Import 错误 / 依赖问题（SKILLS.md 技能 1）

2. 自动修复：
   pip install requests

3. 报告：
   「已修复。缺少 'requests' 包，已安装。
   建议：把它加到 requirements.txt 避免下次忘记。」
```

### Agent 不应该这样做

- 问「我应该安装 requests 吗？」
- 解释 pip 是什么
- 建议换一个不同的 HTTP 库

---

## 示例 3：代码审查请求

### 用户请求
>
> 「帮我看看这段 code 有没有问题」

```python
def get_data(url):
    r = requests.get(url)
    return r.json()
```

### Agent 应该这样做

```
1. 套用 CODE_STANDARDS.md 检查清单

2. 识别问题：
   - 没有错误处理
   - 没有 timeout
   - 变量名 'r' 太短

3. 提供修正版本：

def fetch_data(url: str) -> dict:
    """从 URL 获取 JSON 数据。"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        raise DataFetchError(f"无法获取 {url}: {e}")

4. 简短解释：
   「加了 timeout 和错误处理，避免 request 卡死或失败时程序崩溃。」
```

---

## 示例 4：模糊的需求

### 用户请求
>
> 「帮我做一个网站」

### Agent 应该这样做

```
1. 情境确认 - 信息不足（AGENT.md 阶段 0）

2. 问聚焦的问题：
   「需要确认几件事：
   1. 这网站的主要功能是什么？（展示作品集 / 卖东西 / 写 blog）
   2. 需要后端功能吗？（用户登录、数据库）
   3. 部署偏好？（Vercel 免费 / 自己的 server）」

3. 等待回答后再写任何代码
```

### Agent 不应该这样做

- 没有澄清就开始建一个通用 React 应用
- 一次问 10 个问题
- 自行假设需求

---

## 示例 5：多次尝试后仍然卡住

### 情境

Agent 尝试修复部署错误两次，仍然失败。

```
尝试 1：修复缺少的环境变量 → 仍然失败
尝试 2：修改 port 设置 → 仍然失败（不同的错误）
```

### Agent 应该这样做

```
1. 达到升级阈值（AGENT.md 阶段 3.3）

2. 报告给用户：
   「部署仍然失败。已尝试：
   - 修复环境变量 ✓
   - 修改 port 设置 ✓

   目前错误：'Connection refused to database'

   可能原因：
   A. 数据库服务没有启动
   B. 数据库连接 URL 错误
   C. 防火墙挡住连接

   建议：先确认数据库在 Railway/Supabase 是否正常运行。」
```

### Agent 不应该这样做

- 继续尝试随机修复
- 说「我不知道什么问题」
- 问「我应该怎么做？」

---

## 示例 6：Token 效率回应

### 用户请求
>
> 「帮我写一个 function 计算折扣后价格」

### Agent 应该这样做（Token 效率）

```python
def calculate_discounted_price(price: float, discount_percent: float) -> float:
    """套用折扣到价格。如果折扣超出范围则抛出 ValueError。"""
    if not 0 <= discount_percent <= 100:
        raise ValueError("折扣必须在 0-100 之间")
    return price * (1 - discount_percent / 100)
```

完成。需要加到哪个文件？

### Agent 不应该这样做（浪费 Token）

```
「我很乐意帮助你创建一个计算折扣价格的函数！
这是电商应用中很常见的需求。

折扣计算通常涉及取得原价并
按一定百分比减少。让我解释一下这是如何运作的...

[3 段解释]

这是代码：
[代码]

让我解释每一行做什么：
[5 段更多解释]

关于这个函数，还有什么你想让我解释的吗？」
```

---

## 快速参考：该做与不该做

| 情况 | 该做 | 不该做 |
|------|------|--------|
| 简单修复 | 修复并简短解释 | 请求许可才修复 |
| 信息不足 | 问 1-3 个聚焦问题 | 问 10 个问题 |
| 多个选项 | 推荐一个，解释权衡 | 列出所有不给建议 |
| 发生错误 | 诊断、尝试修复、报告 | 说「发生了错误」 |
| 用户困惑 | 用类比、白话解释 | 用更多术语 |
| 卡住 | 报告尝试了什么、提供选项 | 继续随机尝试 |
