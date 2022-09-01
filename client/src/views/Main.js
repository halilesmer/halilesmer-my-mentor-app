import { Route, Routes } from "react-router-dom";

import Chat from "./Chat";
import EditMentor from "../components/EditMentor";
import ErrorPage from "./ErrorPage";
import FavoritMentorsPage from "./FavoritMentorsPage";
import Home from "./Home";
import SignInMentorPage from "./SignInMentorPage";
import Mentors from "./Mentors";
import MentorsDetails from "../components/MentorsDetails";
import MentorsProfilePage from "./MentorsProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";
import React from "react";
import SignUpMenteePage from "../components/SignUpMenteePage";
import SignUpMentorPage from "../components/SignUpMentorPage";
import SignUpPage from "./SignUpPage";
import SignInMenteePage from "./SignInMenteePage";
import SignInPage from "./SignInPage";
import MenteesProfilePage from "./MenteesProfilePage";
import MentorsDetailsPage from "./MentorsDetailsPage";

// import Grid from "@mui/material/Grid";

const Main = () => {
  return (
    <main id="mainCon" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
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
        <Route path="/mentors/details-page/:name" element={<MentorsDetailsPage />} />

        <Route path="/favorit-mentor" element={<FavoritMentorsPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mentors/signup" element={<SignUpMentorPage />} />
        <Route path="/mentees/signup" element={<SignUpMenteePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/mentors/signin" element={<SignInMentorPage />} />
        <Route path="/mentees/signin" element={<SignInMenteePage />} />

        <Route path="/mentors/profile" element={<MentorsProfilePage />} />
        <Route path="/mentees/profile" element={<MenteesProfilePage />} />
        <Route path="/mentors/edit-mentor" element={<EditMentor />} />
        <Route
          path="*"
          element={<ErrorPage errorMsg="Something went wrong ..." />}
        />
      </Routes>
    </main>
  );
};

export default Main;
