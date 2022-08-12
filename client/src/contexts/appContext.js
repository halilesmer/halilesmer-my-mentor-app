import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = (props) => {
  const [url, setUrl] = useState("");
  const [focused, setFocused] = useState(false);

  // const [mentorsData, setMentorsData] = useState(null);

  // const fetchMentorsData = async () => {
  //   const mentorsUrl = "http://localhost:5001/mentors";
  //   console.log("mentorsUrl: ", mentorsUrl);
  //   const response = await fetch(mentorsUrl);
  //   const data = await response.json();
  //   // setMentorsData(data);
  // };
  // useState(() => {
  //   let didCancel = false;

  //   return () => (didCancel = true);
  // }, []);
const handlePwInputFocus = () => setFocused(true);
const onBlur = () => setFocused(false);


  const value = {
    url,
    // mentorsData,
  };
  // console.log("mentorsData: ", mentorsData);
  return (
    <AppContext.Provider value={{ url, onBlur, handlePwInputFocus, focused }}>
      {props.children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
