import JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../pages/api/graphql/signature";

export const getUserInfoFromToken = async (token: string) => {
  //	const token = getCookie("nekot",cookie);

  try {
    return JWT.verify(token, JSON_SIGNATURE) as {
      userId: string;
    };
  } catch (err) {
    return null;
  }
};

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export function deleteCookie(name: string) {
  {
    document.cookie =
      name + "=" + ";path=/" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

export function eraseCookie(name:string) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}

export const getCookie = (cname: string, cookies: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(cookies);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getDate(dateInt: number) {
  const date = new Date(dateInt);
  const year = date.getFullYear();
  const month = monthList[date.getUTCMonth()];
  const day = date.getUTCDate();

  return `${day} ${month} ${year}`;
}
