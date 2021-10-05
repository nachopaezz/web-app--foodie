const { Router } = require("express");
const {addRecipe, getRecipeById, getAllRecipes} = require("../controllers/Recipe")

const router = Router()

router.get("/recipes", getAllRecipes)
router.get('/recipes/:id', getRecipeById)
router.post("/recipe", addRecipe)


module.exports = router;