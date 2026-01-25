# AGENT SKILLS

> Concrete, executable skills for the AI agent. Each skill includes triggers, steps, and examples.

---

## SKILL 1: Error Diagnosis

### When to Use

- Code throws an error
- Build/deploy fails
- Tests fail unexpectedly

### Execution Steps

```
1. READ the full error message
2. CLASSIFY the error:
   - Syntax Error → check recent changes, fix typos
   - Import Error → check dependencies, install missing
   - Runtime Error → trace the call stack, check data types
   - Environment Error → check PATH, versions, OS compatibility
   
3. ATTEMPT fix (max 2 retries)

4. REPORT results:
   - If fixed: "Fixed [error type]. Issue was [root cause]."
   - If unfixable: "Unable to fix. Diagnosis: [what I found]. Options: [A, B, C]."
```

### Example

```
User: "My Python script crashes"

Agent process:
1. Run script, capture error: "ModuleNotFoundError: No module named 'requests'"
2. Classify: Import Error / Dependency
3. Fix: pip install requests
4. Report: "Fixed. Added missing 'requests' package."
```

---

## SKILL 2: Project Initialization

### When to Use

- User asks to create new project
- User asks to set up a new feature/module

### Execution Steps

```
1. CONFIRM project type and requirements
2. CREATE directory structure (see CODE_STANDARDS.md)
3. INITIALIZE package manager (npm init / pip requirements.txt)
4. CREATE .env.example with required variables
5. CREATE README with setup instructions
6. VERIFY everything runs with a simple test
```

### Standard Structure

```
project/
├── src/                  # Source code
│   ├── __init__.py       # (Python) or index.js (Node)
│   └── main.py           # Entry point
├── tests/                # Test files
├── scripts/              # Utility scripts
├── .env.example          # Environment template
├── requirements.txt      # (Python) or package.json (Node)
└── README.md             # Setup instructions
```

---

## SKILL 3: Dependency Management

### When to Use

- Adding new functionality that needs external packages
- Resolving version conflicts
- Setting up a fresh environment

### Execution Steps

```
1. IDENTIFY required dependencies
2. CHECK for version compatibility
3. ADD to requirements file (not just install)
4. VERIFY installation succeeds
5. UPDATE .env.example if new API keys needed
```

### Version Pinning

```python
# requirements.txt - GOOD
requests==2.28.0
fastapi>=0.100.0,<0.200.0

# requirements.txt - BAD
requests
fastapi
```

### Reduce Repeated Downloads (Save Tokens)

> 💡 Reducing redundant installations saves time and potential error handling, indirectly lowering token consumption.

**Pre-installation Check Flow:**

```
1. Check if already installed: pip show <package> or pip list | grep <package>
2. If installed and version compatible → skip installation
3. If specific version needed → use venv isolation
```

**Global vs Virtual Environment Strategy:**

| Type | Recommendation | Examples |
|------|---------------|----------|
| Common utility packages | Install globally | requests, python-dotenv, rich, click |
| Project-specific frameworks | Use venv | django, fastapi, flask |
| Version conflict risks | Use venv | tensorflow, pytorch |
| AI/ML related | Use venv | langchain, openai |

**Common Global Packages (Recommended Pre-install):**

```bash
# Basic utilities
pip install requests python-dotenv rich click

# Development tools
pip install black isort pytest

# API development essentials
pip install httpx pydantic
```

---

## SKILL 4: Code Generation

### When to Use

- User asks to implement a feature
- User asks to create a new file/module

### Execution Steps

```
1. CONFIRM requirements (ask if unclear)
2. FOLLOW CODE_STANDARDS.md for naming/structure
3. INCLUDE error handling for I/O
4. ADD docstrings for functions
5. OUTPUT full file (no fragments)
6. VERIFY code runs
```

### Output Format

```python
# GOOD: Full file with context
"""
user_service.py
Handles user-related business logic.
"""

from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    id: str
    name: str
    email: str

def get_user(user_id: str) -> Optional[User]:
    """Fetch user by ID. Returns None if not found."""
    # Implementation here
    pass


# BAD: Fragment without context
def get_user(user_id):
    # ...
```

---

## SKILL 5: Environment Setup

### When to Use

- User is setting up project for first time
- User has PATH or environment issues
- User is switching between projects

### Diagnostic Checklist

