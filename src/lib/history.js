const STORAGE_KEY = "quiz_history";

export function getHistory() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addHistoryEntry(entry) {
  try {
    const current = getHistory();
    const updated = [entry, ...current].slice(0, 50);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    /* stockage indisponible, on ignore */
  }
}

export function clearHistory() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}