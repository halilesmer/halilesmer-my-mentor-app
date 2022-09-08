import { Route, Routes } from "react-router-dom";

import Chat from "./Chat";
import EditMentee from "./EditMentee";
import EditMentor from "./EditMentor";
import ErrorPage from "./ErrorPage";
import FavoritMentorsPage from "./FavoritMentorsPage";
import Home from "./Home";
import MenteesProfilePage from "./MenteesProfilePage";
import Mentors from "./Mentors";
import MentorsDetailsPage from "./MentorsDetailsPage";
import MentorsProfilePage from "./MentorsProfilePage";
import ProtectedRoute from "../components/ProtectedRoute";
import React from "react";
import SignInMenteePage from "./SignInMenteePage";
import SignInMentorPage from "./SignInMentorPage";
import SignInPage from "./SignInPage";
import SignUpMenteePage from "../views/SignUpMenteePage";
import SignUpMentorPage from "../views/SignUpMentorPage";
import SignUpPage from "./SignUpPage";

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
        <Route path="/mentors/signup" element={<SignUpMentorPage />} />
        <Route path="/mentees/signup" element={<SignUpMenteePage />} />
        <Route path="/signin" element={<SignInPage />} />

        
        <Route path="/mentors/signin" element={<SignInMentorPage />} />
        <Route path="/mentees/signin" element={<SignInMenteePage />} />

        <Route path="/mentors/profile" element={<MentorsProfilePage />} />
        <Route path="/mentees/profile" element={<MenteesProfilePage />} />
        <Route path="/mentors/edit-mentor" element={<EditMentor />} />
        <Route path="/mentee/edit-mentee" element={<EditMentee />} />

        {/* <Route path="/comments/edit-comment/:commentId" element={<MentorsDetailsPage />} /> */}
        <Route
          path="*"
          element={<ErrorPage errorMsg="Something went wrong ..." />}
        />
      </Routes>
    </main>
  );
};

export default Main;
