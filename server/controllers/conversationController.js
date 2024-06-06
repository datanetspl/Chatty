const ErrorResponse = require("../core/errorResponse");
const db = require("../models");
const models = db.models;
const Op = db.Sequelize.Op;

module.exports.singleConversation = async (req, res, next) => {
  const { userId2 } = req.body;
  try {
    const users = await models.User.findAll({
      where: {
        id: [parseInt(req.headers.userid), userId2]
      },
    });
    if (users.length < 2) {
      throw new ErrorResponse("User 2 not found", 400);
    }
    let conversation = await models.Conversation.findOne({
      where: {
        type: "single",
      },
      include: [
        {
          model: models.User,
          where: { id: req.headers.userId }
        },
        {
          model: models.User,
          where: { id: userId2 }
        }
      ],
    });

    if (!conversation) {
      conversation = await db.sequelize.transaction(async (t) => {
        const conversation = await models.Conversation.create({}, { transaction: t });

        await conversation.addUsers(users, { transaction: t });

        return conversation;
      });
    }

    return res.json({
      convId: conversation.id
    });

  } catch (err) {
    next(err);
  }
};

module.exports.groupConversation = async (req, res, next) => {
  let { participants } = req.body;
  try {
    participants = Array.from(new Set(participants));
    if (participants.length < 2) {
      throw new ErrorResponse("Group chat need more than 3 people", 400);
    }
    const userId = req.headers.userid
    const users = await models.User.findAll({
      where: {
        id: [userId, ...participants]
      },
    })

    if (users.length < participants.length + 1) {
      throw new ErrorResponse("User not found", 400)
    }
    const conversation = await db.sequelize.transaction(async (t) => {
      const participantsName = await Promise.all(participants.map(async (id) => {
        const userData = await models.User.findByPk(id);
        return userData.username;
      }));

      const conversation = await models.Conversation.create({ type: "group", name: participantsName.join(", ") }, { transaction: t });

      await conversation.addUsers(users, { transaction: t });

      return conversation;
    });

    return res.json({
      convId: conversation.id
    });
  } catch (err) {
    next(err);
  }
}



