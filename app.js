(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const state = { items: [], saved: new Set(), selected: null, busy: false };
  let loadVersion = 0;
  let toastTimer;
  const storageKey = "chetana-frontend-starter-saved-v1";
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(stored)) state.saved = new Set(stored.filter(id => typeof id === "string"));
  } catch (_) { /* Browser storage is optional. */ }
  function el(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }
  function notify(message) {
    clearTimeout(toastTimer);
    $("toast").textContent = message;
    $("toast").hidden = false;
    toastTimer = setTimeout(() => { $("toast").hidden = true; }, 2800);
  }
  function toggleSaved(id) {
    const wasSaved = state.saved.has(id);
    if (wasSaved) state.saved.delete(id); else state.saved.add(id);
    let persisted = true;
    try { localStorage.setItem(storageKey, JSON.stringify([...state.saved])); } catch (_) { persisted = false; }
    notify((wasSaved ? "Removed from saved items." : "Pattern saved.") + (persisted ? "" : " Saved for this session only."));
    render();
    if (state.selected) syncDialogButton();
  }
  function syncDialogButton() {
    const saved = state.saved.has(state.selected.id);
    $("dialog-save").textContent = saved ? "Remove from saved" : "Save pattern";
    $("dialog-save").setAttribute("aria-pressed", String(saved));
  }
  function openDetails(item) {
    state.selected = item;
    $("dialog-category").textContent = item.category;
    $("dialog-title").textContent = item.title;
    $("dialog-description").textContent = item.description;
    $("dialog-tip").textContent = item.tip;
    syncDialogButton();
    $("details").showModal();
  }
  function card(item) {
    const article = el("article", "card");
    const head = el("div", "card-head");
    const icon = el("span", "pattern-icon", item.icon);
    icon.setAttribute("aria-hidden", "true");
    head.append(icon, el("span", "category", item.category));
    const actions = el("div", "card-actions");
    const details = el("button", "detail-button", "View details ↗");
    details.type = "button";
    details.setAttribute("aria-label", "View details for " + item.title);
    details.addEventListener("click", () => openDetails(item));
    const saved = state.saved.has(item.id);
    const save = el("button", "save-button", saved ? "Saved ✓" : "Save");
    save.type = "button";
    save.setAttribute("aria-pressed", String(saved));
    save.setAttribute("aria-label", (saved ? "Remove saved " : "Save ") + item.title);
    save.addEventListener("click", () => {
      toggleSaved(item.id);
      const row = Array.from($("cards").children).find(node => node.dataset.item === item.id);
      const replacement = row ? row.querySelector(".save-button") : null;
      if (replacement) replacement.focus(); else $("saved-only").focus();
    });
    article.dataset.item = item.id;
    actions.append(details, save);
    article.append(head, el("h3", "", item.title), el("p", "", item.description), actions);
    return article;
  }
  function render() {
    const query = $("search").value.trim().toLowerCase();
    const category = $("category").value;
    const filtered = state.items.filter(item => (!query || (item.title + " " + item.description).toLowerCase().includes(query)) &&
      (category === "all" || item.category === category) && (!$("saved-only").checked || state.saved.has(item.id)));
    $("cards").replaceChildren(...filtered.map(card));
    $("total-count").textContent = String(state.items.length);
    $("saved-count").textContent = String(state.items.filter(item => state.saved.has(item.id)).length);
    const available = !state.busy && $("error").hidden;
    $("empty").hidden = !available || filtered.length > 0;
    $("result-message").textContent = available ? filtered.length + " of " + state.items.length + " patterns" : "";
  }
  function resetFilters() {
    $("search").value = "";
    $("category").value = "all";
    $("saved-only").checked = false;
    render();
    $("search").focus();
  }
  async function load() {
    const version = ++loadVersion;
    state.busy = true;
    state.items = [];
    $("cards").setAttribute("aria-busy", "true");
    $("loading").hidden = false;
    $("error").hidden = true;
    $("empty").hidden = true;
    $("refresh").disabled = true;
    const mode = FrontendAPI.config.mode;
    $("mode-badge").textContent = mode === "demo" ? "Demo · mock data" : mode === "live" ? "Live · API mode" : "API mode needs setup";
    render();
    try {
      const items = await FrontendAPI.listItems();
      if (version !== loadVersion) return;
      state.items = items;
      const previousCategory = $("category").value;
      const categories = [...new Set(items.map(item => item.category))].sort();
      const options = [el("option", "", "All categories"), ...categories.map(value => el("option", "", value))];
      options[0].value = "all";
      categories.forEach((value, index) => { options[index + 1].value = value; });
      $("category").replaceChildren(...options);
      $("category").value = categories.includes(previousCategory) ? previousCategory : "all";
    } catch (error) {
      if (version !== loadVersion) return;
      $("error-text").textContent = error.message || "Check your connection and backend configuration.";
      $("error").hidden = false;
    } finally {
      if (version === loadVersion) {
        state.busy = false;
        $("loading").hidden = true;
        $("refresh").disabled = false;
        $("cards").setAttribute("aria-busy", "false");
        render();
      }
    }
  }
  $("search").addEventListener("input", render);
  $("category").addEventListener("change", render);
  $("saved-only").addEventListener("change", render);
  $("reset").addEventListener("click", resetFilters);
  $("empty-reset").addEventListener("click", resetFilters);
  $("refresh").addEventListener("click", load);
  $("retry").addEventListener("click", load);
  $("close-dialog").addEventListener("click", () => $("details").close());
  $("details").addEventListener("close", () => {
    const selected = state.selected;
    state.selected = null;
    const row = selected && Array.from($("cards").children).find(node => node.dataset.item === selected.id);
    if (row) row.querySelector(".detail-button").focus(); else $("search").focus();
  });
  $("dialog-save").addEventListener("click", () => { if (state.selected) toggleSaved(state.selected.id); });
  load();
})();