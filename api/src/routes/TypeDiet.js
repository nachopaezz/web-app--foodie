const { Router } = require("express");
const { getDiets } = require("../controllers/TypeDiet");

const router = Router();

router.get("/types", getDiets)

module.exports = router;