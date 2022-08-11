import { Route, Routes } from "react-router-dom";

import { AppProvider } from "../contexts/appContext";
import Chat from "./Chat";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import LoginPage from "./LoginPage";
import Mentors from "./Mentors";
import MentorsDetails from "../components/MentorsDetails";
import ProfilePage from "./ProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";
import React from "react";
import RegisterPage from "./MenteeRegisterPage.js";

// import Grid from "@mui/material/Grid";

const Main = () => {
  return (
    <main id="mainCon" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="cards/:pagination"
            element={
              <ProtectedRoute>
                <Mentors />
              </ProtectedRoute>
            }
          />
          <Route path="cards/details/:title/" element={<MentorsDetails />} />

          <Route
            path="chat/"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="registerpage/" element={<RegisterPage />} />
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
