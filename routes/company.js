const express = require("express");
const companyController = require("../controllers/companyController");
const auth = require("../middlewares/authentication");
const router = express.Router();

router.use(auth);
router.get("/", companyController.readCompany);
router.post("/", companyController.addCompany);
router.put("/:id", companyController.updateCompany);
router.get("/:id", companyController.readCompanyById);
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
