# UI 設計風格（設計系統）

> 定義你的專案視覺風格。Agent 在生成前端程式碼時會遵循這些設定。

---

## 如何使用這個模板

1. **選擇一個主題**：從下方的預設主題中選一個，或自己定義
2. **填入品牌色**：把 `[YOUR_xxx]` 替換成你的顏色值
3. **選擇字體**：根據專案風格選擇襯線或無襯線
4. **告訴 Agent**：「請參考 .agent/UI_STYLES.md 的設計風格」

---

## 第 1 步：選擇你的主題

> **👇 取消註解你選擇的主題，或填入自定義值**

```css
:root {
  /* ================================================
     主題選項（取消註解一個，或填入自定義值）
     ================================================ */

  /* ------ 選項 A：暖色調（溫暖、友善） ------ */
  /*
  --primary-color: #E07B54;
  --primary-hover: #C96842;
  --accent-color: #D4A574;
  --background-color: #FDF8F3;
  --text-color: #3D3D3D;
  */

  /* ------ 選項 B：冷色調（專業、現代） ------ */
  /*
  --primary-color: #4C436F;
  --primary-hover: #3A3457;
  --accent-color: #6B5B8A;
  --background-color: #F4F3F7;
  --text-color: #2C2C2C;
  */

  /* ------ 選項 C：自然色調（清新、有機） ------ */
  /*
  --primary-color: #5B8C5A;
  --primary-hover: #4A7349;
  --accent-color: #8FBC8F;
  --background-color: #F5F9F4;
  --text-color: #2D3A2D;
  */

  /* ------ 選項 D：自定義（填入你的品牌色） ------ */
  --primary-color: [YOUR_PRIMARY];        /* 主色調，用於按鈕、連結 */
  --primary-hover: [YOUR_PRIMARY_DARK];   /* 主色調的深色版，用於懸停 */
  --accent-color: [YOUR_ACCENT];          /* 強調色，用於重點元素 */
  --background-color: [YOUR_BG];          /* 頁面背景色 */
  --text-color: [YOUR_TEXT];              /* 主要文字顏色 */


  /* ================================================
     通用設定（通常不需要修改）
     ================================================ */

  /* 輔助色 */
  --input-bg: #FFFFFF;
  --white: #FFFFFF;
  --border-color: #E0E0E0;
  --placeholder-color: #9E9E9E;
  --muted-color: #757575;

  /* 狀態色 */
  --success-color: #4CAF50;
  --warning-color: #FF9800;
  --error-color: #F44336;
  --info-color: #2196F3;

  /* 陰影 */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* 圓角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

---

## 第 2 步：選擇字體風格

> **👇 取消註解你選擇的字體方案**

```html
<!-- 選項 A：優雅襯線（適合內容型、editorial 風格） -->
<!--
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Serif+Pro:wght@300;400;500;600&display=swap" rel="stylesheet">
-->

<!-- 選項 B：現代無襯線（適合 SaaS、科技產品） -->
<!--
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
-->

<!-- 選項 C：圓潤友善（適合消費者產品、親和力強） -->
<!--
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap" rel="stylesheet">
-->
```

```css
/* ================================================
   字體設定（取消註解一個）
   ================================================ */

/* ------ 選項 A：優雅襯線 ------ */
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

/* ------ 選項 B：現代無襯線 ------ */
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

/* ------ 選項 C：圓潤友善 ------ */
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

/* 程式碼字體（通用） */
code, pre {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
```

---

## 第 3 步：深色模式（可選）

如果你的專案需要深色模式支援：

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

    /* 主色調保持不變或微調亮度 */
    /* --primary-color: [略微調亮的版本]; */
  }
}
```

---

## 組件樣式參考

這些是基於你選擇的變數自動適配的組件樣式：

### 按鈕

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

### 輸入框

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

## 間距系統

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

## Agent 執行規則

當生成前端程式碼時，Agent 必須：

1. **使用 CSS 變數** - 永遠用 `var(--primary-color)` 而非寫死顏色值
2. **保持一致性** - 所有組件使用相同的圓角、間距變數
3. **響應式優先** - 預設支援手機版（min-width media queries）
4. **無障礙設計** - 確保顏色對比度至少 4.5:1，可點擊元素至少 44x44px

---

## 快速參考

| 用途 | 變數 |
|------|------|
| 主要按鈕背景 | `var(--primary-color)` |
| 按鈕懸停 | `var(--primary-hover)` |
| 頁面背景 | `var(--background-color)` |
| 卡片背景 | `var(--white)` |
| 主要文字 | `var(--text-color)` |
| 次要文字 | `var(--muted-color)` |
| 邊框 | `var(--border-color)` |
| 成功狀態 | `var(--success-color)` |
| 錯誤狀態 | `var(--error-color)` |
