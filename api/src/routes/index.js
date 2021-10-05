const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const typesRouter = requiere('./types.js');
const recipe = require('./recipe.js');
const recipes = require('./recipes.js');
const diet = require('./diets.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/types', typesRouter);
router.use('/recipe', recipe);
router.use('/recipes', recipes);
router.use('/types', diet);

module.exports = router