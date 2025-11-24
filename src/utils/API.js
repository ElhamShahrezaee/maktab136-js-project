import { api_address } from "../constants/params.js";
import { setCookie } from "./cookie.js";

export async function loginAPI(username, password) {
  const res = await fetch(`${api_address}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) throw data;
  setCookie("token", data.token);
  return data;
}

export async function signupAPI(username, password) {
  const res = await fetch(`${api_address}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  console.log(data);
  if (!res.ok) throw data;

  setCookie("token", data.token);
  return data;
}
