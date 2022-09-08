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
  const [allComments, setAllComments] = useState(null);
  const [allMentorsData, setAllMentorsData] = useState(null);

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

  // ------ Get Mentees Profile Data -------- starts ---
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
  // ------ Get Mentees Profile Data -------- ends ---

  // ------- Get All Mentors -------------------//
  const getAllMentorsData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/mentors/allmentors"
      );
      const result = await response.json();
      // console.log("result: ", result);
      // setMentorsProfile(result)
      setAllMentorsData(result);
      setUserType("mentor");
    } catch (error) {
      console.log("error getting prifile data: ", error);
    }
  };
  useEffect(() => {

      let didCancel = false;
      if (!didCancel) {
        getAllMentorsData();
      }
      return () => (didCancel = true);
  }, []);
  // ------- Get All Mentors -------------------//

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
  const handlePostLikeClick = async (id) => {
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mentorId: id,
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

  // ------- Get All Comments -------- starts --
  const getAllComments = async () => {
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
          "http://localhost:5001/api/comments/getAllComments",
          requestOptions
        );
        const result = await response.json();
        console.log("All Comments: ", result);
        setAllComments(result);
      } catch (error) {
        console.log("error getting all comments: ", error);
      }
    }
  };
  useEffect(() => {
    if(token){

    let didCancel = false;
    if (!didCancel) {
      getAllComments();
    }
    return () => (didCancel = true);
  }
  }, []);
  // ------- Get All Comments -------- ends --

  // console.log("isUserLoggedIn: ", isUserLoggedIn);
  // console.log("likes", likes);
  // console.log("decodedToken: ", decodedToken);
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
        handlePostLikeClick,
        getMenteeData,
        menteesData,
        likes,
        getAllComments,
        getMentorsProfile,
        mentorsProfile,
        decodedToken,
        allMentorsData,
        getAllMentorsData,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
