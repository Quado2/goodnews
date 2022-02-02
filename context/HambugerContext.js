import { useState, createContext } from "react";

export const HambugerContext = createContext();

export default function HambugerContextProvider(props){
  const [clicked, setClicked] = useState(false);
  

  return (
    <HambugerContext.Provider value={{clicked, setClicked}}>
      {props.children}
    </HambugerContext.Provider>
  )

}