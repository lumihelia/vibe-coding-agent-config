#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init.js';
import { checkCommand } from './commands/check.js';
import { exportCommand } from './commands/export.js';

const program = new Command();

program
  .name('vibe')
  .description('Vibe Coding Agent Configuration Kit CLI')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize .agent/ folder with configuration files')
  .option('-l, --lang <language>', 'Language: zh-TW (Traditional Chinese), zh-CN (Simplified), or en (English)', 'zh-TW')
  .option('-f, --force', 'Overwrite existing files', false)
  .action(initCommand);

program
  .command('check [path]')
  .description('Check code against CODE_STANDARDS.md rules')
  .option('-f, --fix', 'Auto-fix simple issues', false)
  .action(checkCommand);

program
  .command('export')
  .description('Export configuration to different AI tool formats')
  .option('-t, --target <tool>', 'Target tool: cursor, copilot, windsurf, claude, gemini', 'cursor')
  .option('-l, --lang <language>', 'Language: zh-TW, zh-CN, or en', 'zh-TW')
  .action(exportCommand);

program.parse();
