import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILES = [
  'AGENT.md',
  'SKILLS.md',
  'CODE_STANDARDS.md',
  'EXAMPLES.md',
  'UI_STYLES.md',
  'GIT_WORKFLOW.md'
];

export async function initCommand(options) {
  const spinner = ora('Initializing .agent/ folder...').start();

  // Support zh-TW (Traditional Chinese), zh-CN (Simplified Chinese), en (English)
  let lang = 'zh-TW';
  if (options.lang === 'en') {
    lang = 'en';
  } else if (options.lang === 'zh-CN' || options.lang === 'zh-cn') {
    lang = 'zh-CN';
  } else if (options.lang === 'zh-TW' || options.lang === 'zh-tw' || options.lang === 'zh') {
    lang = 'zh-TW';
  }
  const targetDir = path.join(process.cwd(), '.agent');
  const templatesDir = path.join(__dirname, '..', '..', 'templates', lang);

  try {
    // Check if .agent already exists
    if (fs.existsSync(targetDir) && !options.force) {
      spinner.fail(chalk.red('.agent/ folder already exists. Use --force to overwrite.'));
      return;
    }

    // Create .agent directory
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy files
    let copiedCount = 0;
    for (const file of FILES) {
      const sourcePath = path.join(templatesDir, file);
      const targetPath = path.join(targetDir, file);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        copiedCount++;
      } else {
        spinner.warn(chalk.yellow(`Template not found: ${file}`));
      }
    }

    spinner.succeed(chalk.green(`Initialized .agent/ with ${copiedCount} files (${lang})`));

    console.log('');
    console.log(chalk.cyan('Next steps:'));
    console.log(chalk.white('  1. Review and customize the files in .agent/'));
    console.log(chalk.white('  2. Tell your AI Agent: "Please read .agent/ folder first"'));
    console.log('');
    console.log(chalk.gray('Files created:'));
    FILES.forEach(file => {
      const targetPath = path.join(targetDir, file);
      if (fs.existsSync(targetPath)) {
        console.log(chalk.gray(`  - .agent/${file}`));
      }
    });

  } catch (error) {
    spinner.fail(chalk.red(`Failed to initialize: ${error.message}`));
  }
}
