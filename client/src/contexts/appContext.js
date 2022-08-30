import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const AppProvider = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userLogIn, setUserLogIn] = useState("");
  const [userType, setUserType] = useState("");
  const [menteesData, setMenteesData] = useState(null);

  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);

  const navigate = useNavigate();

  const handlePwInputFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const token = localStorage.getItem("token");
  const [likes, setLikes] = useState(null);
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
        console.log("result: ", result);
        setMenteesData({
          id: result.id,
          first_name: result.first_name,
          last_name: result.last_name,
          birthday: result.birthday,
          gender: result?.gender,
          language: result.language,
          couching_medium: result.couching_medium,
          skills: result.skills,
          about: result.about,
          email: result.email,
          password: "",
          user_type: result.user_type,
          likes: result.likes,
          avatar_picture: result.avatar_picture,
        });

        // setMenteesData(result)
      } catch (error) {
        console.log("error getting prifile data: ", error);
      }
    }
  };
  useEffect(() => {
    getMenteeData();
  }, []);
  // ------ Get Mentee Data -------- ends ---

  // ------- like a mentor -------- starts --
  const handleLikeClick = async (id) => {

    console.log("Mentor id: ", id);
    setLikes([...menteesData.likes, { mentor_id: id }]);

    // const previousLikes =
    // menteesData.likes &&
    // menteesData.likes.filter((prev) => {
    //   console.log("prev.id: ", prev.id);
    //   console.log("likes: ", likes);
    //   console.log("prev.id !== id: ", prev.id !== id);
    //     return prev.id !== id && filter.push(id);
    //   });
    // console.log("previousLikes: ", previousLikes);
    // // const addRemoveLikes = previousLikes.filter(prev => prev !== id )
    // // console.log("addRemoveLikes: ", addRemoveLikes);
    // setLikes([...likes, { mentor_id: id }]);
    // setLikes(previousLikes);
    console.log("likes", likes);

    console.log("mentor_id: id : ", id);
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify( {filter}),
      body: JSON.stringify({
        mentorId:id,

        // likes: { mentor_id: id },
      }),
    };

    const response = await fetch(
      "http://localhost:5001/api/mentees/postLikes",
      requestOptions
    );
    const result = await response.json();

    console.log("result likes: ", result);
    // setLikes([]);
  };
  // ------- like a mentor -------- ends --

  // console.log("isUserLoggedIn: ", isUserLoggedIn);
  // console.log("likes", likes);
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
