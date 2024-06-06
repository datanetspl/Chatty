const { singleConversation, groupConversation } = require("../controllers/conversationController")

const router = require("express").Router();

router.post("/single", singleConversation);
router.post("/group", groupConversation);

module.exports = router;