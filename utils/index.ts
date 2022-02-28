import JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../pages/api/graphql/signature";

export const getUserInfoFromToken = async (cookie: string) => {
	console.log({cookie});
	const token = getCookie("nekot",cookie);
	 

	try {
		return JWT.verify(token, JSON_SIGNATURE) as {
			userId: string;
		};
	} catch (err) {
		return null;
	}  
};

export const  setCookie = (cname:string, cvalue:string, exdays:number)=> {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}

export const getCookie =(cname:string,cookies:string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(cookies);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}