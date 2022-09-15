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
  const [loader, setLoader] = useState(false);
  const [globalToken] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");

  const [url] = useState("");
  const [focused, setFocused] = useState(false);

  const navigate = useNavigate();

  const handlePwInputFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const token = localStorage.getItem("token");
  const [likes] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  // -------- Check is User logged in starts ----------
  useEffect(() => {
    if (token) {
      const decodeToken = jwt_decode(token);
      setDecodedToken(decodeToken);
    } else {
      setDecodedToken("");
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [isUserLoggedIn]);
  // -------- Check is User logged in ends ----------

  // -------- Log out in starts ----------
  const handleLogoutClick = () => {
    console.log("Logout func");
    localStorage.removeItem("token");
    setIsUserLoggedIn(false);
    setUserType("");
    navigate("/");
  };
  // -------- Log out in ends ----------

  // ------ Get Mentees Profile Data -------- starts ---
  const getMenteeData = async () => {
    // setLoader(true);
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
        console.log("result, getMenteeData: ", result);
        setLoader(false);
      } catch (error) {
        console.log("error getting prifile data: ", error);
        setLoader(false);
      }
    }
  };
  // ------ Get Mentees Profile Data -------- ends ---

  // ------- Get All Mentors -------------------//
  const getAllMentorsData = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        "http://localhost:5001/api/mentors/allmentors"
      );
      const result = await response.json();
      console.log("getAllMentorsData: ", result);
      // setMentorsProfile(result)
      setAllMentorsData(result);
      setUserType("mentor");
      setLoader(false);
    } catch (error) {
      console.log("error getting prifile data: ", error);
      setLoader(false);
    }
  };

  // ------ Get Mentor Data -------- starts ---
  const getMentorsProfile = async () => {
    // setLoader(true);
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
        console.log("result, getMentorsProfile:", result);
        setLoader(false);
      } catch (error) {
        setError(true);
        console.log("error getting prifile data: ", error);
        setLoader(false);
      }
    }
  };
  // ------ Get Mentor Data -------- starts ---

  // ------- like a mentor -------- starts --
  const handlePostLikeClick = async (id) => {
    // setLoader(true);
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
      setLoader(false);
    } catch (error) {
      console.log("error like mentor: ", error);
      setLoader(false);
    }
  };
  // ------- like a mentor -------- ends --

  // ------- Get All Comments -------- starts --
  const getAllComments = async () => {
    // setLoader(true);
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
        setLoader(false);
      } catch (error) {
        console.log("error getting all comments: ", error);
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    if (token) {
      let didCancel = false;
      if (!didCancel) {
        // getAllComments();
        // getAllMentorsData();
      }
      return () => (didCancel = true);
    }
    // eslint-disable-next-line
  }, []);
  // ------- Get All Comments -------- ends --

  // console.log("isUserLoggedIn: ", isUserLoggedIn);
  // console.log("mentorsProfile", mentorsProfile);
  // console.log("decodedToken: ", decodedToken);
  // console.log("menteesData", menteesData && menteesData);
  // console.log('token', token)
  console.log("openSnackBar: ", openSnackBar);
  // console.log('allMentorsData,',allMentorsData,)
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
        loader,
        setLoader,
        globalToken,
        openSnackBar,
        setOpenSnackBar,
        openDialog,
        setOpenDialog,
        snackBarText,
        setSnackBarText,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
