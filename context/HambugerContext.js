import { useState, createContext } from "react";

export const HambugerContext = createContext();

export default function HambugerContextProvider(props){
  const [clicked, setClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  

  return (
    <HambugerContext.Provider value={{clicked, setClicked,loggedIn, setLoggedIn}}>
      {props.children}
    </HambugerContext.Provider>
  )

}