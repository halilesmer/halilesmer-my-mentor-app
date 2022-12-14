import { Route, Routes } from "react-router-dom";

import Chat from "./Chat";
import EditMentee from "./EditMentee";
import EditMentor from "./EditMentor";
import ErrorPage from "./ErrorPage";
import FavoritMentorsPage from "./FavoritMentorsPage";
import FavoriteMentorsPage from "./FavoriteMentorsPage";
import Home from "./Home";
import Mentors from "./Mentors";
import MentorsDetailsPage from "./MentorsDetailsPage";
import ProtectedRoute from "../components/ProtectedRoute";
import React from "react";
import SignInPage from "./SignInPage";
import SignInPageUser from "./SignInPageUser";
import SignUpMenteePage from "../views/SignUpMenteePage";
import SignUpMentorPage from "../views/SignUpMentorPage";
import SignUpPage from "./SignUpPage";
import UsersProfilePage from "./UsersProfilePage";

// import Grid from "@mui/material/Grid";

const Main = () => {
  return (
    <main id="mainCon" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/mentors" element={<Mentors />} />
        <Route
          path="/mentors/details-page/:mentorId"
          element={<MentorsDetailsPage />}
        />

        <Route path="/favorit-mentor" element={<FavoritMentorsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/:userType/signup" element={<SignUpMentorPage />} />
        {/* <Route path="/:userType/signup" element={<SignUpMenteePage />} /> */}
        <Route path="/signin" element={<SignInPage />} />

        <Route path="/:userType/signin" element={<SignInPageUser />} />

        <Route path="/:userType/profile" element={<UsersProfilePage />} />

        <Route
          path="/mentors/liked-mentors"
          element={<FavoriteMentorsPage />}
        />
        <Route path="/mentors/edit-mentor" element={<EditMentor />} />
        <Route path="/:userType/edit-mentee" element={<EditMentee />} />

        <Route
          path="*"
          element={<ErrorPage errorMsg="Something went wrong ..." />}
        />
      </Routes>
    </main>
  );
};

export default Main;
