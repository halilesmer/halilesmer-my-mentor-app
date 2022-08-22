import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userLogIn, setUserLogIn] = useState("");

  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);

  
  const handlePwInputFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  // console.log("mentorsData: ", mentorsData);
  console.log("isUserLoggedIn: ", isUserLoggedIn);

  return (
    <AppContext.Provider
      value={{
        url,
        onBlur,
        handlePwInputFocus,
        focused,
        isUserLoggedIn,
        setIsUserLoggedIn,
        userLogIn,
        setUserLogIn,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
