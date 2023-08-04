const { Op } = require("sequelize");
const { Company, Job, Skill, User } = require("../models/index");
const { sequelize } = require("../models");
class JobController {
  static async readJobs(req, res, next) {
    console.log("ihza");
    try {
      let { page, search } = req.query;
      // console.log(search);
      // console.log("ihza");
      page = +page;
      // console.log(page);

      // console.log(req.query.page);
      // console.log(req.user);
      if (!page) {
        page = 0;
      }

      // console.log(page);
      const limit = 100;
      const offset = page * limit;
      let option = {
        limit: limit,
        offset: offset,
        order: [["id", "ASC"]],
        where: { title: { [Op.iLike]: `%%` } },
      };

      if (search) {
        option.where.title = { [Op.iLike]: `%${search}%` };
      }
      if (!req.user) {
        // console.log("ihza vu");
        req.user = {
          role: "client",
        };
      }
      // console.log(req.user.role);
      // if (req.user.role === "admin") {
      option.include = [
        { model: Company },
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
        { model: Skill },
      ];
      // }

      // console.log(option);
      const allJobs = await Job.findAndCountAll(option);
      // console.log(allJobs);
      // console.log(allMovies.count);
      if (allJobs.rows.length === 0) {
        throw { name: "DATA_NOT_FOUNDS" };
      }
      const totalPages = Math.ceil(allJobs.count / limit);
      allJobs.totalPage = totalPages;
      allJobs.currentPage = `${+page + 1}`;

      res.status(200).json(allJobs);
    } catch (error) {
      next(error);
      // res.status(500).json({msg:"internal Server Error"})
    }
  }

