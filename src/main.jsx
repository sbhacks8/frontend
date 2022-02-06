import { Settings } from "luxon";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import Home from "./Home";
import VideoLivingRoom from "./VideoLivingRoom";

Settings.defaultZoneName = "London/Greenwich";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Landing />}></Route> */}
        <Route path="/home" element={<Home />}></Route>
        <Route path="/video" element={<VideoLivingRoom />}></Route>
      </Routes>
    </Router>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
