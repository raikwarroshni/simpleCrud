

const successHandler = (res, statuscode, message, result)=>{
    res.status(statuscode).json({message, result})
}

const errorHandler = (res, statuscode, message, error)=>{
    console.log(error)
    res.status(statuscode).json({message, error})
}

module.exports ={
    successHandler,
    errorHandler
}