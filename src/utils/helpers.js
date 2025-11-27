import { getCookie } from "./cookie.js";
import { router } from "../utils/router.js";
import { RecentSearchValues } from "../constants/params.js";
import {
  getItemLocalStorage,
  setItemLocalStorage,
  removeItemLocalStorage,
} from "./localstorage.js";

export function getTimeOfDay() {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 12) {
    return "Morning";
  } else if (hours >= 12 && hours < 18) {
    return "Afternoon";
  } else if (hours >= 18 && hours < 22) {
    return "Night";
  } else {
    return "Late Night";
  }
}

export function checkToken() {
  const token = getCookie("token");
  if (!token) {
    router.navigate("/auth/login");
  }
  return;
}

export function truncateName(str) {
  return str.length > 15 ? str.substring(0, 15) + "..." : str;
}

export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function loadRecentSearches() {
  return JSON.parse(getItemLocalStorage(RecentSearchValues) || "[]");
}

export function saveRecentSearch(value) {
  if (!value) return;
  let items = loadRecentSearches();

  // remove duplicates
  items = items.filter((x) => x !== value);
  items.unshift(value); // add to start
  // if (items.length > 10) items.pop(); // keep max 10

  setItemLocalStorage(RecentSearchValues, JSON.stringify(items));
}

export function clearAllRecent() {
 removeItemLocalStorage(RecentSearchValues);
}
export function removeRecent(value) {
  let items = loadRecentSearches();
  items = items.filter((x) => x !== value);
  setItemLocalStorage(RecentSearchValues, JSON.stringify(items));
}