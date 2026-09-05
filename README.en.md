# Vibe Coding Agent Config Kit

[中文](./README.md) · English

A small toolkit for making AI coding agents behave more consistently at the project level. The repository currently contains reusable configuration templates, a CLI for installing/exporting a portable `.agent/` rule set, and a standalone skill that can generate customized Claude Code configuration through conversation.

## What is in the repository

### 1. Project configuration templates

Three language directories are preserved, but they are **not at the same feature level**.

| Directory | Current state |
|---|---|
| [`zh-CN/`](./zh-CN/) | Most recently expanded set: `CLAUDE.md`, `AGENT.md`, coding rules, Git workflow, UI rules, MCP guide, and a Claude Code permissions example |
| [`en/`](./en/) | Portable six-file `.agent/` configuration set |
| [`zh-TW/`](./zh-TW/) | Portable six-file `.agent/` configuration set |

The newer Claude-specific files added to `zh-CN/` have not yet been mirrored into `en/` or `zh-TW/`. The documentation keeps that difference explicit instead of presenting the three directories as equivalent.

### 2. CLI

[`cli/`](./cli/) contains the JavaScript CLI.

`init` creates six portable files inside `.agent/`:

```text
.agent/
├── AGENT.md
├── SKILLS.md
├── CODE_STANDARDS.md
├── EXAMPLES.md
├── UI_STYLES.md
└── GIT_WORKFLOW.md
```

The CLI currently defaults to Traditional Chinese and also supports Simplified Chinese and English. It does **not** install the newer `zh-CN/CLAUDE.md`, `MCP_GUIDE.md`, or `settings.json.example` files.

`export` can merge the portable rules into tool-specific files for Cursor, GitHub Copilot, Windsurf, Claude Code, and Gemini CLI. `check` runs a lightweight rule-based scan against code files.

See [`cli/README.md`](./cli/README.md) for the exact current commands.

### 3. `SKILL.md`

The root [`SKILL.md`](./SKILL.md) is a standalone Vibe Agent Starter skill with BotLearn-style metadata. Its flow gathers project information and produces a customized `CLAUDE.md`, Claude Code permissions, and optional MCP guidance.

This is separate from the static language templates: the templates provide reusable defaults, while the skill generates project-specific configuration conversationally.

## Choosing a path

| Goal | Path |
|---|---|
| Use the most recently expanded Claude Code template | Start with [`zh-CN/`](./zh-CN/) |
| Use a portable `.agent/` rule set | Use one of the language directories or the CLI |
| Generate a project-specific Claude Code configuration | Use [`SKILL.md`](./SKILL.md) in a compatible skill runtime |
| Convert the portable rules to a tool-specific file | Use `cli export` |

## Simplified Chinese / Claude Code setup

The current `zh-CN/` set supports a Claude Code-first structure:

1. Copy `zh-CN/CLAUDE.md` to the project root as `CLAUDE.md`.
2. Create `.agent/` and copy the supporting rule files that are relevant to the project.
3. Copy `zh-CN/settings.json.example` to `.claude/settings.json` when the included permission defaults are appropriate.
4. Use `zh-CN/MCP_GUIDE.md` as reference material when adding external tools.

The files are plain Markdown/JSON and can be edited directly as project requirements change.

## Portable `.agent/` setup

The portable configuration model uses a shared `.agent/` directory. The core entry point is `AGENT.md`, with supporting rules split into smaller files for code standards, Git behavior, UI conventions, skills, and examples.

Tools that do not automatically discover `.agent/AGENT.md` may require an explicit instruction to read it at the start of a session.

## Repository structure

```text
.
├── README.md              # Chinese repository overview
├── README.en.md           # English repository overview
├── SKILL.md               # Conversational config generator
├── zh-CN/                 # Expanded Simplified Chinese template set
├── en/                    # English portable template set
├── zh-TW/                 # Traditional Chinese portable template set
├── cli/                   # CLI source and templates
└── .claude/               # Claude Code skill integration
```

## Current status

This repository is evolving. Language parity is currently incomplete, and the CLI still reflects the older portable six-file configuration model. Those differences are documented here so the public entry point matches the repository that actually exists today.

Issues and pull requests are welcome when they improve the templates, CLI, or documentation without hiding these implementation differences.

## License

MIT License. See [`LICENSE`](./LICENSE).
