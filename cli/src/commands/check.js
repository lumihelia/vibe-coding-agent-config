import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

// Rules based on CODE_STANDARDS.md
const RULES = {
  // Naming rules
  pythonFileNaming: {
    pattern: /^[a-z][a-z0-9_]*\.py$/,
    message: 'Python files should use snake_case',
    fileTypes: ['.py']
  },
  jsFileNaming: {
    pattern: /^[a-z][a-z0-9-]*\.(js|ts)$/,
    message: 'JS/TS files should use kebab-case',
    fileTypes: ['.js', '.ts'],
    exclude: /^[A-Z]/ // Exclude React components (PascalCase)
  },
  reactComponentNaming: {
    pattern: /^[A-Z][a-zA-Z0-9]*\.(jsx|tsx)$/,
    message: 'React components should use PascalCase',
    fileTypes: ['.jsx', '.tsx']
  }
};

// Content-based checks
const CONTENT_CHECKS = [
  {
    name: 'hardcoded-secrets',
    pattern: /(api[_-]?key|secret|password|token)\s*[:=]\s*['"]\w{10,}['"]/gi,
    message: 'Possible hardcoded secret detected',
    severity: 'error'
  },
  {
    name: 'magic-numbers',
    pattern: /(?<![a-zA-Z0-9_])(if|while|for).*[<>=!]+\s*\d{2,}(?![a-zA-Z0-9_])/g,
    message: 'Magic number in condition - consider using a named constant',
    severity: 'warn'
  },
  {
    name: 'missing-timeout',
    pattern: /requests\.(get|post|put|delete|patch)\([^)]*\)(?![^)]*timeout)/g,
    message: 'HTTP request without timeout',
    severity: 'warn',
    fileTypes: ['.py']
  },
  {
    name: 'console-log',
    pattern: /console\.(log|debug)\(/g,
    message: 'console.log found - remove before production',
    severity: 'info',
    fileTypes: ['.js', '.ts', '.jsx', '.tsx']
  },
  {
    name: 'todo-comments',
    pattern: /\/\/\s*TODO|#\s*TODO/gi,
    message: 'TODO comment found',
    severity: 'info'
  },
  {
    name: 'env-direct-access',
    pattern: /process\.env\.\w+(?!\s*\|\||\s*\?\?)/g,
    message: 'Direct env access without fallback',
    severity: 'warn',
    fileTypes: ['.js', '.ts', '.jsx', '.tsx']
  }
];

export async function checkCommand(targetPath, options) {
  const spinner = ora('Checking code...').start();

  const checkPath = targetPath || process.cwd();
  const issues = [];

  try {
    // Check if path exists
    if (!fs.existsSync(checkPath)) {
      spinner.fail(chalk.red(`Path not found: ${checkPath}`));
      return;
    }

    // Get all files recursively
    const files = getAllFiles(checkPath);
    spinner.text = `Checking ${files.length} files...`;

    for (const file of files) {
      const ext = path.extname(file);
      const basename = path.basename(file);
      const relativePath = path.relative(checkPath, file);

      // Skip node_modules, .git, etc.
      if (shouldSkip(relativePath)) continue;

      // Check file naming
      checkFileNaming(relativePath, basename, ext, issues);

      // Check file contents
      if (['.js', '.ts', '.jsx', '.tsx', '.py'].includes(ext)) {
        const content = fs.readFileSync(file, 'utf-8');
        checkFileContents(relativePath, content, ext, issues);
      }
    }

    spinner.stop();

    // Report results
    if (issues.length === 0) {
      console.log(chalk.green('No issues found!'));
    } else {
      console.log(chalk.yellow(`Found ${issues.length} issue(s):\n`));

      const errors = issues.filter(i => i.severity === 'error');
      const warns = issues.filter(i => i.severity === 'warn');
      const infos = issues.filter(i => i.severity === 'info');

      if (errors.length > 0) {
        console.log(chalk.red.bold('Errors:'));
        errors.forEach(i => console.log(chalk.red(`  [ERROR] ${i.file}:${i.line || ''} - ${i.message}`)));
        console.log('');
      }

      if (warns.length > 0) {
        console.log(chalk.yellow.bold('Warnings:'));
        warns.forEach(i => console.log(chalk.yellow(`  [WARN] ${i.file}:${i.line || ''} - ${i.message}`)));
        console.log('');
      }

      if (infos.length > 0) {
        console.log(chalk.blue.bold('Info:'));
        infos.forEach(i => console.log(chalk.blue(`  [INFO] ${i.file}:${i.line || ''} - ${i.message}`)));
        console.log('');
      }

      // Summary
      console.log(chalk.gray('---'));
      console.log(`Total: ${chalk.red(errors.length + ' errors')}, ${chalk.yellow(warns.length + ' warnings')}, ${chalk.blue(infos.length + ' info')}`);
    }

  } catch (error) {
    spinner.fail(chalk.red(`Check failed: ${error.message}`));
  }
}

function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

function shouldSkip(relativePath) {
  const skipPatterns = [
    'node_modules',
    '.git',
    '.next',
    '__pycache__',
    'venv',
    '.env',
    'dist',
    'build',
    '.agent'
  ];

  return skipPatterns.some(pattern => relativePath.includes(pattern));
}

function checkFileNaming(relativePath, basename, ext, issues) {
  // Python files
  if (ext === '.py' && !RULES.pythonFileNaming.pattern.test(basename)) {
    // Skip __init__.py and similar
    if (!basename.startsWith('__')) {
      issues.push({
        file: relativePath,
        message: RULES.pythonFileNaming.message,
        severity: 'warn'
      });
    }
  }

  // JS/TS files (non-React)
  if (['.js', '.ts'].includes(ext)) {
    if (!RULES.jsFileNaming.pattern.test(basename) && !RULES.jsFileNaming.exclude.test(basename)) {
      // Skip index files and config files
      if (!['index.js', 'index.ts'].includes(basename)) {
        issues.push({
          file: relativePath,
          message: RULES.jsFileNaming.message,
          severity: 'warn'
        });
      }
    }
  }

  // React components
  if (['.jsx', '.tsx'].includes(ext) && !RULES.reactComponentNaming.pattern.test(basename)) {
    issues.push({
      file: relativePath,
      message: RULES.reactComponentNaming.message,
      severity: 'warn'
    });
  }
}

function checkFileContents(relativePath, content, ext, issues) {
  const lines = content.split('\n');

  for (const check of CONTENT_CHECKS) {
    // Skip if file type doesn't match
    if (check.fileTypes && !check.fileTypes.includes(ext)) continue;

    // Check each line
    lines.forEach((line, index) => {
      if (check.pattern.test(line)) {
        issues.push({
          file: relativePath,
          line: index + 1,
          message: check.message,
          severity: check.severity
        });
      }
      // Reset regex lastIndex for global patterns
      check.pattern.lastIndex = 0;
    });
  }
}
