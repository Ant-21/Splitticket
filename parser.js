// Zet geplakte tekst van een kassaticket om naar lijnen: { title, items:[{name, qty, unitPrice}], total }.
// Werkt met tekst uit iPhone Live Text. Kijk het resultaat altijd na: tickets zien er overal anders uit.
(function (root) {
  const PRICE = /(-?\d{1,4}[.,]\d{2})(?!\d)/g;
  const TOTAL = /\b(totaal|total|te betalen|a payer|à payer|som)\b/i;
  const SKIP = /(subtot|btw|tva|vat|excl|incl|bancontact|payconiq|wero|visa|maestro|mastercard|kaart|carte|cash|contant|wissel|terug|rendu|betaald|change|tafel|table|datum|date|tijd|heure|kassa|caisse|ticket|bon nr|factuur|bedankt|merci|thank|tot ziens|couvert|personen|ober|serveur|server|fooi|tip|tel\b|www\.|ondernemingsnr|btw-nr|\bbe ?0\d{3})/i;

  const num = s => parseFloat(s.replace(",", "."));
  const r2 = n => Math.round((n + Number.EPSILON) * 100) / 100;

  function splitQty(rest) {
    let m = rest.match(/^(\d{1,2})\s*[xX×*]?\s+(.*\S)$/) || rest.match(/^(\d{1,2})\s*[xX×*]\s*(.*\S)$/);
    if (m) return { qty: parseInt(m[1], 10), name: m[2] };
    m = rest.match(/^(.*\S)\s+(\d{1,2})\s*[xX×*]?$/);
    if (m && /[a-zA-Zà-ÿ]/.test(m[1])) return { qty: parseInt(m[2], 10), name: m[1] };
    return { qty: 1, name: rest };
  }
  const tidy = s => s.replace(/€|EUR\b/gi, " ").replace(/^[\s.:\-–*]+|[\s.:\-–*]+$/g, "").replace(/\s+/g, " ").trim();

  function parseReceipt(text) {
    const lines = String(text || "").split(/\r?\n/).map(l => l.replace(/\s+/g, " ").trim()).filter(Boolean);
    let title = "", total = 0;
    const items = [], names = [], prices = [];
    for (const line of lines) {
      const ps = [...line.matchAll(PRICE)].map(m => num(m[1]));
      if (TOTAL.test(line) && !/subtot/i.test(line)) { if (ps.length) total = ps[ps.length - 1]; continue; }
      if (SKIP.test(line)) continue;
      const rest = tidy(line.replace(PRICE, " ").replace(/\s[xX×*]\s/g, " x "));
      if (!ps.length) {
        if (!/[a-zA-Zà-ÿ]{2,}/.test(rest)) continue;
        if (!title && !items.length && !names.length) title = rest; else names.push(splitQty(rest));
        continue;
      }
      const { qty: q0, name } = splitQty(rest);
      const lineTotal = ps[ps.length - 1];
      let qty = q0;
      if (ps.length >= 2 && ps[0] !== 0) {
        const guess = Math.round(lineTotal / ps[0]);
        if (qty === 1 && guess > 1 && Math.abs(guess * ps[0] - lineTotal) < 0.02) qty = guess;
      }
      if (!/[a-zA-Zà-ÿ]{2,}/.test(name)) { prices.push({ qty, lineTotal }); continue; }
      items.push({ name: tidy(name).slice(0, 60), qty, unitPrice: r2(lineTotal / qty) });
    }
    // Live Text zet kolommen soms onder elkaar: eerst alle namen, dan alle prijzen.
    if (names.length && prices.length) {
      const n = Math.min(names.length, prices.length);
      for (let i = 0; i < n; i++) {
        const qty = names[i].qty > 1 ? names[i].qty : prices[i].qty;
        items.push({ name: tidy(names[i].name).slice(0, 60), qty, unitPrice: r2(prices[i].lineTotal / qty) });
      }
    }
    return { title: title.slice(0, 60), items: items.filter(i => i.name && i.unitPrice !== 0), total };
  }

  root.parseReceipt = parseReceipt;
  if (typeof module !== "undefined") module.exports = { parseReceipt };
})(typeof window !== "undefined" ? window : globalThis);
