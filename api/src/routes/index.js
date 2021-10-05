const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRoutes = require("./Recipe")
const typeDietRoutes = require("./TypeDiet")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(recipeRoutes);
router.use(typeDietRoutes);

module.exports = router;