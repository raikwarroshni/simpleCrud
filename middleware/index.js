module.exports = {
    userValidarionRule: require('./UserMiddleware'),
    validatePassword : require('./UserMiddleware'),
    valid: require('./valid'),
    jwt: require('./jwt'),
    Mail: require('./forgetEmailOtp')
}