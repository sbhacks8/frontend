import { Settings } from "luxon";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import Home from "./Home";
import Landing from "./Landing";
import VideoLivingRoom from "./VideoLivingRoom";

Settings.defaultZoneName = "London/Greenwich";

let BASENAME = "";
if (import.meta.env.BASE_URL == "/frontend/") {
  BASENAME = "/frontend";
} else {
  BASENAME = "/";
}
ReactDOM.render(
  <React.StrictMode>
    <Router basename={BASENAME}>
      <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/video" element={<VideoLivingRoom />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
