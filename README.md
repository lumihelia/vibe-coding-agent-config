# Vibe Coding Agent Config Kit

> 🌏 中文版 | 🌍 English Version
>
> **The Complete AI Agent Configuration Kit for Beginners**
>
> 專為非技術背景的中文用戶設計，提供可直接使用的完整配置體系。

---

## What Makes This Different?

| Existing Projects | This Kit |
|-------------------|----------|
| English only | **Bilingual** (繁體中文 / English) |
| Assumes technical background | **Beginner-friendly** with explanations |
| Single rule file | **Complete system** (6 integrated files) |
| Abstract rules | **Real examples** showing do's and don'ts |
| No token awareness | **Token efficiency** rules included |

---

## Choose Your Language

| Language | Folder | Quick Start |
|----------|--------|-------------|
| **繁體中文** | [zh/](./zh/) | [開始使用 →](./zh/README.md) |
| **English** | [en/](./en/) | [Get Started →](./en/README.md) |

---

## What's Included?

```
docs/
├── README.md              # You're here
├── zh/                    # 繁體中文版
│   ├── README.md          # 使用指南
│   ├── AGENT.md           # Agent 系統指令
│   ├── SKILLS.md          # 技能手冊
│   ├── CODE_STANDARDS.md  # 程式碼規範
│   ├── EXAMPLES.md        # 使用範例
│   └── UI_STYLES.md       # UI 設計風格
└── en/                    # English Version
    └── (same structure)
```

---

## Who Is This For?

- 🎯 **Non-technical founders** learning to vibe code
- 🎯 **Beginners** using Claude, Gemini, Cursor, or Copilot
- 🎯 **Chinese-speaking developers** who prefer native language docs
- 🎯 **Anyone** who wants their AI agent to write better code

---

## What Problems Does It Solve?

| Problem | Solution |
|---------|----------|
| Agent writes messy code | → CODE_STANDARDS.md with naming/structure rules |
| Agent asks too many questions | → AGENT.md with auto-fix scope |
| Agent wastes tokens on explanations | → Token efficiency rules |
| Agent doesn't know when to stop | → Escalation threshold |
| Every project reinvents the wheel | → Reusable template files |

---

## Quick Start

```bash
# 1. Clone or download
git clone https://github.com/YOUR_USERNAME/vibe-coding-agent-config.git

# 2. Copy to your project
mkdir -p .agent
cp -r zh/*.md .agent/   # or en/*.md for English

# 3. Tell your AI agent
"Please read .agent/ folder first before starting work."
```

---

## Compatibility

Works with any AI coding assistant that supports system instructions:

| Product | Company | Instruction File Format |
|---------|---------|------------------------|
| **Claude Code** | Anthropic | CLAUDE.md |
| **Cursor** | Anysphere | .cursorrules |
| **Windsurf** | Codeium | Supports custom rules |
| **Gemini CLI / Antigravity** | Google | GEMINI.md |
| **Jules** | Google | Supports custom rules |
| **GitHub Copilot** | GitHub/Microsoft | .github/copilot-instructions.md |

> 💡 This kit provides universal instructions that work across all platforms. Just copy the content to the appropriate file format for your tool.

---

## Contributing

Found a bug? Have a suggestion? PRs welcome!

---

## License

MIT - Feel free to use, modify, and share.

---

## Author

Made with 💜 for the Vibe Coding community.
