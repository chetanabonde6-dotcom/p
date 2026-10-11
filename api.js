/* Explicit demo/live API boundary. No secrets belong in browser code. */
(function (root) {
  "use strict";
  const config = { mode: "demo", baseUrl: "", timeoutMs: 8000 };
  const mockItems = [
    { id: "search", title: "Search & filters", category: "Interaction", icon: "↗", description: "Help users find what matters, without scrolling through everything.", tip: "Map these controls to your actual data. Keep the search and filter selection visible, and show a useful no-results message." },
    { id: "forms", title: "Forms & validation", category: "Interaction", icon: "＋", description: "Guide users from their input to a clear next step.", tip: "Build only the fields required by your problem statement. Add real labels, validation messages, submission feedback, and a retry path." },
    { id: "results", title: "Results & details", category: "Data", icon: "▤", description: "Turn a list of results into information people can act on.", tip: "Use an agreed API response. Highlight the relevant details, and connect the primary action to a real result or a clearly labelled mock flow." },
    { id: "saved", title: "Saved items", category: "Interaction", icon: "♡", description: "Let users keep the items they want to revisit.", tip: "This starter saves bookmarks on this browser when storage is allowed. Use backend persistence only if your requirements need accounts or cross-device access." },
    { id: "states", title: "API status handling", category: "Data", icon: "↻", description: "Make loading, failures, and retry understandable.", tip: "Keep loading, empty, and error states separate. Failed live requests should show an error, not a fabricated success from demo data." },
    { id: "mobile", title: "Responsive layout", category: "Design", icon: "◫", description: "Keep the important action easy to use on every screen.", tip: "Check the actual layout on the presentation laptop and a phone width. Keep readable text, visible focus, clear spacing, and usable touch targets." }
  ];
  function validateItems(data) {
    if (!Array.isArray(data)) throw new Error("The API must return an array of items.");
    const ids = new Set();
    return data.map(item => {
      if (!item || !["id", "title", "category", "description", "tip"].every(key => typeof item[key] === "string" && item[key].trim())) {
        throw new Error("An API item is missing required text fields: id, title, category, description, tip.");
      }
      if (ids.has(item.id)) throw new Error("The API returned duplicate item IDs.");
      ids.add(item.id);
      return { id: item.id, title: item.title, category: item.category, description: item.description, tip: item.tip, icon: typeof item.icon === "string" ? item.icon : "↗" };
    });
  }
  async function listItems() {
    if (config.mode === "demo") {
      await new Promise(resolve => setTimeout(resolve, 180));
      return validateItems(mockItems);
    }
    if (config.mode !== "live") throw new Error("Choose an explicit API mode: demo or live.");
    if (!config.baseUrl) throw new Error("Live mode needs an API base URL in api.js.");
    const endpoint = new URL(config.baseUrl.replace(/\/$/, "") + "/items");
    if (!["http:", "https:"].includes(endpoint.protocol)) throw new Error("The live API requires an HTTP or HTTPS URL.");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.timeoutMs);
    try {
      const response = await root.fetch(endpoint.href, { signal: controller.signal, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("The live API returned HTTP " + response.status + ". Check the backend and try again.");
      return validateItems(await response.json());
    } catch (error) {
      if (error.name === "AbortError") throw new Error("The live API timed out. Check the backend and try again.");
      throw error;
    } finally { clearTimeout(timer); }
  }
  root.FrontendAPI = { config, listItems, validateItems };
})(typeof window === "undefined" ? globalThis : window);