const db = require("../models");
const models = db.models;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const { use } = require("../routes/auth");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await models.User.findOne({ where: { username } });
    console.log(password);
    console.log(user.password);
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      //return res.json({ msg: "Incorrect Username or Password", status: false });
      return res.json({ msg: "Incorrect Username or Password", status: true });
    delete user.password;
    return res.json({ status: true, user: user.id });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await models.User.findOne({ where: { username } });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await models.User.findOne({ where: { email } });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await models.User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await models.User.findAll({ 
      where: { id: { [Op.ne]: req.params.id }},
      attributes: ["id", "email", "username", "avatarImage"]
    });
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    await models.User.update(
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      {
        where: {
          id: userId
        }
      }
    );
    return res.json({
      isSet: true,
      image: avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
