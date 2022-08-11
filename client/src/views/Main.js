import { Route, Routes } from "react-router-dom";

import { AppProvider } from "../contexts/appContext";
import Chat from "./Chat";
import ErrorPage from "./ErrorPage";
import FavoritMentorsPage from "./FavoritMentorsPage";
import Home from "./Home";
import LoginPage from "./LoginPage";
import Mentors from "./Mentors";
import MentorsDetails from "../components/MentorsDetails";
import ProfilePage from "./ProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";
import React from "react";
import RegisterMenteePage from "../components/RegisterMenteePage";
import RegisterMentorPage from "../components/RegisterMentorPage";
import SignUpPage from "./SignUpPage";

// import Grid from "@mui/material/Grid";

const Main = () => {
  return (
    <main id="mainCon" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="chat/"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="mentors/" element={<Mentors />} />
          <Route path="favorit-mentor/" element={<FavoritMentorsPage />} />
          <Route path="register-page/" element={<SignUpPage />} />
          <Route
            path="register-page/mentor/"
            element={<RegisterMentorPage />}
          />
          <Route
            path="register-page/mentee/"
            element={<RegisterMenteePage />}
          />

          <Route path="login/" element={<LoginPage />} />
          <Route path="profile/" element={<ProfilePage />} />
          <Route
            path="*"
            element={<ErrorPage errorMsg="Something went wrong ..." />}
          />
        </Routes>
      </AppProvider>
    </main>
  );
};

export default Main;
