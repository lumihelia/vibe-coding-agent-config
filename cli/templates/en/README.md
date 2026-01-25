# Vibe Coding Configuration Guide

> Make your AI Agent smarter at writing code

---

## 30-Second Overview

These files are "work instructions" for AI Agents (Claude, Gemini, etc.). They tell the Agent:

- What role you should play
- How you should write code
- How to handle problems when they arise

**Result**: Higher quality code output, less maintenance work for you.

---

## Quick Start (5 Minutes)

### Step 1: Copy files to your project

```bash
# Create .agent folder in your project root
mkdir -p .agent

# Copy these files to .agent folder
cp AGENT.md SKILLS.md CODE_STANDARDS.md UI_STYLES.md .agent/
```

### Step 2: Tell the Agent to read these files

At the start of your conversation with the Agent, include this:

```
Please read the configuration files in .agent/ folder first, then start working.
```

### Step 3: Start using

Just chat with the Agent normally. It will automatically follow your rules.

---

## File Structure

| File | Audience | Purpose |
|------|----------|---------|
| **README.md** | Humans | Explains how to use these files (you're reading this) |
| **AGENT.md** | AI Agent | Core system instructions: role, execution rules, token efficiency |
| **SKILLS.md** | AI Agent | Specific skills: error handling, code generation templates |
| **CODE_STANDARDS.md** | AI Agent | Coding standards: naming, structure, comments |
| **EXAMPLES.md** | Humans + AI | Usage examples: how Agent should behave in typical scenarios |
| **UI_STYLES.md** | AI Agent | Design system: colors, fonts, component styles (customizable) |
| **GIT_WORKFLOW.md** | AI Agent | Git rules: commit format, branch strategy, operation rules |

---

## What You'll Get

| Goal | Corresponding File | Effect |
|------|-------------------|--------|
| More maintainable code | CODE_STANDARDS.md | Agent follows consistent naming, structure, comment standards |
| Auto error fixing | AGENT.md + SKILLS.md | Auto-diagnose and fix errors without you pointing them out |
| Save tokens | AGENT.md | Concise output, no wasted explanations |
| Self-sufficient problem solving | AGENT.md | Only asks you when truly necessary |

---

## FAQ

### Q: Which AI Agents do these files work with?

Works with any Agent that supports system instructions:

| Product | Company | Instruction File Format |
|---------|---------|------------------------|
| Claude Code | Anthropic | CLAUDE.md |
| Cursor | Anysphere | .cursorrules |
| Windsurf | Codeium | Custom rules |
| Gemini CLI / Antigravity | Google | GEMINI.md |
| Jules | Google | Custom rules |
| GitHub Copilot | GitHub/Microsoft | .github/copilot-instructions.md |

> 💡 This kit provides universal instructions that work across all platforms. Just copy the content to the appropriate file format for your tool.

### Q: Can I modify these files?

Absolutely! These are just starting points. Adjust the rules to fit your needs.

### Q: What if the Agent doesn't follow the rules?

1. Make sure you remind the Agent to read the files at the start
2. For important rules, reinforce them in conversation
3. Consider shortening the files, keeping only the most critical rules

---

## Next Steps

1. Read [AGENT.md](./AGENT.md) to understand core rules
2. Read [EXAMPLES.md](./EXAMPLES.md) to see real usage scenarios
3. Customize [CODE_STANDARDS.md](./CODE_STANDARDS.md) as needed
4. Define your design style in [UI_STYLES.md](./UI_STYLES.md)
5. Learn Git workflow in [GIT_WORKFLOW.md](./GIT_WORKFLOW.md)
