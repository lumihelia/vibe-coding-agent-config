# Vibe Coding Agent Config Kit

**Make AI understand you better.**

> 🌍 [简体中文](./zh-CN/README.md) | [繁體中文](./zh-TW/README.md) | [English](./en/README.md)

---

## You Don't Need to Know How to Code

This toolkit is for **people who use AI to write code**.

Whether you're:

- A founder using AI to build your first product
- A designer wanting AI to help with projects
- Just someone curious and wanting to try

**You can use this.**

---

## What Problems Does It Solve?

When using AI to write code, you may have experienced:

| Problem | After Using This Config |
|---------|------------------------|
| AI asks too many questions | AI makes decisions, solves small issues itself |
| AI writes messy code | AI follows consistent coding standards |
| AI over-explains everything | AI gives concise answers, no rambling |
| Have to re-teach AI every time | Config files remember all the rules |

---

## Choose Your Language

| Language | Description | Get Started |
|----------|-------------|-------------|
| **简体中文** | Optimized for Mainland China | [开始使用 →](./zh-CN/README.md) |
| **繁體中文** | For Taiwan, Hong Kong, Macau | [開始使用 →](./zh-TW/README.md) |
| **English** | For English speakers | [Get Started →](./en/README.md) |

---

## Quick Start

### Option 1: One Command (Recommended)

Open your terminal and run:

```bash
npx vibe-coding-config init
```

That's it. Config files will be copied to your project automatically.

**Other languages:**

```bash
npx vibe-coding-config init --lang en      # English
npx vibe-coding-config init --lang zh-CN   # Simplified Chinese
```

### Option 2: Manual Download

1. Click the green "Code" button above
2. Select "Download ZIP"
3. Extract and copy the files from your preferred language folder

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

## What's Inside?

```
zh-CN/ (or zh-TW/ or en/)
├── AGENT.md           # AI's work manual (you don't need to read it)
├── CODE_STANDARDS.md  # Coding standards
├── SKILLS.md          # What AI can do
├── EXAMPLES.md        # Usage examples
├── UI_STYLES.md       # UI design styles
└── GIT_WORKFLOW.md    # Version control rules
```

**Which files do you need to read?**

- Most of the time: **None** — AI reads them automatically
- Want to change rules: See `CODE_STANDARDS.md`
- Frontend project: See `UI_STYLES.md`
- Curious what AI can do: See `SKILLS.md`

---

## FAQ

**Q: I don't know how to code at all. Can I really use this?**

Yes. Put the files in your project, tell AI "please read the .agent folder first", and you're good to go.

**Q: Is it free?**

Completely free, MIT open source license.

**Q: What if I run into problems?**

[Open an Issue](https://github.com/lumihelia/vibe-coding-agent-config/issues), and I'll do my best to help.

**Q: What if I still don't understand after reading?**

No problem! Just send this repository link to the AI you're using (Claude, ChatGPT, Gemini — any of them), and say:

> "I want to use this config to help you write better code for me. Please guide me step by step on how to set it up."

The AI will walk you through it.

---

## About This Project

This config kit is designed for **people without a technical background who want to use AI to write code**.

I started from knowing almost nothing about code myself. The first time I saw a screen full of technical documentation (configuring terminal for Claude Code), that feeling of "eyes glazing over, wanting to cry from frustration"... I get it.

So I wanted to make something truly beginner-friendly.

I hope it helps you too.

---

MIT License | Made by [lumihelia](https://github.com/lumihelia)
