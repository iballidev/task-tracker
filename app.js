const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const logger_winston = require("./config/logger");
const errors = require("./middlewares/errors");
const cors = require("cors");
const corsOptions = require("./config/cors-options");

/**DB Connection */
require("./config/db");


const app = express();

/**Configure CORS errors */
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
/**Logging (morgan) */
app.use(logger("dev"));

/**Logging (winston) */
logger_winston();
console.log("POINT A")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log("POINT B")
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



/**APP_SERVER ROUTES */
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);


/**API Routes */
const apiRouter = require("./app_api/routes/index");
app.use("/api", apiRouter.routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


/**ERROR HANDLING */
app.use(errors);



module.exports = app;
