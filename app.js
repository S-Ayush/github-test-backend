const dotenv = require("dotenv");
const express = require("express");
const paths = require("path");
var cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const { path } = require("./authentication");
//allow cors origin
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://github-test-backend.vercel.app/"],
  })
);

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 8000;

//for getting json body from client
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// just for testing purpose

// const staticPath = paths.join(__dirname, "public");
// app.use(express.static(staticPath));
console.log(paths.join(__dirname, "public"));

// app.get(["/", "/login", "/dashboard"], (req, res) => {
//   res.sendFile(staticPath);
// });
app.use(express.static(paths.resolve(__dirname, "public")));

app.get(["/", "/login", "/dashboard", "/users", "/tasks"], (req, res) => {
  res.sendFile(paths.resolve(__dirname, "public", "index.html"));
});

require("./DB/connection");

//routin starts from here
app.use(require("./authentication"));
app.use(require("./Router"));

//listening on specific port
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
