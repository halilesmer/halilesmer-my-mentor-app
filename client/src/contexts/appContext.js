import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const AppProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userLogIn, setUserLogIn] = useState("");
  const [userType, setUserType] = useState("");

  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);

  const navigate = useNavigate();

  const handlePwInputFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const token = localStorage.getItem("token");
  const [likes, setLikes] = useState("");
  // console.log("mentorsData: ", mentorsData);

  // -------- Check is User logged in starts ----------
  const isUsrLoggIn = () => {
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
    setUserType("");
    navigate("/");
  };
  // -------- Log out in ends ----------

  // ------- like a mentor -------- starts --
  const handleLikeClick = async (id) => {
    setLikes([...likes, id]);


    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        likes: likes,
      }),
      // redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5001/api/mentees/postLikes",
      requestOptions
    );
    const result = await response.json();
    console.log("result likes: ", result);
    setLikes([]);
  };
  // ------- like a mentor -------- ends --

  console.log("isUserLoggedIn: ", isUserLoggedIn);
  console.log("likes", likes);
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
        userType,
        setUserType,
        handleLikeClick,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
