const db = require("../models");
const models = db.models;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const { use } = require("../routes/auth");
const ErrorResponse = require("../core/errorResponse");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await models.User.findOne({ where: { username } });
    console.log(password);
    console.log(user.password);
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      //return res.json({ msg: "Incorrect Username or Password", status: false });
      return res.json({ msg: "Incorrect Username or Password", status: true });
    }

    const { password: userPassword, ...userWithoutPassword } = user.toJSON();
    
    return res.json({ status: true, user: userWithoutPassword });
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
    const { password: userPassword, ...userWithoutPassword } = user.toJSON();
    return res.json({ status: true, user: userWithoutPassword });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  console.log(req.params);
  try {
    const users = await models.User.findAll({
<<<<<<< HEAD
      where: { id: { [Op.ne]: req.params.id } },
=======
      where: { id: { [Op.ne]: parseInt(req.params.id) } },
>>>>>>> master
      attributes: ["id", "email", "username", "avatarImage"]
    });
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
<<<<<<< HEAD
      throw new ErrorResponse("Route params must parse Int", 400);
    }
=======
      throw new Error("Route params must parse Int")
    }
    console.log(req.params);
>>>>>>> master
    const avatarImage = req.body.image;
    console.log(avatarImage);
    await models.User.update(
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      {
        where: {
          id: parseInt(userId)
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
