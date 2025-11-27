import { getCookie } from "./cookie.js";
import { router } from "../utils/router.js";

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
