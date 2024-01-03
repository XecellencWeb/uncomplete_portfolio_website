export function getCookie(cookieName) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null; // Cookie not found
}

  export function setCookie(name, value, maxAge) {
    document.cookie = `${name}=${value}; maxAge=${maxAge || 2.592e+8}; path=/;`;
  }

  export function deleteCookie(name) {
    document.cookie = `${name}=;max-age=0;path=/;`;
  }