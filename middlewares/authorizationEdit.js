const { Movie } = require("../models/index");

async function authorizationMovieEdit(req, res, next) {
  try {
    if (req.user.role === "admin") {
      next();
    } else {
      let movie = await Movie.findByPk(req.params.id);
      // console.log(movie);
      let id = req.params.id;
      if (!movie) {
        throw { name: "DATA_NOT_FOUND", id };
      }
      if (movie.authorId === req.user.id) {
        next();
      } else {
        throw { name: "FORBIDDEN" };
      }
    }
  } catch (error) {
    next(error);
    // if (error.name === "FORBIDDEN") {
    //     res.status(403).json({msg:"do not have access"})
    // }
  }
}

module.exports = authorizationMovieEdit;
