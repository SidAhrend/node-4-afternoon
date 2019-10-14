require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSession = require("./middlewares/checkForSession");
const authController = require("./controllers/authController");
const swagController = require("./controllers/swagController");
const cartController = require("./controllers/cartController");
const searchController = require("./controllers/searchController");

const app = express();

let { SERVER_PORT, SESSION_SECRET } = process.env;

//Middleware
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

//endpoints
////auth endpoints
app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);
////swag endpoint
app.get("/api/swag", swagController.read);
////cart endpoints
app.post("/api/cart/checkout", cartController.checkout);
app.post("/api/cart/:id", cartController.add);
app.delete("/api/cart/:id", cartController.delete);
////search endpoint
app.get("/api/search", searchController.search);

app.listen(SERVER_PORT, () => {
  console.log(`server ${SERVER_PORT} is running.`);
});
