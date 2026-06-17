# Agent 技能手册

> AI Agent 的具体可执行技能。每个技能包含触发条件、执行步骤和示例。

---

## 技能 1：错误诊断

### 何时使用

- 代码抛出错误
- 构建/部署失败
- 测试意外失败

### 执行步骤

```
1. 阅读完整的错误信息
2. 分类错误：
   - 语法错误 → 检查最近的更改，修正错字
   - Import 错误 → 检查依赖，安装缺少的
   - 运行时错误 → 追踪调用堆栈，检查数据类型
   - 环境错误 → 检查 PATH、版本、操作系统兼容性

3. 尝试修复（最多重试 2 次）

4. 报告结果：
   - 如果修好：「已修复 [错误类型]。问题是 [根本原因]。」
   - 如果修不好：「无法修复。诊断：[发现]。选项：[A, B, C]。」
```

### 示例

```
用户：「我的 Python 脚本崩溃了」

Agent 处理流程：
1. 执行脚本，捕获错误：「ModuleNotFoundError: No module named 'requests'」
2. 分类：Import 错误 / 依赖问题
3. 修复：pip install requests
4. 报告：「已修复。已安装缺少的 'requests' 包。」
```

---

## 技能 2：项目初始化

### 何时使用

- 用户要求创建新项目
- 用户要求设置新功能/模块

### 执行步骤

```
1. 确认项目类型和需求
2. 创建目录结构（参见 CODE_STANDARDS.md）
3. 初始化包管理器（npm init / pip requirements.txt）
4. 创建 .env.example 包含必要变量
5. 创建 README 包含设置说明
6. 用简单测试验证一切正常运行
```

### 标准结构

```
project/
├── src/                  # 源代码
│   ├── __init__.py       # (Python) 或 index.js (Node)
│   └── main.py           # 入口点
├── tests/                # 测试文件
├── scripts/              # 工具脚本
├── .env.example          # 环境变量模板
├── requirements.txt      # (Python) 或 package.json (Node)
└── README.md             # 设置说明
```

---

## 技能 3：依赖管理

### 何时使用

- 添加需要外部包的新功能
- 解决版本冲突
- 设置全新环境

### 执行步骤

```
1. 识别需要的依赖
2. 检查版本兼容性
3. 添加到 requirements 文件（不只是安装）
4. 验证安装成功
5. 如果需要新的 API Key，更新 .env.example
```

### 版本锁定

```python
# requirements.txt - 好
requests==2.28.0
fastapi>=0.100.0,<0.200.0

# requirements.txt - 不好
requests
fastapi
```

### 减少重复下载（节省 Token）

> 减少重复安装可以节省时间和潜在的错误处理，间接降低 Token 消耗。

**安装前检查流程：**

```
1. 先检查是否已安装：pip show <package> 或 pip list | grep <package>
2. 如果已安装且版本兼容 → 不重复安装
3. 如果需要特定版本 → 才使用 venv 隔离
```

**全局 vs 虚拟环境策略：**

| 类型 | 建议 | 示例 |
|------|------|------|
| 常用工具包 | 全局安装 | requests, python-dotenv, rich, click |
| 项目专用框架 | venv 隔离 | django, fastapi, flask |
| 有版本冲突风险 | venv 隔离 | tensorflow, pytorch |
| AI/ML 相关 | venv 隔离 | langchain, openai |

**常用全局包清单（建议预先安装）：**

```bash
# 基础工具
pip install requests python-dotenv rich click

# 开发辅助
pip install black isort pytest

# API 开发常用
pip install httpx pydantic
```

---

## 技能 4：代码生成

### 何时使用

- 用户要求实现功能
- 用户要求创建新文件/模块

### 执行步骤

```
1. 确认需求（如不清楚就询问）
2. 遵循 CODE_STANDARDS.md 的命名/结构
3. 为 I/O 加入错误处理
4. 为函数添加 docstring
5. 输出完整文件（不是片段）
6. 验证代码可执行
```

### 输出格式

