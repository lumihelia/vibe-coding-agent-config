# Vibe Coding Agent Config Guide — English Templates

This directory contains the current English **portable `.agent/` template set**.

It does not yet include the newer Claude-specific files that were later added to `zh-CN/`, such as `CLAUDE.md`, `MCP_GUIDE.md`, or `settings.json.example`.

## Included files

| File | Purpose |
|---|---|
| `AGENT.md` | Main portable agent instructions |
| `CODE_STANDARDS.md` | Naming, structure, and error-handling rules |
| `SKILLS.md` | Agent capabilities and working procedures |
| `EXAMPLES.md` | Behavior and output examples |
| `UI_STYLES.md` | Frontend and interface conventions |
| `GIT_WORKFLOW.md` | Git workflow and operation boundaries |

## Portable setup

A typical project layout looks like this:

```text
project/
└── .agent/
    ├── AGENT.md
    ├── CODE_STANDARDS.md
    ├── SKILLS.md
    ├── EXAMPLES.md
    ├── UI_STYLES.md
    └── GIT_WORKFLOW.md
```

Copy the relevant files into `.agent/`. Tools that do not automatically discover `.agent/AGENT.md` may require an explicit instruction to read it at the start of a session.

## CLI

The repository CLI can initialize the same six-file portable set or merge the rules into tool-specific files.

After installing the CLI from the repository source, examples include:

```bash
vibe init --lang en
vibe export --target cursor --lang en
vibe export --target copilot --lang en
vibe export --target windsurf --lang en
vibe export --target claude --lang en
vibe export --target gemini --lang en
```

See [`../cli/README.md`](../cli/README.md) for the exact current commands and limitations.

## Claude Code-specific configuration

Two current paths cover Claude Code-specific setup:

- [`../SKILL.md`](../SKILL.md) can generate a customized `CLAUDE.md`, permissions file, and optional MCP guidance through conversation.
- [`../zh-CN/`](../zh-CN/) contains the most recently expanded static template set, currently written in Simplified Chinese.

The English static directory has not yet been brought to feature parity with that newer structure.

## Issues and contributions

Questions and suggestions can be filed through [GitHub Issues](https://github.com/lumihelia/vibe-coding-agent-config/issues). Code and documentation changes are welcome through Pull Requests.

## License

MIT License.
