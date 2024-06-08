const express=require("express")
const router=express.Router();
const userController=require('../controller/UserController')
const verifyUser =require("../auth-middlewares/authMiddleWare")


router.get('/',userController.getall)
router.post('/signup',userController.SiginUp)
router.post('/login',userController.Login)
router.delete('/delete-user/:id',userController.DeleteUser)
router.put('/update-user/:id',verifyUser.authVerify,userController.UpdateUser)
router.post('/test',userController.testController)
router.post('/submit',userController.gmailNodemailer)
module.exports=router
