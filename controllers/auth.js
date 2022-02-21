const { userModel } = require("../models");
const bcrypt = require("bcrypt");
const { successHandler, errorHandler } = require("../helper/responseHandler");
const allStatus = require("../constant/constant");
const { issueJWT } = require("../middleware/authentication");
const forgotsendEmailOtp= require("../helper/forgetEmailOtp")
const sendMail = require('../helper/forgetEmailOtp');


/**
 * @api {post} /user create User information
 * @apiName createUser
 * @apiGroup User
 * @apiBody {string} [firstname] [user first name]
 * @apiBody {string} [lastname] [user last name]
 * @apiBody {string} [email] [user email]
 * @apiBody {string} [password] [user password]
 * @apiSuccessExample {json} [success--response]
 *     HTTP/1.1 201 created
 *     {
 *      "message": "user created successfully"
 *     }
 * @apiError (Error 500) {string} internal server error
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 internal server error
 *     {
 *       "error": "internal server error"
 *     }
 */

 const SignUp = async (req, res) => {
    try {
      let { firstName, lastName, email, password } = req.body;
      let salt = await bcrypt.genSaltSync(allStatus.genSaltSyncValue);
      let hashPassword = await bcrypt.hash(password, salt);
      let usersave = await userModel.create([{
        firstName,
        lastName, 
        email, 
        password:hashPassword 
      }]);
      if (usersave) {
        return successHandler(
          res,
          allStatus.CREATED,
          allStatus.USER_SIGNUP_SUCCESS_MSG
        );
      }
    } catch (error) {
      return errorHandler(res, allStatus.SERVER_ERROR, allStatus.INTERNAL_ERR);
    }
  };
  
  /**
   * @api {post} /user For User login
   * @apiName loginUser
   * @apiGroup User
   * @apiBody {string} [email] [email of user]
   * @apiBody {string} [password] [password of user]
   * @apiSuccessExample {json} [success--response]
   *     HTTP/1.1 200 OK
   *     {
   *      "message": "user login successfully",
   *      "result":"token"
   *     }
   * @apiError (Error 400) {string} email not valid
   * @apiError (Error 400) {string} password not match
   * @apiErrorExample {json} Error-Response:
   *     HTTP/1.1 500 internal server error
   *     {
   *       "error": "internal server error"
   *     }
   */
  const login = async (req, res) => {
    try {
      let { email, password } = req.body;
      let check = await userModel.findOne({ email });
      if (check) {
        let checkPassword = await bcrypt.compare(password, check.password);
        if (checkPassword) {
          let payload = {
            id: check._id,
            email: check.email,
          };
          let token = await issueJWT(payload);
          return successHandler(
            res,
            allStatus.OK,
            allStatus.LOGIN_SUCCESS,
            token
          );
        } else {
          return errorHandler(res, allStatus.BAD_REQUEST, allStatus.LOGIN_FAIL);
        }
      } else {
        return errorHandler(
          res,
          allStatus.BAD_REQUEST,
          allStatus.USER_LOGIN_INCOREECT_EMAIL
        );
      }
    } catch (error) {
      return errorHandler(res, allStatus.SERVER_ERROR, allStatus.INTERNAL_ERR);
    }
  };

  const forgetPassword = async (req, res) =>{
    try {
      let { email } = req.body
      var otp = Math.floor(100000 + Math.random() * 900000);
      let findData = await userModel.findOne({email:email})
      if(findData){
       let payload = {
             _id:findData._id,
             email
       }
       let token = await issueJWT(payload);
      let setData = await userModel.updateOne(
        {
          _id: findData._id,
        },
        { $set: { token:token} })
        await sendMail.mail(email,token)
        return successHandler(res, allStatus.OK,allStatus.EMAIL_SEND)
      }else{
        return errorHandler(res,allStatus.BAD_REQUEST,allStatus.USER_NOT_VALID)
      }
    } catch (error) {
      return errorHandler(res,allStatus.SERVER_ERROR,allStatus.INTERNAL_ERR)
    }
  }
  
  const verifyToken = async (req, res) =>{
    try {
      let token = req.params.token;
      let findData = await userModel.findOne({token:token})
      if(findData){
        let setData = await userModel.updateOne(
          {
            _id: findData._id,
          },
          { $set: { isActive:true} })
         return successHandler(res, allStatus.OK,allStatus.USER_VERIFY)
      }else{
        return errorHandler(res, allStatus.BAD_REQUEST,allStatus.USER_NOT_VALID)
      }
    } catch (error) {
      return errorHandler(res, allStatus.SERVER_ERROR,allStatus.INTERNAL_ERR)
    }
  }
  
  const resetPassword = async (req, res) =>{
    try {
      let token = req.params.token
      let {newPassword, confirmNewPassword} = req.body
      console.log(newPassword, confirmNewPassword);
      if(newPassword == confirmNewPassword){
        let salt = await bcrypt.genSaltSync(allStatus.genSaltSyncValue);
      let hashPassword = await bcrypt.hash(confirmNewPassword, salt);
        let setData = await userModel.updateOne(
          {
            token:token,
          },
          { $set: { password:hashPassword} })
         return successHandler(res, allStatus.OK,allStatus.PASSWORD_CHANGE)
      }else{
        return errorHandler(res, allStatus.BAD_REQUEST, allStatus.PASSWORD_NOT_MATCH)
      }
    } catch (error) {
      return errorHandler(res,allStatus.SERVER_ERROR,allStatus.INTERNAL_ERR)
    }
  }

  module.exports = {
    SignUp,
    login,
    forgetPassword,
    verifyToken,
    resetPassword,
  }