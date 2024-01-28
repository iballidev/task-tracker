const ConfigPassword = require("../../config/config_password");
const { validateUser, User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../../config/env");

const handle_login = async (req, res, next) => {
  const { email, password } = req.body;

  const { error } = validateUser({ email, password });

  if (error) {
    return res.status(400).json({
      message: error?.details[0]?.message,
      formData: email
    });
  }

  try {
    const foundUser = await User.findOne({ email: email }).exec();

    if (!foundUser) {
      return res.status(401).json({
        message: "Auth failed",
        formData: email
      });
    }

    /**Evaluate password  */
    const config_password = new ConfigPassword(password, foundUser.password);
    const match = await config_password.match();
    if (match) {
      const roles = Object.values(foundUser.roles).filter(Boolean);

      /**Create JWTs */
      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: foundUser.email,
            user_id: foundUser._id,
            roles: roles
          }
        },
        config.ACCESS_TOKEN_SECRET,
        // { expiresIn: "5s" },
        // { expiresIn: "10s" }
        { expiresIn: "1hr" }
      );


      let refreshToken = jwt.sign(
        { email: foundUser.email },
        config.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      /**Saving refreshToken with current user */
      foundUser.refreshToken = refreshToken;
      const result = await foundUser.save();

      /**Creates Secure Cookie with refresh token */
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true /**Only serve on https i.e for production only*/ /**Without it, jwt disappears in Angular application too */,
        // sameSite: "None",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
      });

      /**Send authorization roles and access token to user */
      console.log("accessToken: ", accessToken);
      return res.status(200).json({ roles, accessToken });
    }
    res.status(401).json({
      message: "Auth failed!",
      formData: email
    });
  } catch (error) {
    res.status(400).json({
      message: "Auth failed!",
      error: error,
      formData: email
    });
  }
};

const handle_logout = async (req, res) => {
  // On the client side, also delete the accessToken
  console.log("logout space");
  const cookies = req.cookies;
  console.log("cookies: ", cookies);
  // console.log("cookies.jwt: ", cookies.jwt);
  if (!cookies?.jwt) return res.sendStatus(204); //"successful(204): successful with No content to send back"
  console.log("cookies.jwt: ", cookies.jwt);
  const refreshToken = cookies.jwt;

  try {
    /**Check data base for user refresh token */
    const foundUser = await User.findOne({ refreshToken }).exec();
    console.log("foundUser: ", foundUser);
    if (!foundUser) {
      req.session.accessToken = "";
      res.clearCookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true
      });
      return res.status(200).json({
        message: "Logout successful!!!"
      });
    }
    /** */

    // Delete refreshToken in db
    foundUser.refreshToken = "";
    // req.session.accessToken = "";
    // req.session.user = null;
    // res.locals.isAuthenticated = null;
    const result = await foundUser.save();
    console.log("result: ", result);
    res.clearCookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true
    });
    res.status(200).json({
      message: "Logout successful!!!"
    });
    // ...
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

module.exports = { handle_login, handle_logout };
