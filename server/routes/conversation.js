const { 
  singleConversation, 
  groupConversation, 
  addUserToConversation,
  getGroup,
  getAllGroup
} = require("../controllers/conversationController")

const router = require("express").Router();

router.post("/single", singleConversation);
router.post("/getgroup", getGroup);
router.post("/group", groupConversation);
router.post("/adduser", addUserToConversation);
router.post("/getallgroup", getAllGroup);

module.exports = router;