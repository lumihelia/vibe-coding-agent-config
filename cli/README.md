# Vibe Coding Config CLI

> One command to set up AI agent configuration files

## Installation

```bash
# Install globally
npm install -g vibe-coding-config

# Or use npx (no install needed)
npx vibe-coding-config init
```

## Commands

### `vibe init`

Initialize `.agent/` folder with configuration files.

```bash
# Default: Traditional Chinese
vibe init

# Simplified Chinese
vibe init --lang zh-CN

# English version
vibe init --lang en

# Overwrite existing files
vibe init --force
```

**Result:**
```
.agent/
├── AGENT.md           # Core system instructions
├── SKILLS.md          # Agent skills and procedures
├── CODE_STANDARDS.md  # Naming, structure, comments
├── EXAMPLES.md        # Do's and don'ts examples
├── UI_STYLES.md       # Design system template
└── GIT_WORKFLOW.md    # Git rules and conventions
```

### `vibe check [path]`

Check your code against CODE_STANDARDS.md rules.

```bash
# Check current directory
vibe check

# Check specific path
vibe check src/

# Check a single file
vibe check src/api.js
```

**What it checks:**
- File naming conventions (snake_case, kebab-case, PascalCase)
- Hardcoded secrets (API keys, passwords)
- Magic numbers in conditions
- Missing HTTP timeouts (Python)
- console.log statements
- TODO comments
- Direct env access without fallback

### `vibe export`

Export configuration to different AI tool formats.

```bash
# Export to Cursor
vibe export --target cursor

# Export to GitHub Copilot
vibe export --target copilot

# Export to Claude Code
vibe export --target claude

# With English
vibe export --target cursor --lang en
```

**Supported targets:**
| Target | Output File | Tool |
|--------|-------------|------|
| `cursor` | `.cursorrules` | Cursor AI |
| `copilot` | `.github/copilot-instructions.md` | GitHub Copilot |
| `windsurf` | `.windsurfrules` | Windsurf |
| `claude` | `CLAUDE.md` | Claude Code |
| `gemini` | `GEMINI.md` | Gemini CLI |

## Quick Start

```bash
# 1. Go to your project
cd my-project

# 2. Initialize config files
npx vibe-coding-config init

# 3. Tell your AI agent
# "Please read .agent/ folder first before starting work."

# 4. (Optional) Check your code
npx vibe-coding-config check src/

# 5. (Optional) Export to your AI tool format
npx vibe-coding-config export --target cursor
```

## Options

| Command | Option | Description |
|---------|--------|-------------|
| `init` | `-l, --lang <lang>` | Language: `zh` (default), `zh-CN`, or `en` |
| `init` | `-f, --force` | Overwrite existing files |
| `check` | `-f, --fix` | Auto-fix simple issues (coming soon) |
| `export` | `-t, --target <tool>` | Target tool (see table above) |
| `export` | `-l, --lang <lang>` | Language: `zh` (default), `zh-CN`, or `en` |

## License

MIT
