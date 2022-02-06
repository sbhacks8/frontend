import express from "express";
import cors from "cors";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import axios from "axios";

const app = express();
app.use(cors());

const verifyjwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://timelyproject.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "vincentAuth0Id",
  issuer: "https://timelyproject.us.auth0.com/",
  algorithms: ["RS256"],
});

app.get("/", (req, res) => {
  res.send("Hello from Index Route");
});

app.get("/protected", verifyjwt, async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://timelyproject.us.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userinfo = response.data;
    console.log(userinfo);
    res.send(userinfo);
  } catch (error) {
    res.send(error.message);
  }
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  res.status(status).send(message);
});

//Listener
app.listen(4000, () => console.log("Server on port 4000"));
