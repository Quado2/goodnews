import { useState, createContext } from "react";

export const Context = createContext();

export default function ContextProvider(props) {
  const [clicked, setClicked] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [showDashboard, setShowDashboard] = useState(false)

  return (
    <Context.Provider value={{ clicked, setClicked, loggedInUser, setLoggedInUser, showDashboard, setShowDashboard, }}>
      {props.children}
    </Context.Provider>
  );
}
