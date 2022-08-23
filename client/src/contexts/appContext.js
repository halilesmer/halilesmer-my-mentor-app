import { createContext, useEffect, useState } from "react";

import { getToken } from "../utils/getToken";

const AppContext = createContext();

const AppProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userLogIn, setUserLogIn] = useState("");

  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);

  const handlePwInputFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  // console.log("mentorsData: ", mentorsData);

  // -------- Check is User logged in starts ----------
  const isUsrLoggIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  };
  useEffect(() => {
    isUsrLoggIn();
  }, [isUserLoggedIn]);
  // -------- Check is User logged in ends ----------
  
  // -------- Log out in starts ----------
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setIsUserLoggedIn(false);
  };
  // -------- Log out in ends ----------
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
        handleLogoutClick,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
