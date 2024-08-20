const{addMessage ,getAllMessage}=require("../controllers/messagesController")
const router = require("express").Router();
const cors = require("cors")

router.use(cors());

router.post("/addmsg/" , addMessage);
router.post("/getmsg/" , getAllMessage);


module.exports= router;