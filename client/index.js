import React from "react";

import ReactDOM from "react-dom/client";
import App from "./Components/App";
import { HashRouter } from "react-router-dom";

//note
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