  static async createJobs(req, res, next) {
    const t = await sequelize.transaction();
    try {
      // console.log(req.body);
      const { title, description, jobType, company } = req.body.formAdd;
      const authorId = req.user.id;
      const skill = req.body.FormSkill;
      // console.log(req.body.formAdd);
      // console.log(req.body.FormSkill);
      // console.log(skill, { title, description, jobType, companyId });
      // console.log(req.user);
      // const status = "active";
      // console.log("lontongyol");
      // companyId = Number(companyId);
      // const companyId = Number(company);
      // console.log(companyId, "<<<<<<<<<<");
      // console.log("lontonggg");
      // console.log(req.body.formAdd);
      const create = await Job.create(
        {
          title,
          description,
          jobType,
          companyId: company,
          authorId,
        },
        { transaction: t }
      );
      // console.log(create.id);
      // console.log(skill);
      skill.forEach((el) => {
        el.jobId = create.id;
      });
      // console.log(skill);
      // let newArr = [];
      // skill.forEach((e, index) => {
      //   let obj = {
      //     name: e,
      //     level: level[index],
      //     jobId: create.id,
      //   };
      //   newArr.push(obj);
      // });
      // console.log(newArr);

      await Skill.bulkCreate(skill, { transaction: t });

      await t.commit();
      res.status(201).json({
        msg: "Succes Create Job",
        msg2: "Succes Create Skill",
        create,
      });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async readJobId(req, res, next) {
    try {
      const { id } = req.params;
      let option = {
        where: { id: id },
        order: [["id", "ASC"]],
        include: [
          { model: Company },
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          { model: Skill },
        ],
      };
      const jobById = await Job.findOne(option);
      // console.log(jobById);
      if (!jobById) throw { name: "DATA_NOT_FOUND", id };
      // console.log(jobById);

      res.status(200).json(jobById);
    } catch (error) {
      next(error);
      // console.log(error);
      // if (error.name==='notFound') {
      //     res.status(404).json({msg:"Movie Not Found"})
      // }else{

      //     res.status(500).json({msg:"internal Server Error"})
      // }
    }
  }

  static async deleteId(req, res, next) {
    const t = await sequelize.transaction();

    try {
      const { id } = req.params;
      let option = {
        where: { id: id },
      };
      // console.log("lontong");
      // const findMovie = await Movie.findOne(option);
      await Skill.destroy({ where: { jobId: id } }, { transaction: t });
      await Job.destroy(option, { transaction: t });
      // console.log(movieById);
      // if (!movieById) throw { name: "DATA_NOT_FOUND", id };
      // console.log(movieById);
      console.log("berhasil delete");
      await t.commit();
      res.status(200).json({ msg: `succes to delete` });
    } catch (error) {
      await t.rollback();
      next(error);
      // if (error.name==='notFound') {
      //     error={}
      //     res.status(404).json({msg:"Movie Not Found"})
      // }else{
      //     res.status(500).json({msg:"internal Server Error"})
      // }
    }
  }

  static async updateJobByid(req, res, next) {
    const t = await sequelize.transaction();

    try {
      //   console.log("ihza");
      //   console.log(req.params.id);
      const authorId = req.user.id;
      const { title, description, jobType, company } = req.body.formEdit;
      //   console.log(req.user);
      const skill = req.body.FormSkillEdit;
      console.log(req.body);
      const { id } = req.params;
      // console.log(req.params);
      console.log(skill);
      console.log({ title, description, jobType, company });
      // console.log("ihzaa");
      const updateJob = await Job.update(
        {
          title,
          description,
          jobType,
          companyId: company,
          authorId,
        },
        { where: { id: req.params.id } },
        { transaction: t }
      );
      // console.log(updateJob);
      await Skill.destroy(
        {
          where: { jobId: id },
        },
        { transaction: t }
      );
      skill.forEach((el) => {
        el.jobId = id;
      });
      await Skill.bulkCreate(skill, { transaction: t });

      await t.commit();

      res
        .status(200)
        .json({ msg: "Update Success", msg2: "activity added to history" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async patchStatus(req, res, next) {
    try {
      //   console.log("ihza");
      const { status } = req.body;
      const { id } = req.params;
      const beforeupdate = await Movie.findByPk(req.params.id);
      //   console.log(beforeupdate);
      const updateMovie = await Movie.update(
        { status },
        { where: { id: req.params.id } }
      );
      //   console.log(updateMovie);
      if (updateMovie) {
        const title = beforeupdate.title;
        const description = `Movie status with id ${id} has been updated from ${beforeupdate.status} to ${status}`;
        const updatedBy = req.user.email;
        const createHistory = await History.create({
          title,
          description,
          updatedBy,
        });
      }
      res
        .status(200)
        .json({ msg: "Update Success", msg2: "activity added to history" });
    } catch (error) {
      next(error);
    }
  }
  static async detailMovie(req, res, next) {
    const { id } = req.params;
    // console.log(id);

    // console.log(process.env.HAPPI_ID);
    const detailMovie = await Movie.findByPk(id);
    // const cek = await Favorite.findAll({ include: Movie });
    // console.log(cek);
    // console.log(detailMovie);
    // const sendData = "localhost:3000/movies/detail/3";
    // const { data } = await axios.get(
    //   `https://api.happi.dev/v1/qrcode?data=${sendData}&apikey=${process.env.HAPPI_ID}`
    // );

    res.status(200).json(detailMovie);
  }

  static async addFavorite(req, res, next) {
    try {
      const { MovieId } = req.params;

      const UserId = req.user.id;
      const addFavorite = await Favorite.create({
        MovieId,
        UserId,
      });
      res.status(201).json({ msg: "created favorite success" });
    } catch (error) {
      next(error);
    }
  }
  static async favoriteList(req, res, next) {
    try {
      const { id } = req.user;
      const readFavorite = await Favorite.findAndCountAll({
        where: { UserId: id },
        include: Movie,
      });
      // console.log(readFavorite);
      // console.log(readFavorite.rows);
      res.status(200).json(readFavorite);
    } catch (error) {
      next(error);
    }
  }

  static async readSkill(req, res, next) {
    try {
      // console.log("ihza");
      // const { jobId } = req.params;
      // const readSkill = await Skill.findAll({ where: { jobId } });
      const projects = await sequelize.query(
        `SELECT j.id, s.name,s."level"  FROM  "Jobs" j INNER JOIN "Skills" s ON j.id=s."jobId"`,
        {
          model: Skill,
          mapToModel: true, // pass true here if you have any mapped fields
        }
      );
      console.log(projects);
      // console.log(readSkill);
      res.status(200).json(projects);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = JobController;