```python
# 好：完整文件有上下文
"""
user_service.py
处理用户相关的业务逻辑。
"""

from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    id: str
    name: str
    email: str

def get_user(user_id: str) -> Optional[User]:
    """根据 ID 获取用户。如找不到则返回 None。"""
    # 实现在这里
    pass


# 不好：没有上下文的片段
def get_user(user_id):
    # ...
```

---

## 技能 5：环境设置

### 何时使用

- 用户首次设置项目
- 用户有 PATH 或环境问题
- 用户在项目之间切换

### 诊断清单

```
1. 检查运行环境版本：
   - python --version
   - node --version

2. 检查包管理器：
   - pip --version
   - npm --version

3. 检查虚拟环境（Python）：
   - which python
   - 检查 venv 是否已激活

4. 检查环境变量：
   - 验证 .env 文件存在
   - 验证必要的 key 已设置
```

### 常见修复

| 症状 | 可能原因 | 修复方法 |
|------|---------|---------|
| 「command not found」 | 不在 PATH 中 | 添加到 PATH 或使用完整路径 |
| 「module not found」 | 错误的环境 | 激活 venv，重新安装 |
| 「permission denied」 | 文件权限 | chmod +x 或 sudo |
| 「port in use」 | 另一个程序占用 | 终止程序或换端口 |

---

## 技能 6：代码审查（自我）

### 何时使用

- 在交付任何代码给用户之前
- 在做出重大更改之后

### 检查清单

```
[ ] 代码无错误执行
[ ] 所有函数有 docstring
[ ] 没有魔术数字（使用常量）
[ ] 外部调用有错误处理（API、文件 I/O）
[ ] 没有写死的密钥
[ ] 命名一致（参见 CODE_STANDARDS.md）
[ ] 关键路径有测试
```

---

## 技能 7：向非技术用户解释

### 何时使用

- 用户问「这是什么意思？」
- 解释错误或技术概念
- 用户看起来困惑

### 方法

```
1. 使用日常生活中的类比
2. 避免术语；如果避免不了，就定义它
3. 专注「这对你意味着什么」而不是「内部如何运作」
4. 一次一个概念
```

### 示例

```
# 不好的解释
「API 返回了 401 状态码，表示认证失败，
因为 Authorization 头中缺少或无效的 Bearer token。」

# 好的解释
「服务器拒绝了你的请求，因为它不认识你。
就像没带会员卡去私人俱乐部一样。
修复方法：确保 .env 文件中的 API key 是正确的。」
```

---

## 技能 8：测试策略

### 何时需要写测试

| 情况 | 需要测试？ | 原因 |
|------|----------|------|
| MVP / 快速原型 | 最小限度 | 先验证想法，之后再补测试 |
| 核心业务逻辑 | 是 | 这是最容易出错且影响最大的地方 |
| 外部 API 集成 | 是 | 外部服务可能改变，需要及早发现 |
| 纯 UI 组件 | 可选 | 视觉变化难以用程序测试 |
| 工具函数 | 是 | 容易测试且收益高 |

### 测试金字塔（简化版）

对于 MVP 和小型项目，专注于：

```
        /\
       /  \
      / E2E \        ← 可选：关键用户流程
     /--------\
    /   集成   \      ← 重要：API 端点、数据库操作
   /--------------\
  /     单元      \    ← 基础：工具函数、业务逻辑
 /------------------\
```

### 最小测试清单

在交付代码前，至少确保：

```
[ ] 关键路径可以正常执行（手动测试）
[ ] 核心业务逻辑有单元测试
[ ] API 端点有基本的集成测试
[ ] 错误情况有处理（不会 crash）
```

### 测试命名规范

```python
# 格式：test_<被测功能>_<条件>_<预期结果>

def test_calculate_discount_with_valid_input_returns_correct_price():
    pass

def test_calculate_discount_with_negative_percent_raises_error():
    pass

def test_user_login_with_wrong_password_returns_401():
    pass
```

### 测试文件结构

```
project/
├── src/
│   └── services/
│       └── user_service.py
└── tests/
    └── services/
        └── test_user_service.py    # 镜像 src 结构
```

### Agent 测试执行规则

