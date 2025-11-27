import { api_address } from "../constants/params.js";
import { setCookie, getCookie } from "./cookie.js";
import { setItemLocalStorage } from "./localstorage.js";
export async function loginAPI(username, password) {
  const res = await fetch(`${api_address}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (!res.ok) throw data;
  setCookie("token", data.token);
  setItemLocalStorage("username", data.user.username);
  return data;
}

export async function signupAPI(username, password) {
  const res = await fetch(`${api_address}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw data;

  setCookie("token", data.token);
  setItemLocalStorage("username", data.user.username);

  return data;
}

export async function getBrands() {
  const token = getCookie("token");
  const res = await fetch(`${api_address}/sneaker/brands`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 403) {
    window.location.href = "/auth/login";
    return;
  }
  return res.json();
}

export async function getProductsAPI({ brand, page = 1, limit = 10, search }) {
  const token = getCookie("token");
  if (!token) {
    window.location.href = "/auth/login";
    return;
  }

  const url = new URL(api_address + "/sneaker");

  // Add query params
  if (brand && brand !== "All") url.searchParams.append("brands", brand);
  if (search) url.searchParams.append("search", search);
  url.searchParams.append("page", page);
  url.searchParams.append("limit", limit);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (res.status === 403) {
    window.location.href = "/auth/login";
    return;
  }

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data

}
