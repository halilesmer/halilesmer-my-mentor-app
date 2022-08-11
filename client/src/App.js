import "./App.css";

import * as React from "react";

import { AppProvider } from "./contexts/appContext";
import { Container } from "@mui/system";
import FooterBar from "./views/FooterBar";
import Main from "./views/Main";
import NavBar from "./views/NavBar";

function App() {
  return (
    <>
        <NavBar />
        <Container>
          <Main />
        </Container>
        <FooterBar />
    </>
  );
}

export default App;
