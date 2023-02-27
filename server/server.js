import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import connect from "./database/mongodb.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import dotEnv from "dotenv";

dotEnv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use("/", routes);
passportConfig(passport);
connect();

app.listen(PORT, () => {
  console.log("Server started @ http://localhost:" + PORT);
});
