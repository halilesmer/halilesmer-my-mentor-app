import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = (props) => {
  const [url, setUrl] = useState("");

  return (
    <AppContext.Provider value={url}>{props.children}</AppContext.Provider>
  );
};
export { AppContext, AppProvider };