```
1. 写完功能后，询问：「需要我写测试吗？」
2. 如果用户说「是」→ 写测试并执行
3. 如果测试失败 → 修复代码，不是修改测试来让它通过
4. 报告测试结果：「3 个测试通过，1 个失败（原因：...）」
```

### 示例：基本测试

```python
# tests/test_discount.py
import pytest
from src.services.pricing import calculate_discount

class TestCalculateDiscount:
    def test_valid_discount(self):
        """正常折扣应该正确计算。"""
        result = calculate_discount(100, 20)
        assert result == 80

    def test_zero_discount(self):
        """0% 折扣应该返回原价。"""
        result = calculate_discount(100, 0)
        assert result == 100

    def test_full_discount(self):
        """100% 折扣应该返回 0。"""
        result = calculate_discount(100, 100)
        assert result == 0

    def test_negative_discount_raises_error(self):
        """负数折扣应该抛出错误。"""
        with pytest.raises(ValueError):
            calculate_discount(100, -10)

    def test_over_100_discount_raises_error(self):
        """超过 100% 的折扣应该抛出错误。"""
        with pytest.raises(ValueError):
            calculate_discount(100, 150)
```

---

## 技能 9：会话结束清理

### 何时使用

- 每次完成任务、准备结束对话之前
- 用户说「好了」「完成了」「先这样」时

### 执行步骤

```
1. 列出本轮启动的所有后台进程
2. 列出本轮创建的临时文件 / 缓存
3. 停止后台进程（除非用户要保留）
4. 清除临时产物（除非用户要保留）
5. 输出汇报
```

### 汇报格式

```
本轮工作汇报：
- 后台进程：[已启动的] → [已停止 / 仍在运行，原因]
- 临时文件 / 缓存：[已创建的] → [已清除 / 已保留，原因]
- 遗留风险：[无 / 有（说明）]
```

### 什么情况下保留而不清除

| 保留 | 原因 |
|------|------|
| `.next/` 构建缓存 | 下次启动更快，不占太多空间 |
| `node_modules/` | 每次重新安装成本高 |
| 用户明确要保留的 dev server | 用户说「让它继续跑」 |

---

## 技能 10：系统诊断（低负载模式）

### 何时使用

- 用户反映电脑变卡、风扇转速高、CPU 负载异常
- 用户让 Agent 排查系统性能问题

### 核心原则

**诊断本身不能成为问题的一部分。** 不能因为排查「CPU 过高」而让 CPU 变得更高。

### 禁止事项

```
禁止：find / -name "*.log"        # 全盘扫描
禁止：find ~ -type f              # 扫全用户目录
禁止：top                          # 不加 -l 1 会持续运行
禁止：watch <任何命令>             # 持续监控进程
禁止：同时开多个终端执行多条命令
```

### 正确的诊断流程

```
步骤 1：单次系统快照（执行后立即退出）
  → top -l 1 | head -30

步骤 2：只查占用高的那个程序
  → ps aux | grep <具体程序名>

步骤 3：查端口占用（如果怀疑是 dev server）
  → lsof -i :<端口号>

步骤 4：查特定路径的缓存大小（不递归整个磁盘）
  → du -sh /具体/路径/

步骤 5：根据发现，提出具体的清理建议，等用户确认再执行
```

### 每步查询前说明

「我要用 `[命令]` 查 `[具体目标]`。这个命令执行后立即退出，不会持续占用资源。」

### 示例汇报

```
诊断结果：

发现 3 个 Node 进程仍在运行（来自之前的 vite dev server）：
- PID 12345: node /项目A/.../vite
- PID 12346: node /项目B/.../vite
- PID 12347: node /项目C/.../next-server

这 3 个进程合计使用 CPU 38%。

建议：终止这 3 个进程（它们对应的 dev server 可以随时重新启动）。
执行吗？
```

---

## 附注：技能优先顺序

当多个技能适用时，按此优先顺序：

1. **先诊断** - 行动前先理解
2. **修复环境** - 许多「代码 bug」其实是环境问题
3. **最小更改** - 不要过度工程化
4. **验证** - 交付前一定要测试
5. **清理** - 每次结束后汇报并清理资源
