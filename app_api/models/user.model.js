const mongoose = require("mongoose");
const Joi = require("joi");
const ROLES_LIST = require("../../config/role-list");
// var findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, //"Unique" doesn't mean that the email will be perculiar only to a user
    //it only does field optimization. It won't even validate the email field values
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: { type: String, required: true },
  roles: {
    User: {
      type: Object,
      default: ROLES_LIST.User
    },
    Editor: Number,
    Admin: Number
  },
  refreshToken: String,
  passwordResetToken: String,
  oldPasswordList: [String],
});

// userSchema.plugin(findOrCreate);
// const User = mongoose.model("User", userSchema);

const validateUser = user => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      ),
    password: Joi.string().required()
  });

  return schema.validate(user);
};

var role = Joi.object().required();

const validateEmailAddress = (email) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .regex(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
  });
  return schema.validate(email);
};



module.exports.validateEmailAddress = validateEmailAddress;
module.exports.User = mongoose.model("User", userSchema);;
module.exports.validateUser = validateUser;