```
1. Check runtime version:
   - python --version
   - node --version
   
2. Check package manager:
   - pip --version
   - npm --version
   
3. Check virtual environment (Python):
   - which python
   - Check if venv is activated
   
4. Check environment variables:
   - Verify .env file exists
   - Verify required keys are set
```

### Common Fixes

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| "command not found" | Not in PATH | Add to PATH or use full path |
| "module not found" | Wrong environment | Activate venv, reinstall |
| "permission denied" | File permissions | chmod +x or sudo |
| "port in use" | Another process | Kill process or change port |

---

## SKILL 6: Code Review (Self)

### When to Use

- Before delivering any code to user
- After making significant changes

### Checklist

```
[ ] Code runs without errors
[ ] All functions have docstrings
[ ] No magic numbers (use constants)
[ ] Error handling for external calls (API, file I/O)
[ ] No hardcoded secrets
[ ] Consistent naming (see CODE_STANDARDS.md)
[ ] Tests exist for critical paths
```

---

## SKILL 7: Explaining to Non-Technical Users

### When to Use

- User asks "what does this mean?"
- Explaining errors or technical concepts
- User seems confused

### Approach

```
1. Use analogies from everyday life
2. Avoid jargon; if unavoidable, define it
3. Focus on "what this means for you" not "how it works internally"
4. One concept at a time
```

### Example

```
# BAD explanation
"The API returned a 401 status code indicating authentication failure 
due to missing or invalid Bearer token in the Authorization header."

# GOOD explanation
"The server rejected your request because it doesn't recognize you.
It's like showing up to a private club without your membership card.
Fix: Make sure your API key is correct in the .env file."
```

---

## SKILL 8: Testing Strategy

### When Tests Are Needed

| Situation | Need Tests? | Reason |
|-----------|-------------|--------|
| MVP / rapid prototype | Minimal | Validate idea first, add tests later |
| Core business logic | Yes | Most error-prone and highest impact |
| External API integration | Yes | External services may change, catch early |
| Pure UI components | Optional | Visual changes are hard to test programmatically |
| Utility functions | Yes | Easy to test and high ROI |

### Testing Pyramid (Simplified)

For MVPs and small projects, focus on:

```
        /\
       /  \
      / E2E \        <- Optional: Critical user flows
     /--------\
    / Integration \   <- Important: API endpoints, database ops
   /----------------\
  /      Unit       \  <- Foundation: Utilities, business logic
 /--------------------\
```

### Minimum Testing Checklist

Before delivering code, ensure at least:

```
[ ] Critical paths work (manual test)
[ ] Core business logic has unit tests
[ ] API endpoints have basic integration tests
[ ] Error cases are handled (won't crash)
```

### Test Naming Convention

```python
# Format: test_<function>_<condition>_<expected_result>

def test_calculate_discount_with_valid_input_returns_correct_price():
    pass

def test_calculate_discount_with_negative_percent_raises_error():
    pass

def test_user_login_with_wrong_password_returns_401():
    pass
```

### Test File Structure

```
project/
├── src/
│   └── services/
│       └── user_service.py
└── tests/
    └── services/
        └── test_user_service.py    # Mirrors src structure
```

### Agent Test Execution Rules

```
1. After writing a feature, ask: "Would you like me to write tests?"
2. If user says "yes" → Write tests and run them
3. If tests fail → Fix the code, not the tests
4. Report results: "3 tests passed, 1 failed (reason: ...)"
```

### Example: Basic Tests

```python
# tests/test_discount.py
import pytest
from src.services.pricing import calculate_discount

class TestCalculateDiscount:
    def test_valid_discount(self):
        """Normal discount should calculate correctly."""
        result = calculate_discount(100, 20)
        assert result == 80

    def test_zero_discount(self):
        """0% discount should return original price."""
        result = calculate_discount(100, 0)
        assert result == 100

    def test_full_discount(self):
        """100% discount should return 0."""
        result = calculate_discount(100, 100)
        assert result == 0

    def test_negative_discount_raises_error(self):
        """Negative discount should raise error."""
        with pytest.raises(ValueError):
            calculate_discount(100, -10)

    def test_over_100_discount_raises_error(self):
        """Over 100% discount should raise error."""
        with pytest.raises(ValueError):
            calculate_discount(100, 150)
```

---

## META: SKILL PRIORITY

When multiple skills apply, prioritize:

1. **Diagnose first** - Understand before acting
2. **Fix environment** - Many "code bugs" are environment issues
3. **Minimal change** - Don't over-engineer
4. **Verify** - Always test before delivering
