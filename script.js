(function () {
  // ----- CONFIG -----
  const API_BASE = "https://open.er-api.com/v6/latest/";
  const MAX_HISTORY = 5;

  // ----- DOM -----
  const amountInput = document.getElementById("amountInput");
  const fromSelect = document.getElementById("fromCurrency");
  const toSelect = document.getElementById("toCurrency");
  const swapBtn = document.getElementById("swapBtn");
  const convertBtn = document.getElementById("convertBtn");
  const resultValueEl = document.getElementById("resultValue");
  const resultCurrencyLabel = document.getElementById("resultCurrencyLabel");
  const exchangeRateInfo = document.getElementById("exchangeRateInfo");
  const updateStatus = document.getElementById("updateStatus");
  const errorMsg = document.getElementById("errorMsg");
  const themeToggle = document.getElementById("themeToggle");
  const copyBtn = document.getElementById("copyBtn");
  const historyList = document.getElementById("historyList");
  const clearHistory = document.getElementById("clearHistory");

  // ----- STATE -----
  let currentRates = {};
  let currentBase = "USD";
  let isLoading = false;
  let lastFetchTime = null;
  let history = JSON.parse(localStorage.getItem("cc_history") || "[]");

  // ----- HELPERS -----
  function showError(msg) { errorMsg.textContent = msg || ""; }
  function clearError() { errorMsg.textContent = ""; }

  function setLoading(loading) {
    isLoading = loading;
    if (loading) {
      updateStatus.innerHTML = 'updating <span class="loader"></span>';
      convertBtn.disabled = true;
    } else {
      updateStatus.textContent = lastFetchTime
        ? "updated " + lastFetchTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "ready";
      convertBtn.disabled = false;
    }
  }

  function formatCurrency(value) {
    if (value === undefined || value === null || isNaN(value)) return "0.00";
    if (value > 0 && value < 0.01) return value.toFixed(6);
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function populateSelects(list, selFrom = "USD", selTo = "EUR") {
    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";
    list.forEach((code) => {
      const o1 = document.createElement("option");
      o1.value = code; o1.textContent = code;
      if (code === selFrom) o1.selected = true;
      fromSelect.appendChild(o1);

      const o2 = document.createElement("option");
      o2.value = code; o2.textContent = code;
      if (code === selTo) o2.selected = true;
      toSelect.appendChild(o2);
    });
    if (!list.includes(selFrom) && list.length) fromSelect.value = list[0];
    if (!list.includes(selTo) && list.length) toSelect.value = list[0];
  }

  // ----- CONVERT (only on button click) -----
  function convert() {
    clearError();

    let amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount < 0) {
      amount = 0;
      amountInput.value = "0";
    }

    if (amount === 0) {
      showError("Please enter a valid amount greater than 0.");
      return;
    }

    const from = fromSelect.value;
    const to = toSelect.value;

    if (!currentRates || Object.keys(currentRates).length === 0) {
      showError("Rates not loaded yet. Please wait...");
      return;
    }

    // Convert to base
    let amountInBase;
    if (from === currentBase) amountInBase = amount;
    else {
      const fromRate = currentRates[from];
      if (!fromRate) { showError(`Rate for ${from} not available.`); return; }
      amountInBase = amount / fromRate;
    }

    // Convert base to target
    let converted;
    if (to === currentBase) converted = amountInBase;
    else {
      const toRate = currentRates[to];
      if (!toRate) { showError(`Rate for ${to} not available.`); return; }
      converted = amountInBase * toRate;
    }

    // Update result
    resultValueEl.firstChild.textContent = formatCurrency(converted);
    resultCurrencyLabel.textContent = to;

    // Update rate info
    let oneRate;
    if (from === currentBase) oneRate = currentRates[to] || 0;
    else if (to === currentBase) oneRate = 1 / currentRates[from];
    else {
      const fr = currentRates[from], tr = currentRates[to];
      oneRate = fr && tr ? tr / fr : 0;
    }
    exchangeRateInfo.textContent = oneRate && isFinite(oneRate)
      ? `1 ${from} = ${oneRate.toFixed(4)} ${to}`
      : `1 ${from} = ? ${to}`;

    // Save to history
    addHistory(`${amount} ${from} → ${formatCurrency(converted)} ${to}`);
  }

  // ----- HISTORY -----
  function addHistory(text) {
    const entry = {
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    history.unshift(entry);
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem("cc_history", JSON.stringify(history));
    renderHistory();
  }

  function renderHistory() {
    if (!history.length) {
      historyList.innerHTML =
        '<div class="history-item" style="opacity:0.5;justify-content:center;">No conversions yet</div>';
      return;
    }
    historyList.innerHTML = history
      .map(
        (h) => `
        <div class="history-item">
          <span>${h.text}</span>
          <span class="time">${h.time}</span>
        </div>`
      )
      .join("");
  }

  clearHistory.addEventListener("click", () => {
    history = [];
    localStorage.removeItem("cc_history");
    renderHistory();
  });

  // ----- FETCH RATES -----
  async function fetchRates(base = "USD") {
    if (isLoading) return;
    setLoading(true);
    clearError();

    try {
      const res = await fetch(`${API_BASE}${base}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.result !== "success") throw new Error(data.error || "Failed");

      currentRates = data.rates;
      currentBase = data.base_code;
      lastFetchTime = new Date();

      const codes = Object.keys(currentRates).sort();
      const selFrom = fromSelect.value || "USD";
      const selTo = toSelect.value || "EUR";
      populateSelects(codes, selFrom, selTo);

      const t = lastFetchTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      updateStatus.textContent = `updated ${t}`;
      convertBtn.disabled = false;
    } catch (err) {
      console.error(err);
      showError(`Failed to load rates: ${err.message}. Using fallback.`);
      if (!currentRates || Object.keys(currentRates).length === 0) {
        currentRates = {
          USD: 1, EUR: 0.92, GBP: 0.79, JPY: 151.2, CAD: 1.36,
          AUD: 1.52, CHF: 0.90, CNY: 7.24, INR: 83.3, BRL: 5.05,
          MXN: 16.8, SGD: 1.34, HKD: 7.82, NZD: 1.64, SEK: 10.6,
          NOK: 10.8, KRW: 1350, TRY: 32.2, RUB: 92.5, ZAR: 18.7,
          DKK: 6.86, PLN: 4.02, TWD: 32.1, THB: 36.5, AMD: 390,
          CVE: 102, AED: 3.67, SAR: 3.75, PKR: 278,
        };
        currentBase = "USD";
        populateSelects(Object.keys(currentRates).sort(), "USD", "EUR");
        updateStatus.textContent = "fallback rates";
      }
    } finally {
      setLoading(false);
    }
  }

  // ----- EVENTS -----
  // Convert button click
  convertBtn.addEventListener("click", convert);

  // Enter key on amount input
  amountInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") convert();
  });

  // Swap currencies
  swapBtn.addEventListener("click", () => {
    const a = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = a;
  });

  // Quick amount buttons (only fill input, no convert)
  document.querySelectorAll(".quick-amounts button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.dataset.amount;
      amountInput.value = val === "max" ? 1000000 : val;
      amountInput.focus();
    });
  });

  // Copy result
  copyBtn.addEventListener("click", async () => {
    const text = `${resultValueEl.firstChild.textContent} ${resultCurrencyLabel.textContent}`;
    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "✅";
      setTimeout(() => (copyBtn.textContent = "📋"), 1200);
    } catch {
      showError("Copy failed");
    }
  });

  // Theme toggle
  const savedTheme = localStorage.getItem("cc_theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  }
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("cc_theme", isLight ? "light" : "dark");
  });

  // Double-click status to refresh
  updateStatus.addEventListener("dblclick", () => fetchRates("USD"));

  // ----- INIT -----
  async function init() {
    const defaults = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "AMD", "CVE"];
    populateSelects(defaults, "USD", "EUR");
    renderHistory();
    await fetchRates("USD");
  }

  init();
})();