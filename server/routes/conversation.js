const { 
  singleConversation, 
  groupConversation, 
  addUserToConversation 
} = require("../controllers/conversationController")

const router = require("express").Router();

router.post("/single", singleConversation);
router.post("/group", groupConversation);
router.post("/adduser", addUserToConversation);

module.exports = router;