const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function auth(req, res, next) {
  try {
    let access_token = req.headers.access_token;
    console.log(req.headers.access_token);
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = {
      id: user.id,
      name: user.username,
      role: user.role,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
    // console.log(error.name);
    // if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
    //     res.status(401).json({msg:"Please Login First"})
    // }
  }
}

module.exports = auth;
