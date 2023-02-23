import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionController from "./controllers/TransactionController.js";
import AuthController from "./controllers/AuthController.js";
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
passportConfig(passport);
app.use("/transactions", TransactionController);
app.use("/auth", AuthController);
// app.use(function (req, res) {
//   res.setHeader('Accept', 'application/json')
//   res.end
// })
connect();

app.listen(PORT, () => {
  console.log("Server started @ http://localhost:" + PORT);
});
