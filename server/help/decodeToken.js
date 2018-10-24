const jwt = require('jsonwebtoken');

const decode = (token) => {
    return jwt.decode(token);
}

module.exports = decode;