import { createContext, useEffect, useState } from "react";

import { getToken } from "../utils/getToken";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const AppProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userLogIn, setUserLogIn] = useState("");
  const [userType, setUserType] = useState("");
  const [menteesData, setMenteesData] = useState(null);
  const [mentorsProfile, setMentorsProfile] = useState(null);
  const [error, setError] = useState(null);
  const [decodedToken, setDecodedToken] = useState("");

  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);

  const navigate = useNavigate();

  const handlePwInputFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const token = localStorage.getItem("token");
  const [likes, setLikes] = useState(null);

  // -------- Check is User logged in starts ----------
  useEffect(() => {
    if (token) {
      const decodeToken = jwt_decode(token);
      setDecodedToken(decodeToken);
    } else {
      setDecodedToken("");
    }
  }, []);

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

  // ------ Get Mentee Data -------- starts ---
  const getMenteeData = async () => {
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5001/api/mentees/menteesprofile",
          requestOptions
        );
        const result = await response.json();
        setMenteesData(result);
        setUserType(result.user_type);
        console.log("result: ", result);
      } catch (error) {
        console.log("error getting prifile data: ", error);
      }
    }
  };
  // useEffect(() => {
  //   getMenteeData();
  // }, []);
  // ------ Get Mentee Data -------- ends ---

  // ------ Get Mentor Data -------- starts ---
  const getMentorsProfile = async () => {
    const token = getToken();
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:5001/api/mentors/mentorsprofile",
          requestOptions
        );
        const result = await response.json();
        setMentorsProfile(result);
        setUserType(result.user_type);
        console.log("result: ", result);
      } catch (error) {
        setError(true);
        console.log("error getting prifile data: ", error);
      }
    }
    console.log("token: ", token);
  };
  // ------ Get Mentor Data -------- starts ---

  // ------- like a mentor -------- starts --
  const handleLikeClick = async (id) => {
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify( {filter}),
      body: JSON.stringify({
        mentorId: id,

        // likes: { mentor_id: id },
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/mentees/postLikes",
        requestOptions
      );
      const result = await response.json();
      setMenteesData(result.mentee);

      console.log("result likes: ", result);
      // getMenteeData();
      // setLikes(!true)
    } catch (error) {
      console.log("error like mentor: ", error);
    }
  };
  // ------- like a mentor -------- ends --

  // console.log("isUserLoggedIn: ", isUserLoggedIn);
  // console.log("likes", likes);
  console.log("decodedToken: ", decodedToken);
  // console.log("menteesData", menteesData && menteesData);
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
        getMenteeData,
        menteesData,
        likes,
        getMentorsProfile,
        mentorsProfile,
        decodedToken,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
