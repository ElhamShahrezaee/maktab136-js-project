export function setCookie(name, value, expireTimestamp = null) {
  let cookieString = `${name}=${value}; path=/`;

  if (expireTimestamp) {
    const exp = new Date(expireTimestamp);
    cookieString += `; expires=${exp.toUTCString()}`;
  }

  document.cookie = cookieString;
}

export function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`;
}
