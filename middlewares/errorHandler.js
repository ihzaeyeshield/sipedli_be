function errorHandler(error, req, res, next) {
  // console.log(req.params.id);
  // console.log(req);
  let name = error.name;
  let code;
  let msg;

  console.log(error);
  switch (name) {
    case "SequelizeValidationError":
      code = 400;
      msg = error.errors.map((e) => {
        return e.message;
      });
      // msg=error.errors[0].message
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      msg = error.errors.map((e) => {
        return e.message;
      });
      // msg=error.errors[0].message
      break;
    case "invalid_credentials":
      code = 401;
      msg = "Invalid Email or Password";
      break;
    case "DATA_NOT_FOUND":
      code = 404;
      msg = `Data ${error.id} Not Found `;
      break;
    case "DATA_NOT_FOUNDS":
      code = 404;
      msg = `Data Not Found`;
      break;
    case "Unauthorized":
      code = 401;
      msg = "Please Login First";
      break;
    case "JsonWebTokenError":
      code = 401;
      msg = "Please Login First";
      break;
    case "FORBIDDEN":
      code = 403;
      msg = "Do not have access";
      break;
    default:
      code = 500;
      msg = "Internal Server Error";
      break;
  }
  res.status(code).json({ msg });
}
module.exports = errorHandler;
