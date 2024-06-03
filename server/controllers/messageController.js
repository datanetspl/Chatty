const db = require("../models");
const models = db.models;
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await models.Message.findAll({
      where: {
        [Op.or]: [{ senderId: from, receiverId: to }, { senderId: to, receiverId: from }]
      },
      order: [["createdAt", "ASC"]],
    })

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.senderId === from,
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
    const { from, to, message } = req.body;
    const data = await models.Message.create({
      text: message,
      senderId: from,
      receiverId: to,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
