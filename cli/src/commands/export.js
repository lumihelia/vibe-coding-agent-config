import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target tool configurations
const TARGETS = {
  cursor: {
    filename: '.cursorrules',
    description: 'Cursor AI rules file',
    format: 'markdown'
  },
  copilot: {
    filename: '.github/copilot-instructions.md',
    description: 'GitHub Copilot instructions',
    format: 'markdown',
    createDir: true
  },
  windsurf: {
    filename: '.windsurfrules',
    description: 'Windsurf rules file',
    format: 'markdown'
  },
  claude: {
    filename: 'CLAUDE.md',
    description: 'Claude Code instructions',
    format: 'markdown'
  },
  gemini: {
    filename: 'GEMINI.md',
    description: 'Gemini CLI instructions',
    format: 'markdown'
  }
};

// Files to include in export (order matters)
const EXPORT_FILES = [
  'AGENT.md',
  'CODE_STANDARDS.md',
  'UI_STYLES.md',
  'GIT_WORKFLOW.md'
];

export async function exportCommand(options) {
  const spinner = ora('Exporting configuration...').start();

  const target = options.target.toLowerCase();

  // Support zh (Traditional Chinese), zh-CN (Simplified Chinese), en (English)
  let lang = 'zh';
  if (options.lang === 'en') {
    lang = 'en';
  } else if (options.lang === 'zh-CN' || options.lang === 'zh-cn') {
    lang = 'zh-CN';
  }

  // Validate target
  if (!TARGETS[target]) {
    spinner.fail(chalk.red(`Unknown target: ${target}`));
    console.log(chalk.gray(`Available targets: ${Object.keys(TARGETS).join(', ')}`));
    return;
  }

  const targetConfig = TARGETS[target];
  const templatesDir = path.join(__dirname, '..', '..', 'templates', lang);

  try {
    // Read and merge files
    let content = generateHeader(target, lang);

    for (const file of EXPORT_FILES) {
      const filePath = path.join(templatesDir, file);
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        content += `\n\n---\n\n# ${file.replace('.md', '')}\n\n`;
        content += processContent(fileContent, target);
      }
    }

    // Create output directory if needed
    const outputPath = path.join(process.cwd(), targetConfig.filename);
    const outputDir = path.dirname(outputPath);

    if (targetConfig.createDir && !fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write output file
    fs.writeFileSync(outputPath, content);

    spinner.succeed(chalk.green(`Exported to ${targetConfig.filename}`));

    console.log('');
    console.log(chalk.cyan('Export details:'));
    console.log(chalk.white(`  Target: ${targetConfig.description}`));
    const langLabels = { zh: 'Traditional Chinese', 'zh-CN': 'Simplified Chinese', en: 'English' };
    console.log(chalk.white(`  Language: ${langLabels[lang]}`));
    console.log(chalk.white(`  Output: ${targetConfig.filename}`));
    console.log('');
    console.log(chalk.gray('Included files:'));
    EXPORT_FILES.forEach(file => {
      console.log(chalk.gray(`  - ${file}`));
    });

  } catch (error) {
    spinner.fail(chalk.red(`Export failed: ${error.message}`));
  }
}

function generateHeader(target, lang) {
  const timestamp = new Date().toISOString().split('T')[0];

  if (lang === 'zh') {
    return `# AI Agent 配置指令

> 自動生成於 ${timestamp}
> 來源：Vibe Coding Agent Config Kit
> 語言：繁體中文
> 目標工具：${TARGETS[target].description}

請遵循以下規則和標準。`;
  }

  if (lang === 'zh-CN') {
    return `# AI Agent 配置指令

> 自动生成于 ${timestamp}
> 来源：Vibe Coding Agent Config Kit
> 语言：简体中文
> 目标工具：${TARGETS[target].description}

请遵循以下规则和标准。`;
  }

  return `# AI Agent Configuration Instructions

> Auto-generated on ${timestamp}
> Source: Vibe Coding Agent Config Kit
> Language: English
> Target: ${TARGETS[target].description}

Please follow the rules and standards below.`;
}

function processContent(content, target) {
  // Remove the original title (first # heading)
  let processed = content.replace(/^#\s+[^\n]+\n/, '');

  // Remove the description line (starts with >)
  processed = processed.replace(/^>\s*[^\n]+\n+/m, '');

  // Remove "how to use" sections for embedded format
  processed = processed.replace(/## (如何使用|HOW TO USE|META:)[^\n]*\n[\s\S]*?(?=\n##|$)/gi, '');

  // Clean up multiple blank lines
  processed = processed.replace(/\n{3,}/g, '\n\n');

  return processed.trim();
}
