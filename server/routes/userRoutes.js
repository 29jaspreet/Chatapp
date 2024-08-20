// const { default: SetAvatar } = require("../../public/src/Pages/SetAvatar");
const {register} =require("../controllers/userController");
const {login} =require("../controllers/userController");
const{setAvatar,getAllUsers}=require("../controllers/userController")
const router = require("express").Router();
const cors = require("cors")

router.use(cors());

router.post("/register" , register);
router.post("/login" , login);
router.post("/setAvatar/:id",setAvatar);
router.get("/allusers/:id" , getAllUsers);

module.exports= router;