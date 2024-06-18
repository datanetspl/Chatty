const { 
  singleConversation, 
  groupConversation, 
  addUserToConversation,
  getGroup
} = require("../controllers/conversationController")

const router = require("express").Router();

router.post("/single", singleConversation);
router.post("/getgroup", getGroup);
router.post("/group", groupConversation);
router.post("/adduser", addUserToConversation);

module.exports = router;