import { useState, createContext } from "react";

export const Context = createContext();

export default function ContextProvider(props) {
  const [clicked, setClicked] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <Context.Provider value={{ clicked, setClicked, loggedInUser, setLoggedInUser }}>
      {props.children}
    </Context.Provider>
  );
}
