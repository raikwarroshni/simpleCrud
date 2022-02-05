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
  var findData = await userModel.findOne({_id:id})
 // const {password , ...restvalue} = findData
  const Data = {
    id:findData._id,
    firstName:findData.firstName,
    lastName:findData.lastName,
    email:findData.email,
    created_at:findData.createdAt,
    updated_at:findData.updatedAt
  }
  //console.log(Data,"restvalue");
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
    let arr =[]
    for(let i=0;i<result.length;i++){
      var data = {
        user_id:result[i]._id,
        firstName:result[i].firstName,
        lastName:result[i].lastName,
        email:result[i].email,
        created_at:result[i].createdAt,
        updated_at:result[i].updatedAt
      }
      arr.push(data)
    }
    console.log(arr,"arr");
    if(result){
      return successHandler(res,allStatus.OK,allStatus.FOUND_RECORD,arr)
    }else{
      return successHandler(res,allStatus.OK,allStatus.NOT_FOUND,arr)
    }
    
  } catch (error) {
    console.log(error);
   return errorHandler(res,allStatus.SERVER_ERROR,allStatus.INTERNAL_ERR,error)
  }
}

const deleteUser = async(req,res)=>{
  try {
  let { id } = req.user
  let userdelete = await userModel.deleteOne({id})
  console.log(userdelete,".....");
  return successHandler(res,allStatus.OK,allStatus.DEL_MSG)
  } catch (error) {
   return errorHandler(res,allStatus.SERVER_ERROR,allStatus.INTERNAL_ERR) 
  }
}

const editUser = async(req,res)=>{
  try {
    let { id } = req.user
    console.log(id);
    let{firstName,lastName} = req.body
    console.log(firstName,lastName);
    let userUpdate = await userModel.findOneAndUpdate({
      _id:id},
      {$set:{firstName:firstName,lastName:lastName}}
    )
    return successHandler(res,allStatus.OK,allStatus.RECORD_UPDATE_MSG)
  } catch (error) {
    return errorHandler(res,allStatus.SERVER_ERROR,allStatus.INTERNAL_ERR)
  }
}

const truncateTable = async (req,res) =>{
  try {
    let {id} = req.user
    console.log(id);
    let deletedata = await userModel.deleteMany({})
    console.log(deletedata,".....deleteData");
    return successHandler(res,allStatus.OK,allStatus.TRUNCATE)
  } catch (error) {
   return errorHandler(res,allStatus.SERVER_ERROR,allStatus.INTERNAL_ERR) 
  }
    
}

module.exports = {
  userSignUp,
  userLogin,
  showUser,
  showAllUser,
  deleteUser,
  editUser,
  truncateTable
}
