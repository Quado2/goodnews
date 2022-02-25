import { useState, createContext } from "react";

export const Context = createContext();

export default function ContextProvider(props) {
  const [clicked, setClicked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Context.Provider value={{ clicked, setClicked, loggedIn, setLoggedIn }}>
      {props.children}
    </Context.Provider>
  );
}
