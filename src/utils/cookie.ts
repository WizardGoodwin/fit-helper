export const setCookie = (key: string, value: string, time?: number): void => {
  const d: Date = new Date();
  let expires: string = '';
  // if time was set, the const cookie with expiration time, else session cookie
  if (time) {
    d.setTime(d.getTime() + time);
    expires = 'expires=' + d.toUTCString();
  }
  document.cookie = key + '=' + value + ';' + expires + ';path=/';
};

export const getCookie = (key: string): null | string => {
  const name: string = key + '=';
  const decodedCookie: string = decodeURIComponent(document.cookie);
  const cookieArr: string[] = decodedCookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    let c: string = cookieArr[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};

export const clearCookies = (): void => {
  const cookies: string[] = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie: string = cookies[i];
    const eqPos: number = cookie.indexOf('=');
    const name: string = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
  }
};

export const isUserLoggedIn = () => !!getCookie('fitHelperToken');
