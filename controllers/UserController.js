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
    let salt = await bcrypt.genSaltSync(10);
    let hashPassword = await bcrypt.hash(password,salt)
    let userObj = new userModel({
      firstName,
      lastName,
      email,
      password:hashPassword
    })
    let usersave = await userObj.save()
    console.log(usersave,".....");
    if(usersave){
      return successHandler(res,allStatus.CREATED,allStatus.USER_SIGNUP_SUCCESS_MSG)
    }
    else{
    return errorHandler(res,allStatus.BAD_REQUEST, allStatus.USER_NOT_SIGNUP)
    }
  } catch (error) {
    return errorHandler(res,allStatus.SERVER_ERROR,allStatus.INTERNAL_ERR)
  }
  
}

const userLogin = async(req,res)=>{
    try {
      let {email, password} = req.body;
      console.log(email, password);
      let check = await userModel.findOne({email})
      console.log(check.password,"check...");
      if(check != null){
        let checkPassword = await bcrypt.compare(password, check.password)
        console.log(checkPassword,"checkPassword");
         if(checkPassword == true){
           let payload = {
             id: check._id,
             email: check.email
         }
         let token = await issueJWT(payload)
        console.log(token,"token");
         return successHandler(res,allStatus.OK,allStatus.LOGIN_SUCCESS ,token)
         }else{
           return errorHandler(res,allStatus.BAD_REQUEST,allStatus.LOGIN_FAIL)
         }
      }else{
       return errorHandler(res,allStatus.BAD_REQUEST,allStatus.USER_LOGIN_INCOREECT_EMAIL)
      }
    } catch (error) {
      return errorHandler(res,allStatus.SERVER_ERROR,allStatus.INTERNAL_ERR) 
    }
}

const showUser = async(req,res)=>{
  try {
    let {id} = req.user
  var findData = await userModel.findOne({id})
  const {password , ...restvalue} = findData
  const Data = {
    id:findData._id,
    firstName:findData.firstName,
    lastName:findData.lastName,
    email:findData.email
  }
  console.log(findData,"restvalue");
  if(findData){
    return successHandler(res,allStatus.OK,allStatus.USER_DEATILS, Data)
  }else{
    return errorHandler(res,allStatus.BAD_REQUEST,allStatus.USER_NOT_VALID)
  }
  } catch (error) {
    return errorHandler(res,allStatus.SERVER_ERROR,allStatus.INTERNAL_ERR)
  }
}

const showAllUser = async (req, res) => {
  try {
    let {_id} = req.user
    let result = await userModel.find({_id: {$ne: _id}})
    return successHandler(res, 200, allStatus.FOUND_RECORD, result)
  } catch (error) {
    return errorHandler(res, 500, allStatus.INTERNAL_ERR)
  }
}

const deleteUser = async(req,res)=>{
  try {
  let { id } = req.user
  let userdelete = await userModel.deleteOne({id})
  console.log(userdelete,".....");
  return successHandler(res,200,allStatus.DEL_MSG)
  } catch (error) {
   return errorHandler(res,500,allStatus.INTERNAL_ERR) 
  }
}

const editUser = async(req,res)=>{
  try {
    let {id} = req.user
    console.log(id);
    let{firstName,lastName} = req.body
    console.log(firstName,lastName);
    let userUpdate = await userModel.findOneAndUpdate({
      _id:"61fb9ec63e6180401263075b"},
      {$set:{firstName:'roshni'}}
    )
    console.log(userUpdate,"userUpdate");
    return successHandler(res,200,allStatus.RECORD_UPDATE_MSG,userUpdate)
  } catch (error) {
    return errorHandler(res,500,allStatus.INTERNAL_ERR)
  }
}
module.exports = {
  userSignUp,
  userLogin,
  showUser,
  showAllUser,
  deleteUser,
  editUser
}
