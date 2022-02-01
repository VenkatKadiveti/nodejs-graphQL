var jwt = require('jsonwebtoken');

var verifyToken = (req, res, next) => {
    const authToken = req.get('Authorization');
    if (!authToken) {
        req.isAuth = false;
        return next();
    }
    const token = authToken.split(' ')[1];// Bearer token
    if (!token || token === '') {
        req.isAuth = false;
        return next();
    }
    let decodedToknen;
    try {
        decodedToknen = jwt.verify(token, 'miraclesoft.com');
    }
    catch (Err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToknen) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    next()
}

module.exports = verifyToken;