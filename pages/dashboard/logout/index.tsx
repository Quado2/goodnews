import { useLayoutEffect, useEffect, useContext } from "react";
import Router from "next/router";
import { deleteCookie } from "../../../utils";
import { Context } from "../../../context/Context";

export default function Logout(){

  const {setLoggedInUser}  = useContext(Context)

  useEffect(() => {
    deleteCookie("nekot");
    setLoggedInUser({});
    Router.push("/membership")
    
  },[setLoggedInUser])

  return (<div>Logging out</div>)
}
