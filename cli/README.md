# Vibe Coding Config CLI

CLI source for installing, checking, and exporting the repository's portable AI agent configuration files.

## Run from this repository

The CLI package lives in `cli/` and requires Node.js 18 or newer.

```bash
cd cli
npm install
npm link
vibe --help
```

`package.json` also registers `vibe-coding-config` as a binary name, so either binary can point to the same CLI after a local link/install.

## `vibe init`

Creates a six-file `.agent/` directory.

```bash
vibe init                    # default: Traditional Chinese
vibe init --lang zh-TW
vibe init --lang zh-CN
vibe init --lang en
vibe init --force            # overwrite an existing .agent/ directory
```

Generated structure:

```text
.agent/
├── AGENT.md
├── SKILLS.md
├── CODE_STANDARDS.md
├── EXAMPLES.md
├── UI_STYLES.md
└── GIT_WORKFLOW.md
```

### Current limitation

`init` reflects the portable six-file model. It does not currently copy the newer Simplified Chinese Claude-specific files:

- `zh-CN/CLAUDE.md`
- `zh-CN/MCP_GUIDE.md`
- `zh-CN/settings.json.example`

Those files require manual setup at the moment.

## `vibe export`

Merges four portable rule files (`AGENT.md`, `CODE_STANDARDS.md`, `UI_STYLES.md`, and `GIT_WORKFLOW.md`) into one tool-specific output file.

```bash
vibe export --target cursor --lang en
vibe export --target copilot --lang zh-CN
vibe export --target windsurf --lang zh-TW
vibe export --target claude --lang zh-CN
vibe export --target gemini --lang en
```

Supported targets:

| Target | Output file |
|---|---|
| `cursor` | `.cursorrules` |
| `copilot` | `.github/copilot-instructions.md` |
| `windsurf` | `.windsurfrules` |
| `claude` | `CLAUDE.md` |
| `gemini` | `GEMINI.md` |

The export path is separate from the hand-written `zh-CN/CLAUDE.md`: `export --target claude` generates a merged file from the portable rule set rather than copying the newer Claude-specific template.

## `vibe check [path]`

Runs a lightweight static scan over JavaScript, TypeScript, JSX, TSX, and Python files.

```bash
vibe check
vibe check src/
vibe check src/api.js
```

Current checks include:

- Python file naming (`snake_case`)
- JavaScript / TypeScript file naming (`kebab-case`, with component exceptions)
- React component naming (`PascalCase`)
- possible hardcoded secrets
- magic numbers in conditions
- Python HTTP requests without an explicit timeout
- `console.log` / `console.debug`
- TODO comments
- direct `process.env` access without a fallback

The CLI accepts `--fix`, but the current implementation only reports issues; automatic fixes are not implemented yet.

## Language behavior

Both `init` and `export` support:

- `zh-TW` — Traditional Chinese, current default
- `zh-CN` — Simplified Chinese
- `en` — English

## Implementation notes

The CLI is intentionally separate from the repository-level [`../SKILL.md`](../SKILL.md). The CLI installs or merges static templates; the Skill gathers project context and generates customized Claude Code configuration conversationally.

## License

MIT License.
