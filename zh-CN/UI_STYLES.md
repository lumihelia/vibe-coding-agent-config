# UI 设计风格（设计系统）

> 定义你的项目视觉风格。Agent 在生成前端代码时会遵循这些设定。

---

## 如何使用这个模板

1. **选择一个主题**：从下方的预设主题中选一个，或自己定义
2. **填入品牌色**：把 `[YOUR_xxx]` 替换成你的颜色值
3. **选择字体**：根据项目风格选择衬线或无衬线
4. **告诉 Agent**：「请参考 .agent/UI_STYLES.md 的设计风格」

---

## 第 1 步：选择你的主题

> **👇 取消注释你选择的主题，或填入自定义值**

```css
:root {
  /* ================================================
     主题选项（取消注释一个，或填入自定义值）
     ================================================ */

  /* ------ 选项 A：暖色调（温暖、友善） ------ */
  /*
  --primary-color: #E07B54;
  --primary-hover: #C96842;
  --accent-color: #D4A574;
  --background-color: #FDF8F3;
  --text-color: #3D3D3D;
  */

  /* ------ 选项 B：冷色调（专业、现代） ------ */
  /*
  --primary-color: #4C436F;
  --primary-hover: #3A3457;
  --accent-color: #6B5B8A;
  --background-color: #F4F3F7;
  --text-color: #2C2C2C;
  */

  /* ------ 选项 C：自然色调（清新、有机） ------ */
  /*
  --primary-color: #5B8C5A;
  --primary-hover: #4A7349;
  --accent-color: #8FBC8F;
  --background-color: #F5F9F4;
  --text-color: #2D3A2D;
  */

  /* ------ 选项 D：自定义（填入你的品牌色） ------ */
  --primary-color: [YOUR_PRIMARY];        /* 主色调，用于按钮、链接 */
  --primary-hover: [YOUR_PRIMARY_DARK];   /* 主色调的深色版，用于悬停 */
  --accent-color: [YOUR_ACCENT];          /* 强调色，用于重点元素 */
  --background-color: [YOUR_BG];          /* 页面背景色 */
  --text-color: [YOUR_TEXT];              /* 主要文字颜色 */


  /* ================================================
     通用设定（通常不需要修改）
     ================================================ */

  /* 辅助色 */
  --input-bg: #FFFFFF;
  --white: #FFFFFF;
  --border-color: #E0E0E0;
  --placeholder-color: #9E9E9E;
  --muted-color: #757575;

  /* 状态色 */
  --success-color: #4CAF50;
  --warning-color: #FF9800;
  --error-color: #F44336;
  --info-color: #2196F3;

  /* 阴影 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

---

## 第 2 步：选择字体风格

> **👇 取消注释你选择的字体方案**

```html
<!-- 选项 A：优雅衬线（适合内容型、editorial 风格） -->
<!--
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Serif+Pro:wght@300;400;500;600&display=swap" rel="stylesheet">
-->

<!-- 选项 B：现代无衬线（适合 SaaS、科技产品） -->
<!--
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
-->

<!-- 选项 C：圆润友善（适合消费者产品、亲和力强） -->
<!--
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
-->
```

```css
/* ================================================
   字体设定（取消注释一个）
   ================================================ */

/* ------ 选项 A：优雅衬线 ------ */
/*
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}
body, p, span, div {
  font-family: 'Source Serif Pro', serif;
  font-weight: 400;
  line-height: 1.6;
}
*/

/* ------ 选项 B：现代无衬线 ------ */
/*
h1, h2, h3, h4, h5, h6,
body, p, span, div {
  font-family: 'Inter', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
}
body, p, span, div {
  font-weight: 400;
  line-height: 1.5;
}
*/

/* ------ 选项 C：圆润友善 ------ */
/*
h1, h2, h3, h4, h5, h6,
body, p, span, div {
  font-family: 'Nunito', sans-serif;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
}
body, p, span, div {
  font-weight: 400;
  line-height: 1.6;
}
*/

/* 代码字体（通用） */
code, pre {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
```

---

## 第 3 步：深色模式（可选）

如果你的项目需要深色模式支持：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: #1A1A1A;
    --text-color: #E5E5E5;
    --input-bg: #2D2D2D;
    --white: #2D2D2D;
    --border-color: #404040;
    --placeholder-color: #808080;
    --muted-color: #A0A0A0;

    /* 主色调保持不变或微调亮度 */
    /* --primary-color: [略微调亮的版本]; */
  }
}
```

---

## 组件样式参考

这些是基于你选择的变量自动适配的组件样式：

### 按钮

```css
.button {
  background: var(--primary-color);
  color: var(--white);
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.button:hover {
  background: var(--primary-hover);
}

.button-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 1px solid var(--border-color);
}

.button-secondary:hover {
  background: var(--background-color);
}
```

### 卡片

```css
.card {
  background: var(--white);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-md);
}
```

### 输入框

```css
.input {
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.input::placeholder {
  color: var(--placeholder-color);
}
```

---

## 间距系统

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
}
```

---

## Agent 执行规则

当生成前端代码时，Agent 必须：

1. **使用 CSS 变量** - 永远用 `var(--primary-color)` 而非写死颜色值
2. **保持一致性** - 所有组件使用相同的圆角、间距变量
3. **响应式优先** - 默认支持手机版（min-width media queries）
4. **无障碍设计** - 确保颜色对比度至少 4.5:1，可点击元素至少 44x44px

---

## 快速参考

| 用途 | 变量 |
|------|------|
| 主要按钮背景 | `var(--primary-color)` |
| 按钮悬停 | `var(--primary-hover)` |
| 页面背景 | `var(--background-color)` |
| 卡片背景 | `var(--white)` |
| 主要文字 | `var(--text-color)` |
| 次要文字 | `var(--muted-color)` |
| 边框 | `var(--border-color)` |
| 成功状态 | `var(--success-color)` |
| 错误状态 | `var(--error-color)` |
