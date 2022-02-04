const {userModel}= require("../models");
const bcrypt = require('bcrypt');
const {successHandler,errorHandler} = require('../helper/statuscode')
const allStatus = require('../constant/allConstant')
const { issueJWT } = require('../middleware/jwt')

//console.log(allStatus.USER_CREATED,"allStatus");
const userSignUp = async (req, res) => {
  try {
    let {firstName,lastName,email,password}=req.body
  //console.log(firstName,lastName,email,password);
   let checkUser = await userModel.findOne({email})
 // console.log(checkUser,"checkUser......");
  if(checkUser == null){
    let salt = await bcrypt.genSaltSync(10);
    let hashPassword = await bcrypt.hash(password,salt)
    let userObj = new userModel({
      firstName,
      lastName,
      email,
      password:hashPassword
    })
    await userObj.save()
    return successHandler(res, 201,allStatus.USER_SIGNUP_SUCCESS_MSG)
  }else{
    return errorHandler(res, 400, allStatus.USER_ALREADY_EXIT)
  }
  } catch (error) {
    console.log(error)
  }
  
}

const userLogin = async(req,res)=>{
    try {
      let {email, password} = req.body;
      console.log(email, password);
      let check = await userModel.findOne({email})
      console.log(check,"check...");
      if(check != null){
        let checkPassword = await bcrypt.compare(password, check.password)
        // console.log(checkPassword,"checkPassword");
         if(checkPassword == true){
           let payload = {
             id: check._id,
             email: check.email
         }
         let token = await issueJWT(payload)
        // console.log(token,"token");
         return successHandler(res,200,allStatus.LOGIN_SUCCESS ,token)
         }else{
           return errorHandler(res,400,allStatus.LOGIN_FAIL)
         }
      }else{
       return errorHandler(res,400,allStatus.USER_LOGIN_INCOREECT_EMAIL)
      }
    } catch (error) {
      return errorHandler(res,400,allStatus.INTERNAL_ERR) 
    }
}

const showUser = async(req,res)=>{
  let {id} = req.user
  let findData = await userModel.findOne({id})
  console.log(findData,"findData");
  if(findData){
    return successHandler(res,200,allStatus.USER_DEATILS, findData)
  }else{
    return errorHandler(res,allStatus.USER_NOT_VALID)
  }
}

module.exports = {
  userSignUp,
  userLogin,
  showUser
}
