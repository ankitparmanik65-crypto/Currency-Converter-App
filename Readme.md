# 💱 Currency Converter

A modern, feature-rich **Currency Converter** web app built with pure **HTML, CSS, and JavaScript** — no frameworks, no build tools, no dependencies. Just open `index.html` and start converting!

![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

🔗 **Live Demo:** [https://currency-converter-app-xm26.vercel.app/](https://currency-converter-app-xm26.vercel.app/)

---

## ✨ Features

- 🌍 **Live Exchange Rates** — Real-time rates fetched from exchangerate-api
- 🔄 **170+ Currencies** — Convert between virtually any world currency
- 🎯 **Manual Convert Button** — Full control; result appears only when you click Convert
- 📜 **Conversion History** — Last 5 conversions saved automatically in `localStorage`
- 🌙 **Dark / Light Theme** — Toggle with smooth animation, preference saved
- ⚡ **Quick Amount Buttons** — 10, 100, 500, 1000, Max
- 📋 **Copy to Clipboard** — One-click copy of the converted result
- 🔁 **Swap Currencies** — Animated 180° rotate swap button
- ⌨️ **Keyboard Friendly** — Press `Enter` to convert instantly
- 🎨 **Glassmorphism UI** — Modern blur, gradients, and soft shadows
- 📱 **Fully Responsive** — Works beautifully on mobile, tablet, and desktop
- 🚀 **Zero Dependencies** — Pure vanilla JS, no libraries required
- 💾 **Offline Fallback** — Static rates if API fails
- 🎬 **Animated Background** — Smooth shifting gradient

---

## 🖼️ Preview

```
┌────────────────────────────────────────┐
│  💱  Currency Converter          🌙   │
│  Live exchange rates                   │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  AMOUNT                          │  │
│  │  14343                           │  │
│  │  [10] [100] [500] [1000] [Max]   │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌─────────┐    ⇄     ┌─────────┐      │
│  │  FROM   │          │   TO    │      │
│  │  USD  ▾ │          │  EUR  ▾ │      │
│  └─────────┘          └─────────┘      │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │        💱  CONVERT               │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────┐  📋  │
│  │  CONVERTED AMOUNT            │      │
│  │  12,795.55  EUR              │      │
│  │  1 USD = 0.8921 EUR  updated │      │
│  └──────────────────────────────┘      │
│                                        │
│  📜 RECENT CONVERSIONS      clear      │
│  ┌──────────────────────────────┐      │
│  │  14343 USD → 12795.55 EUR    │      │
│  └──────────────────────────────┘      │
└────────────────────────────────────────┘
```

---

## 🚀 How to Use

### 1️⃣ Basic Usage

1. Clone or download this repository
2. Open `index.html` in any modern browser
3. Enter an amount
4. Select **From** and **To** currencies
5. Click **💱 Convert**
6. Done! Result appears + saved to history

```bash
# Clone the repo
git clone https://github.com/ankitparmanik65-crypto/Currency-Converter-App.git

# Open in browser
cd Currency-Converter-App
start index.html   # Windows
open index.html    # Mac
```

### 2️⃣ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` (in amount field) | Trigger conversion |
| Double-click status badge | Refresh live rates |

### 3️⃣ Quick Tips

- 🌙 Click the **moon/sun icon** (top-right) to switch themes
- ⇄ Click the **swap button** to reverse currencies instantly
- 📋 Click **copy icon** in result box to copy result
- 🔢 Click **quick amount buttons** to fill common values
- 🗑️ Click **clear** to wipe conversion history

---

## 📂 Project Structure

```
Currency-Converter-App/
│
├── index.html      # Main HTML structure
├── style.css       # All styling (glassmorphism + dark mode)
├── script.js       # Logic, API fetch, history, theme
└── README.md       # You're reading it!
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Structure** | HTML5 |
| **Styling** | CSS3 (Custom Properties, Flexbox, Grid, Backdrop Filter, Animations) |
| **Logic** | Vanilla JavaScript (ES6+, Async/Await, Fetch API) |
| **Storage** | LocalStorage (theme + history persistence) |
| **API** | Open Exchange Rate API |

---

## 🌐 API Information

This app uses the **free, open** endpoint:

```
https://open.er-api.com/v6/latest/{BASE_CURRENCY}
```

- ✅ **No API key required**
- ✅ **No rate limits** for basic usage
- ✅ **Updated daily**
- 📖 Docs: [https://www.exchangerate-api.com/docs/free](https://www.exchangerate-api.com/docs/free)

**Fallback:** If the API fails, the app uses **hardcoded static rates** (approximate) so it never breaks.

---

## 🎨 Customization

### Change Default Currencies

In `script.js`, inside the `init()` function:

```javascript
populateSelects(defaults, "USD", "EUR");
//                       ↑      ↑
//                       From   To
```

### Change History Limit

```javascript
const MAX_HISTORY = 5;  // ← change to any number
```

### Change Theme Colors

Edit the CSS variables in `style.css` `:root`:

```css
:root {
  --bg-start: #0b1c2f;
  --bg-end: #1b3b4f;
  --accent: #3bc9db;
  /* ...etc */
}
```

### Change API Endpoint

In `script.js`:

```javascript
const API_BASE = "https://open.er-api.com/v6/latest/";
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|-----------|--------|
| **> 480px** | Full desktop layout (side-by-side currencies) |
| **≤ 480px** | Stacked layout (currencies vertical, rotated swap) |

---

## ✅ Browser Support

| Browser | Version |
|---------|---------|
| Chrome | ✅ 90+ |
| Firefox | ✅ 88+ |
| Safari | ✅ 14+ |
| Edge | ✅ 90+ |
| Opera | ✅ 76+ |

> Requires **Fetch API** and **CSS Custom Properties** support (all modern browsers).

---

## 🔮 Future Improvements

- [ ] 📊 Historical rate charts
- [ ] 💰 Crypto currency support
- [ ] 🔔 Rate change alerts
- [ ] 🌐 Multi-language support
- [ ] 📤 Export history to CSV
- [ ] 🎯 Custom dropdown (hide native select scrollbar)
- [ ] 📶 PWA / offline mode
- [ ] 🔒 Rate caching with expiry

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

---

## 📜 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

```
MIT License

Copyright (c) 2026 Ankit Parmanik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Ankit Parmanik**

- GitHub: [@ankitparmanik65-crypto](https://github.com/ankitparmanik65-crypto)
- Project: [Currency Converter App](https://github.com/ankitparmanik65-crypto/Currency-Converter-App)

**Built with ❤️ using pure HTML, CSS & JavaScript**

- 🌐 No frameworks · No build tools · No dependencies
- 🎯 Made for learning and real-world usage
- ⭐ If you found this useful, give it a star!

---

## 🙏 Acknowledgements

- [exchangerate-api](https://www.exchangerate-api.com/) — Free currency rates API
- [Shields.io](https://shields.io/) — For the badges
- Inspiration from modern fintech UI designs

---

<p align="center">
  <strong>💱 Happy Converting! 💱</strong>
</p>