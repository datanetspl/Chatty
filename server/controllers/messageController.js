const ErrorResponse = require("../core/errorResponse");
const db = require("../models");
const models = db.models;
const Op = db.Sequelize.Op;
module.exports.getMessages = async (req, res, next) => {
  try {
    const { convId } = req.body;
    const userId = req.headers.userid;
    const userConversation = await models.UserConversation.findOne({
      where: {
        userId,
        convId
      }
    });
    if (!userConversation) {
      throw new ErrorResponse("User hasn't been in conversation", 400);
    }

    const messages = await models.Message.findAll({
      where: {
        convId
      },
      order: [["createdAt", "ASC"]],
    });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: parseInt(msg.senderId) === parseInt(userId),
        message: msg.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { convId, message } = req.body;
    const userId = req.headers.userid;
    const userConversation = await models.UserConversation.findOne({
      where: {
        userId,
        convId
      }
    });
    if (!userConversation) {
      throw new ErrorResponse("User hasn't been in conversation", 400);
    }
    const data = await models.Message.create({
      text: message,
      senderId: userId,
      convId,
    });

    const conversation = await models.Conversation.findByPk(convId, {
      include: models.User,
      as: "Users"
    });

    const usersIdInConv = conversation.Users
                            .filter(user => user.id !== userId)
                            .map(user => user.id);

    await models.UserConversation.update({ isRead: false }, {
      where: {
        convId,
        userId: {
          [Op.in]: usersIdInConv
        }
      }
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
