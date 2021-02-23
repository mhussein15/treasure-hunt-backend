//IMPORT FILES
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const {localStrategy,jwtStrategy} = require("./middleware/passport")
//IMPORT DB
const db = require("./db/models");

//IMPORT MORGAN
const morgan = require("morgan");

//IMPORT ROUTES
const thingRouter = require("./routes/things");
const usersRouter = require("./routes/users");

//MIDDLEWARE
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
//ROUTES
app.use(usersRouter);
app.use("/thing", thingRouter);
//MEDIA ROUTE
app.use("/media", express.static(path.join(__dirname, "media")));

//404 PAGE NOT FOUND
app.use((req, res, next) => {
  next({
    status: 404,
    message: "Path Not Found",
  });
});

//ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" });
});

// start the server
app.listen(8080);
//DB settings
db.sequelize.sync();
db.sequelize.sync({ alter: true });
