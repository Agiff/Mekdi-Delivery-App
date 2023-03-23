const errorHandler = (err, req, res, next) => {
  console.log(err);

  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({ message: err.errors[0].message });
      break;

    case 'EmailPasswordRequired':
      res.status(400).json({ message: 'Email and Password is required' });
      break;

    case 'EmailPasswordInvalid':
      res.status(401).json({ message: 'Email or Password is invalid' });
      break;

    case 'InvalidToken':
    case 'JsonWebTokenError':
      res.status(401).json({ message: 'Invalid Token' });
      break;

    case 'NotFound':
      res.status(404).json({ message: 'Data not found' });
      break;
  
    default:
      res.status(500).json({ message: 'Internal Server Error' });
      break;
  }
}

module.exports = errorHandler;