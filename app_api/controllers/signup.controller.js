const { validateUser, User } = require("../models/user.model");
const bcrypt = require("bcrypt");

const handle_signup = async (req, res, next) => {
  const control_fields = ({ full_name, email, password, confirm_password, isTermsChecked } = req.body);
  console.log("control_fields: ", control_fields);

  if (!Object.keys(control_fields).length) {
    return res.status(400).json({
      message: "Your request body is empty. Provide relevant payload",
      data: email
    });
  }

  /** */
  const invalid_fields = [];
  for (const key in control_fields) {
    if (Object.hasOwnProperty.call(control_fields, key)) {
      const element = control_fields[key];
      if (!element) {
        invalid_fields.push(key);
      }
    }
  }
  if (invalid_fields.length) {
    return res.status(400).json({
      // message: "Email or password is not provided. 1",
      message: "email or password is not provided. 1",
      data: email,
      invalidFields: invalid_fields
    });
  }

  /** */

  if (!email || !password || !confirm_password) {
    return res.status(400).json({
      message: "email or password is not provided. 2",
      data: email
    });
  }

  if (password != confirm_password) {
    return res.status(400).json({
      message: "Passwords do not match",
      data: email
    });
  }

  /** */

  const { error } = validateUser({ email, password });

  if (error) {
    return res.status(400).json({
      message: error.details[0]?.message,
      formData: email,
    });
  }

  try {


    /** check for duplicate usernames in the db */
    const duplicate = await User.findOne({ email: email }).exec();

    if (duplicate)
      return res.status(409).json({
        message: "User already exist",
        formData: email,
      }); //Conflict


    /**Save user */
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      full_name: email,
      email: email,
      password: hashedPwd,
      isTermsChecked: isTermsChecked,
    });

    if (result) {
      res.status(201).json({
        message: `Account successfully created for ${email}. Kindly login to your account`,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      data: email,
    });
  }

  /** */

  // res.status(201).json({
  //   message: "User created!"
  // });
};

module.exports = { handle_signup };
