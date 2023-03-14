import React from "react";
import Home from "./pages";
import Providers from "./Providers";
import "./App.css";
import "../src/styles/global.css";

const App = () => {
  return (
    <Providers>
      <Home />
    </Providers>
  );
};

export default App;
