const { userModel } = require("../models");
const bcrypt = require("bcrypt");
const { successHandler, errorHandler } = require("../helper/statuscode");
const allStatus = require("../constant/allConstant");
const { issueJWT } = require("../middleware/jwt");
const forgotsendEmailOtp= require("../middleware/forgetEmailOtp")
const sendMail = require('../middleware/forgetEmailOtp');

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

const userSignUp = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    //console.log(firstName,lastName,email,password);
    let salt = await bcrypt.genSaltSync(10);
    let hashPassword = await bcrypt.hash(password, salt);
    let userObj = new userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    let usersave = await userObj.save();
    console.log(usersave, ".....");
    if (usersave) {
      return successHandler(
        res,
        allStatus.CREATED,
        allStatus.USER_SIGNUP_SUCCESS_MSG
      );
    } else {
      return errorHandler(
        res,
        allStatus.BAD_REQUEST,
        allStatus.USER_NOT_SIGNUP
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
const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log(email, password);
    let check = await userModel.findOne({ email });
    console.log(check.password, "check...");
    if (check != null) {
      let checkPassword = await bcrypt.compare(password, check.password);
      console.log(checkPassword, "checkPassword");
      if (checkPassword == true) {
        let payload = {
          id: check._id,
          email: check.email,
        };
        let token = await issueJWT(payload);
        console.log(token, "token");
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

/**
 * @api {get} /user  Show user Profile
 * @apiName showUser
 * @apiGroup User
 * @apiHeader (MyHeaderGroup) {String} authorization Authorization value.
 * @apiSuccessExample {json} [success--response]
 *     HTTP/1.1 200 OK
 *     {
 *  "message": "user details are",
 * "result": {
 *    "id": "61fe47ef97df881d177d41ef",
 *     "firstName": "hemlrgdht",
 *    "lastName": "raikwar",
 *   "email": "somya@yopmail.com",
 *  "created_at": "2022-02-05T09:48:31.212Z",
 * "updated_at": "2022-02-05T09:58:39.901Z"
 *  }
 * }
 * @apiError (Error 400) {string} user not valid
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 internal server error
 *     {
 *       "error": "internal server error"
 *     }
 */
const showUser = async (req, res) => {
  try {
    let { id } = req.user;
    var findData = await userModel.findOne({ _id: id });
    // const {password , ...restvalue} = findData
    const Data = {
      id: findData._id,
      firstName: findData.firstName,
      lastName: findData.lastName,
      email: findData.email,
      created_at: findData.createdAt,
      updated_at: findData.updatedAt,
    };
    //console.log(Data,"restvalue");
    if (findData) {
      return successHandler(res, allStatus.OK, allStatus.USER_DEATILS, Data);
    } else {
      return errorHandler(res, allStatus.BAD_REQUEST, allStatus.USER_NOT_VALID);
    }
  } catch (error) {
    return errorHandler(res, allStatus.SERVER_ERROR, allStatus.INTERNAL_ERR);
  }
};

/**
 * @api {get} /user  Show all user Profile
 * @apiName showAllUser
 * @apiGroup User
 * @apiHeader (MyHeaderGroup) {String} authorization Authorization value.
 * @apiSuccessExample {json} [success--response]
 *     HTTP/1.1 200 OK
 *     {
 *  "message": "user details are",
 * "result": {
 *    "id": "61fe47ef97df881d177d41ef",
 *     "firstName": "hemlrgdht",
 *    "lastName": "raikwar",
 *   "email": "somya@yopmail.com",
 *  "created_at": "2022-02-05T09:48:31.212Z",
 * "updated_at": "2022-02-05T09:58:39.901Z".......
 *  }
 * }
 * @apiError (Error 400) {string} user not valid
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 internal server error
 *     {
 *       "error": "internal server error"
 *     }
 */

const showAllUser = async (req, res) => {
  try {
    let { _id } = req.user;
    let result = await userModel.find({ _id: { $ne: _id } });
    let arr = [];
    for (let i = 0; i < result.length; i++) {
      var data = {
        user_id: result[i]._id,
        firstName: result[i].firstName,
        lastName: result[i].lastName,
        email: result[i].email,
        created_at: result[i].createdAt,
        updated_at: result[i].updatedAt,
      };
      arr.push(data);
    }
    console.log(arr, "arr");
    if (result) {
      return successHandler(res, allStatus.OK, allStatus.FOUND_RECORD, arr);
    } else {
      return successHandler(res, allStatus.OK, allStatus.NOT_FOUND, arr);
    }
  } catch (error) {
    console.log(error);
    return errorHandler(
      res,
      allStatus.SERVER_ERROR,
      allStatus.INTERNAL_ERR,
      error
    );
  }
};

/**
 * @api {get} /user  delete user Profile
 * @apiName deleteUser
 * @apiGroup User
 * @apiHeader (MyHeaderGroup) {String} authorization Authorization value.
 * @apiSuccessExample {json} [success--response]
 *     HTTP/1.1 200 OK
 *     {
 *  "message": "user deleted successfully"
 * }
 * @apiError (Error 400) {string} user not valid
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 internal server error
 *     {
 *       "error": "internal server error"
 *     }
 */

const deleteUser = async (req, res) => {
  try {
    let { id } = req.user;
    let userdelete = await userModel.deleteOne({ id });
    console.log(userdelete, ".....");
    return successHandler(res, allStatus.OK, allStatus.DEL_MSG);
  } catch (error) {
    return errorHandler(res, allStatus.SERVER_ERROR, allStatus.INTERNAL_ERR);
  }
};

/**
 * @api {post} /user Edit User information
 * @apiName editUser
 * @apiGroup User
 * @apiBody {string} [firstname] [user first name]
 * @apiBody {string} [lastname] [user last name]
 * @apiSuccessExample {json} [success--response]
 *     HTTP/1.1 201 created
 *     {
 *      "message": "user edited successfully"
 *     }
 * @apiError (Error 500) {string} internal server error
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 internal server error
 *     {
 *       "error": "internal server error"
 *     }
 */

const editUser = async (req, res) => {
  try {
    let { id } = req.user;
    console.log(id);
    let { firstName, lastName } = req.body;
    console.log(firstName, lastName);
    let userUpdate = await userModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $set: { firstName: firstName, lastName: lastName } }
    );
    return successHandler(res, allStatus.OK, allStatus.RECORD_UPDATE_MSG);
  } catch (error) {
    return errorHandler(res, allStatus.SERVER_ERROR, allStatus.INTERNAL_ERR);
  }
};

/**
 * @api {get} /user  truncate user collection
 * @apiName truncateUser
 * @apiGroup User
 * @apiSuccessExample {json} [success--response]
 *     HTTP/1.1 200 OK
 *     {
 *  "message": "table truncate successfully"
 * }
 * @apiError (Error 400) {string} user not valid
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 internal server error
 *     {
 *       "error": "internal server error"
 *     }
 */

const truncateTable = async (req, res) => {
  try {
    // let {id} = req.user
    // console.log(id);
    let deletedata = await userModel.deleteMany({});
    console.log(deletedata, ".....deleteData");
    return successHandler(res, allStatus.OK, allStatus.TRUNCATE);
  } catch (error) {
    return errorHandler(res, allStatus.SERVER_ERROR, allStatus.INTERNAL_ERR);
  }
};

const forgetPassword = async (req, res) =>{
  try {
    let { email } = req.body
    var otp = Math.floor(100000 + Math.random() * 900000);
    let findData = await userModel.findOne({email:email})
    console.log(findData,otp,"findData");
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
    console.log(token,"toekn");
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
      let salt = await bcrypt.genSaltSync(10);
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
  userSignUp,
  userLogin,
  showUser,
  showAllUser,
  deleteUser,
  editUser,
  truncateTable,
  forgetPassword,
  verifyToken,
  resetPassword
};

  