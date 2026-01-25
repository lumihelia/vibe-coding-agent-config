# GIT WORKFLOW

> Basic rules for version control. Agent must follow these guidelines when performing Git operations.

---

## Why Git?

Git is like "save points" in a video game:

- **Revert changes** - If you mess up, you can go back to a previous version
- **Branching** - Try new features without affecting working code
- **Collaboration** - Multiple people can work without overwriting each other

---

## Commit Rules

### When to Commit

| Should Commit | Should NOT Commit |
|---------------|-------------------|
| Completed a small feature | Code doesn't run yet |
| Fixed a bug | Changes are incomplete |
| Refactoring done and tests pass | "Commit now, fix later" |
| After adding/deleting files | Files containing API keys or passwords |

### Commit Message Format

```
<type>: <short description>

[optional: detailed explanation]
```

**Type Options:**

| Type | Purpose | Example |
|------|---------|---------|
| `feat` | New feature | `feat: add user login` |
| `fix` | Bug fix | `fix: correct cart calculation` |
| `refactor` | Refactoring (no behavior change) | `refactor: simplify validation logic` |
| `docs` | Documentation | `docs: update README install guide` |
| `style` | Formatting (no logic change) | `style: fix indentation` |
| `test` | Testing | `test: add login tests` |
| `chore` | Misc (dependencies, config) | `chore: update dependencies` |

**Examples:**

```bash
# Good commit messages
git commit -m "feat: add password reset feature"
git commit -m "fix: mobile menu won't close"
git commit -m "refactor: extract API calls to service layer"

# Bad commit messages
git commit -m "update"
git commit -m "fix bug"
git commit -m "changed some stuff"
```

---

## Branch Strategy (Simplified)

For personal projects or small teams, use a simple two-branch model:

```
main ─────────────────────────────────────
       \                    /
        \──── feature ─────/
```

### Branch Naming

```
feature/feature-name    # New features
fix/issue-description   # Bug fixes
experiment/name         # Experimental attempts
```

**Examples:**

```bash
git checkout -b feature/user-login
git checkout -b fix/cart-calculation
git checkout -b experiment/new-ui
```

### Workflow

```bash
# 1. Create new branch from main
git checkout main
git pull
git checkout -b feature/my-feature

# 2. Develop and commit
git add .
git commit -m "feat: implement feature"

# 3. Merge back to main when done
git checkout main
git merge feature/my-feature

# 4. Delete the finished branch
git branch -d feature/my-feature
```

---

## Files That Should NEVER Be Committed

These files must be in `.gitignore`:

```gitignore
# Environment variables (contain secrets)
.env
.env.local
.env.*.local

# Dependency directories
node_modules/
venv/
__pycache__/

# Editor settings
.vscode/
.idea/

# System files
.DS_Store
Thumbs.db

# Build artifacts
dist/
build/
*.pyc
```

---

## Agent Git Operation Rules

### Can Execute Automatically

- `git status` - Check status
- `git diff` - View changes
- `git add` - Stage files
- `git commit` - Commit (with proper message format)
- `git log` - View history
- `git branch` - List/create branches

### Must Ask User First

- `git push` - Push to remote
- `git merge` - Merge branches
- `git reset --hard` - Hard reset (loses changes)
- `git rebase` - Rebase operations
- Any operation involving `--force`

### When Problems Are Detected

If Agent detects:

```
1. .env file staged → Warn user and unstage
2. Large binary files → Suggest adding to .gitignore
3. Sensitive info in code → Stop and warn
```

---

## Common Scenarios

### Scenario 1: Started editing without creating a branch

```bash
# If you haven't committed yet
git stash                          # Stash changes
git checkout -b feature/new        # Create new branch
git stash pop                      # Restore changes
```

### Scenario 2: Committed but message was wrong

```bash
# Can only amend the last commit
git commit --amend -m "correct message"
```

### Scenario 3: Want to undo last commit (keep changes)

```bash
git reset --soft HEAD~1
```

### Scenario 4: Want to completely discard all changes

```bash
# WARNING: This will lose all uncommitted changes!
git checkout .
git clean -fd
```

---

## Quick Reference

```bash
# Basic operations
git status                    # Check status
git add .                     # Stage all changes
git commit -m "message"       # Commit
git log --oneline -5          # View last 5 commits

# Branch operations
git branch                    # List branches
git checkout -b branch-name   # Create and switch
git checkout main             # Switch to main
git merge branch-name         # Merge branch

# Undo operations
git checkout -- filename      # Discard single file changes
git reset --soft HEAD~1       # Undo last commit (keep changes)
```
