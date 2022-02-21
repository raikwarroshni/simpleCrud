const { userModel } = require("../models");
const { successHandler, errorHandler } = require("../helper/responseHandler");
const allStatus = require("../constant/constant");

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
const userDetail = async (req, res) => {
  try {
    let { id } = req.user;
    var findData = await userModel.findOne({ _id: id }).select({
      firstName: 1,
      lastName: 1,
      email: 1,
      createdAt: 1,
      updatedAt: 1,
    });
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

const userList = async (req, res) => {
  try {
    let { _id } = req.user;
    let result = await userModel.find({ _id: { $ne: _id } }).select({
      firstName: 1,
      lastName: 1,
      email: 1,
      createdAt: 1,
      updatedAt: 1,
    });
    if (result) {
      return successHandler(res, allStatus.OK, allStatus.FOUND_RECORD, result);
    } else {
      return successHandler(res, allStatus.OK, allStatus.NOT_FOUND, result);
    }
  } catch (error) {
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

const updateUser = async (req, res) => {
  try {
    let { id } = req.user;
    let { firstName, lastName } = req.body;
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

const truncateDatabase = async (req, res) => {
  try {
    let deletedata = await userModel.deleteMany({});
    return successHandler(res, allStatus.OK, allStatus.TRUNCATE);
  } catch (error) {
    return errorHandler(res, allStatus.SERVER_ERROR, allStatus.INTERNAL_ERR);
  }
};

const userDetails = async (req, res) => {
  try {
    let id = req.params.id;
    var findData = await userModel.findOne({ _id: id }).select({
      firstName: 1,
      lastName: 1,
      email: 1,
      createdAt: 1,
      updatedAt: 1,
    });
    if (findData) {
      return successHandler(res, allStatus.OK, allStatus.USER_DEATILS, Data);
    }
  } catch (error) {
    return errorHandler(res, allStatus.SERVER_ERROR, allStatus.INTERNAL_ERR);
  }
};
module.exports = {
  userDetail,
  userList,
  deleteUser,
  updateUser,
  truncateDatabase,
  userDetails,
};
