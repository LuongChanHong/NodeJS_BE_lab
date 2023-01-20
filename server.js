const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// const mongodb = require("./util/db");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

const MONGODB_URI =
  "mongodb+srv://mongodb_admin:mongodb_admin@cluster0.e6b0l5j.mongodb.net/socialNetwork?retryWrites=true&w=majority";
const User = require("./models/User");

const app = express();
const sessionStore = new mongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
  expires: true,
});

const now =
  new Date().getDate().toString() +
  "." +
  new Date().getMonth().toString() +
  1 +
  "." +
  new Date().getFullYear().toString();

const fileStorage = multer.diskStorage({
  // function tell multer error and where to stora file
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  // function tell multer error and how to name upcoming file
  filename: (req, file, cb) => {
    // cb(null, now + "-" + file.originalname);
    cb(null, uuidv4());
  },
});

// tell multer that no error (null) and accept there type of file to store
const fileFilters = (req, file, cb) => {
  // console.log("file.mimetype:", file.mimetype);
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Headers", "Authorization");
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATH,DELETE,OPTIONS"
  );
  next();
});
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilters }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(
  session({
    secret: "secret cookie",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(authRoute.route);
app.use(postRoute.route);

// app.get("/test", (request, response, next) => {
//   response.write("<h1>SERVER RUN</h1>");
// });

app.use((error, req, res, next) => {
  console.log("=====================");
  console.log("ERROR HANDLER::", error);
  res.statusMessage = "Something go wrong";
  res.status(500).send({ message: "Something go wrong" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    const server = app.listen(5000);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("SOCKET IO CONNECTED");
    });
  })
  .catch((err) => console.log("mongoose connect err:", err));
