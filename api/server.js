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
      jwksUri: 'https://timelyproject.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'vincentAuth0Id',
  issuer: 'https://timelyproject.us.auth0.com/',
  algorithms: ['RS256']
});


app.get("/", (req, res) => {
  res.send("Hello from Index Route");
});

app.get("/protected", verifyjwt, (req, res) => {
  res.send("Hello from Protected Route");
});

//Listener
app.listen(4000, () => console.log("Server on port 4000"));
