# UI 設計風格（設計系統）

> 定義你的專案視覺風格。Agent 在生成前端程式碼時會遵循這些設定。

---

## ⚠️ 自定義說明

這是一個**模板文件**。請根據你的專案需求修改以下設定。

你可以：

- 修改色彩配置來匹配你的品牌
- 更換字體來符合你的設計風格
- 調整間距和圓角來改變整體感覺

---

## 色彩配置

> **👇 修改這裡**：替換成你專案需要的顏色

```css
/* ====================================================
   🎨 UI 風格設定（可自定義）
   ====================================================
   
   這是預設的陽光暖色主題。你可以：
   - 複製整個 :root 區塊到你的 CSS 文件
   - 修改任何顏色值來匹配你的品牌
   
   ==================================================== */

:root {
  /* 主要文字 */
  --text-color: #3D3D3D;           /* 溫暖炭灰色 */
  
  /* 主色調 */
  --primary-color: #E07B54;        /* 溫暖珊瑚橙色 */
  --primary-hover: #C96842;        /* 懸停時更深 */
  
  /* 背景色 */
  --background-color: #FDF8F3;     /* 奶油白色 */
  --input-bg: #FFFBF7;             /* 輸入框背景 */
  --white: #FFFFFF;                /* 卡片背景 */
  
  /* 邊框和輔助色 */
  --border-color: #E8DDD4;         /* 暖米色邊框 */
  --placeholder-color: #B8A99A;    /* 佔位符文字 */
  --muted-color: #9A8B7A;          /* 次要文字 */
  --accent-color: #D4A574;         /* 金琥珀強調色 */
  
  /* 額外色彩（可選） */
  --success-color: #7CB587;        /* 柔和綠色 */
  --warning-color: #E9B44C;        /* 陽光黃色 */
  --info-color: #6BB3D9;           /* 天空藍色 */
  
  /* 陰影 */
  --shadow: rgba(224, 123, 84, 0.1);
  
  /* 圓角 */
  --border-radius: 12px;
}
```

### 備選：深色模式

如果你需要深色主題，可以替換為：

```css
:root {
  --text-color: #F5EDE6;
  --primary-color: #E8956E;
  --primary-hover: #F0A882;
  --background-color: #2A2520;
  --input-bg: #353029;
  --white: #3D3732;
  --border-color: #524A42;
  --placeholder-color: #8A7D70;
  --muted-color: #A69888;
  --accent-color: #DEB887;
  --shadow: rgba(0, 0, 0, 0.3);
  --border-radius: 12px;
}
```

---

## 字體設定

> **👇 修改這裡**：選擇適合你專案的字體

```html
<!-- 在 HTML <head> 中加入 Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Serif+Pro:wght@300;400;500;600&display=swap" rel="stylesheet">
```

```css
/* 標題：優雅襯線體 */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}

/* 內文：清晰襯線體 */
body, p, span, div {
  font-family: 'Source Serif Pro', serif;
  font-weight: 400;
  line-height: 1.6;
}

/* 程式碼：等寬字體 */
code, pre {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### 備選：現代無襯線

```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

body, p, span, div {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}
```

---

## 組件樣式

### 按鈕

```css
.button {
  background: var(--primary-color);
  color: var(--white);
  padding: 12px 24px;
  border-radius: var(--border-radius);
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
```

### 卡片

```css
.card {
  background: var(--white);
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: 0 2px 8px var(--shadow);
}
```

### 輸入框

```css
.input {
  background: var(--input-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  width: 100%;
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

## 使用方式

1. **複製到你的專案**：把這個文件放到 `.agent/UI_STYLES.md`
2. **修改設定**：根據你的品牌調整顏色和字體
3. **告訴 Agent**：在對話開始時說「請參考 .agent/UI_STYLES.md 的設計風格」
4. **持續迭代**：隨時修改這個文件來更新風格

---

## Agent 執行規則

當生成前端程式碼時：

1. **使用 CSS 變數**：優先使用 `var(--primary-color)` 而非寫死顏色
2. **保持一致性**：所有組件遵循相同的圓角、間距
3. **響應式設計**：預設支持手機版
4. **無障礙**：確保對比度足夠、字體大小合適
