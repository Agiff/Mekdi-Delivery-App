class userController {
  static async showUsers(req, res, next) {
    try {
      res.send('duarr');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;