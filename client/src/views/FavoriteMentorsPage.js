import React, { useEffect, useState } from "react";

import { AppContext } from "../contexts/appContext.js";
import Loading from "../components/Loading.js";
import MentorsCard from "../components/MentorsCard.js";
import { getToken } from "../utils/getToken.js";
import { nodeEnv } from "../utils/nodeEnv";

const FavoriteMentorsPage = () => {
  const { loader, setLoader, getMentorsProfile, mentorsProfile, likes } =
  React.useContext(AppContext);
  const [filteredMentors, setFilteredMentors] = useState();
  const env = nodeEnv.env;
  
  console.log("likes: ", likes);
  
  const getLikedMentors = async () => {
    // setLoader(true);
    console.log(
      "mentorsProfile.likes: ",
      mentorsProfile && mentorsProfile.likes
    );

    const token = getToken();

    if (token) {
      try {
        const body = {
          mentorId: mentorsProfile.likes,
        };
        const requestOptions = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        };
        const response = await fetch(
          `${env}/mentors/likedmentors`,
          requestOptions
        );
        const result = await response.json();
        setFilteredMentors(result);

        console.log("result", result);
        // setText(commentsData);
      } catch (error) {
        console.log("error: ", error);
      }
    }
  };
  // ------- Filter Gender ------- ends //

  useEffect(() => {
    let didCancel = false;
    if (!didCancel) {
      getMentorsProfile();
    }
    return () => (didCancel = true);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // if (mentorsProfile) {
    //   setProfile(mentorsProfile);
    // }
    mentorsProfile && getLikedMentors();
    // eslint-disable-next-line
  }, [mentorsProfile]);

  // console.log("gender: ", gender);
  // console.log("allMentorsData: ", allMentorsData && allMentorsData);
  // console.log("token: ", token);
  // console.log("mentorsProfile: ", mentorsProfile && mentorsProfile);
  // console.log("filteredMentors: ", filteredMentors);

  return (
    <>
      {loader ? (
        <Loading height="70vh" />
      ) : (
        <div className="mentors-card-con" style={{ marginTop: "4rem" }}>
          {filteredMentors &&
            filteredMentors.map((mentor) => {
              return <MentorsCard key={mentor._id} mentor={mentor} />;
            })}
        </div>
      )}
      {filteredMentors && filteredMentors.length < 1 && (
        <div
          style={{
            border: "9px dashed rgb(79 154 203)",
            borderRadius: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30px",
            marginTop: "35vh",
          }}
        >
          No result found
        </div>
      )}
    </>
  );
};

export default FavoriteMentorsPage;
