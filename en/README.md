# Vibe Coding Agent Config Guide

> Instructions to help AI write better code for you

---

## What is this?

When you use AI tools (like Claude, Cursor, Copilot) to write code, AI sometimes:

- Asks too many questions
- Writes inconsistent code
- Over-explains things you don't need
- Doesn't know how to recover from errors

**This config kit solves these problems.**

Put these files in your project, and AI will follow your rules.

---

## Quick Start

### Option 1: One Command (Recommended)

```bash
npx vibe-coding-config init --lang en
```

### Option 2: Manual Copy

1. Download this folder
2. Create an `.agent` folder in your project
3. Copy all `.md` files into it
4. Tell your AI: "Please read the .agent folder first"

---

## What's Inside

| File | Purpose | When to read |
|------|---------|--------------|
| **AGENT.md** | AI's "work manual" | You don't need to - AI reads it |
| **CODE_STANDARDS.md** | Code style rules | When customizing naming conventions |
| **SKILLS.md** | AI's skill list | Curious what AI can do |
| **EXAMPLES.md** | Usage examples | See how AI should respond |
| **UI_STYLES.md** | Design system | For frontend projects |
| **GIT_WORKFLOW.md** | Git rules | When using version control |

---

## Compatible AI Tools

Works with all major AI coding tools:

| Tool | Company |
|------|---------|
| Claude Code | Anthropic |
| Cursor | Anysphere |
| Windsurf | Codeium |
| GitHub Copilot | Microsoft |
| Gemini CLI | Google |

Use the `export` command to convert to different formats:

```bash
npx vibe-coding-config export --target cursor
npx vibe-coding-config export --target copilot
```

---

## FAQ

### Q: I don't know how to code. Can I still use this?

Yes. This kit is designed for non-technical users. Just copy the files to your project, and AI will read them.

### Q: I use Cursor / Copilot. Will this work?

Yes. Use `npx vibe-coding-config export --target cursor` to convert to the right format.

### Q: How do I change the rules?

Just edit the `.md` files. They're plain text files that open in any editor.

### Q: What if AI ignores the rules?

At the start of your conversation, remind it: "Please read the .agent folder first, then follow those rules."

### Q: I still don't understand how to set this up?

No problem! Just send this GitHub repository link to the AI you're using (Claude, ChatGPT, Gemini - any of them), and say:

> "I want to use this config to help you write better code for me. Please guide me step by step on how to set it up."

The AI will walk you through it.

---

## Need Help?

- Questions or suggestions: [GitHub Issues](https://github.com/lumihelia/vibe-coding-agent-config/issues)
- Want to contribute: PRs welcome

---

MIT License
