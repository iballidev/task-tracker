const winston = require("winston");

module.exports = (err, req, res, next) => {
  // console.log("Error: ", (err.message, err));
  winston.error(err.message, err);
  // res.status(err.status || 500).send("Something went wrong");
  //   res.status(err.status || 500).send(err.message || "Something went wrong");
  res.status(err.status || 500).send(err.message || "Something went wrong");

  res.status(err.status || 500).json({
    message: err.message || "Something went wrong"
  });
};



// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });