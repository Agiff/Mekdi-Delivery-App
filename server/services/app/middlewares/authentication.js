const { User } = require('../models');
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: 'InvalidToken' };

    const payload = verifyToken(access_token);

    const currentUser = await User.findByPk(payload.id);
    if (!currentUser) throw { name: 'InvalidToken' };
    
    req.user = {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;