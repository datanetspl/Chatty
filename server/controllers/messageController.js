const db = require("../models");
const models = db.models;
const Op = db.Sequelize.Op;
module.exports.getMessages = async (req, res, next) => {
  try {
    const { convId } = req.body;

    const messages = await models.Message.findAll({
      where: {
        convId
      },
      order: [["createdAt", "ASC"]],
    });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: parseInt(msg.senderId) === parseInt(req.userId),
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
    const data = await models.Message.create({
      text: message,
      senderId: from,
      convId,
    });

    const conversation = await Conversation.findByPk(convId, {
      include: models.User,
      as: "Users"
    });

    const usersIdInConv = conversation.Users
                            .filter(user => user.id !== parseInt(req.userId))
                            .map(user => user.id);
    await db.UserConversation.update({ isRead: false }, {
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
