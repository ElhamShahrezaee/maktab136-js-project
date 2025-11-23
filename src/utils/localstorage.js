// localStorage-utils.js

/**
 * Save a value to localStorage (auto-stringify)
 */
export function setItemLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("localStorage setItem error:", err);
  }
}

/**
 * Read a value from localStorage (auto-parse)
 */
export function getItemLocalStorage(key) {
  try {
    const raw_value = localStorage.getItem(key);
    return raw_value ? JSON.parse(raw_value) : null;
  } catch (err) {
    console.error("localStorage getItem error:", err);
    return null;
  }
}

/**
 * Remove one key from localStorage
 */
export function removeItemLocalStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("localStorage removeItem error:", err);
  }
}

/**
 * Clear all localStorage
 */
export function clearAllLocalStorage() {
  try {
    localStorage.clear();
  } catch (err) {
    console.error("localStorage clear error:", err);
  }
}
