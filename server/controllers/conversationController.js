const db = require("../models");
const models = db.models;

module.exports.singleConversation = async (req, res, next) => {
  const { userId2 } = req.body;
  try {
    let conversation = await Conversation.findAll({
      include: [
        {
          model: User,
          where: { id: req.userId }
        },
        {
          model: User,
          where: { id: userId2 }
        }
      ],
      having: sequelize.literal('COUNT(DISTINCT `users`.`id`) = 2'),
    });

    if (!conversation) {
      conversation = await sequelize.transaction(async (t) => {
        const conversation = await models.Conversation.create({}, { transaction: t });

        await conversation.addUsers([req.userId, req.userId2], { transaction: t });

        return conversation;
      });
    }

    return res.json({
      convId: conversation.id
    })

  } catch (err) {
    next(err);
  }
};

module.exports.groupConversation = async (req, res, next) => {
  const { participants } = req.body;
  try {
     const conversation = await sequelize.transaction(async (t) => {
      const participantsName = await Promise.all(participants.map(async (userId) => {
        const userData = await models.User.findByPk(user);
        return userData.username
      }))

      const conversation = await models.Conversation.create({ type: "group", name: participantsName.join(", ") }, { transaction: t });

      await conversation.addUsers([...participants, req.userId], { transaction: t });

      return conversation;
    });

    return res.json({
      convId: conversation.id
    })
  } catch (err) {
    next(err)
  }
}



