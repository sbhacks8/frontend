import { Settings } from "luxon";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import Home from "./Home";
import Landing from "./Landing";
import VideoLivingRoom from "./VideoLivingRoom";
import { Auth0Provider } from "@auth0/auth0-react";

Settings.defaultZoneName = "London/Greenwich";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="timelyproject.us.auth0.com"
      clientId="0POtC7ZJW80qO0lzLloAy6ru34QmiStr"
      redirectUri={window.location.origin}
      audience="vincentAuth0Id"
      scope="openid profile email"
    >
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />}></Route>

          <Route path="/home" element={<Home />}></Route>
          <Route path="/video" element={<VideoLivingRoom />}></Route>
        </Routes>
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
