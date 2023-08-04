const { Company, Job, Skill, User } = require("../models/index");

class companyController {
  static async readCompany(req, res, next) {
    try {
      const allGenre = await Company.findAll();
      res.status(200).json(allGenre);
    } catch (error) {
      next(error);
    }
  }
  static async addCompany(req, res, next) {
    try {
      const { name, location, email, description, companyLogo } = req.body;

      await Company.create({
        name,
        location,
        email,
        description,
        companyLogo,
      });
      console.log("berhasil");
      res.status(201).json("Berhasil Membuat Company");
    } catch (error) {
      next(error);
    }
  }

  static async readCompanyById(req, res, next) {
    try {
      const { id } = req.params;
      const foundGenre = await Company.findByPk(id);
      if (!foundGenre) throw { name: "DATA_NOT_FOUND", id };

      res.status(200).json(foundGenre);
    } catch (error) {
      next(error);
    }
  }

  static async updateCompany(req, res, next) {
    // console.log("ihza");
    try {
      const { id } = req.params;
      const { name, location, email, description, companyLogo } = req.body;
      // console.log(req.body);
      await Company.update(
        {
          name,
          location,
          email,
          description,
          companyLogo,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).json({ msg: "Update Success" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCompany(req, res, next) {
    try {
      //   console.log("ihza");
      const { id } = req.params;
      await Company.destroy({ where: { id: id } });
      // console.log("berhasil di delete");
      res.status(200).json({ msg: "Success Delete Genre" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = companyController;
