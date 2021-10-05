require('dotenv').config();
const { Recipe, Diets } = require("../db")
const { v4: uuidv4 } = require('uuid');
const { YOUR_API_KEY } = process.env;
const axios = require('axios');
const { Sequelize } = require("sequelize")

function addRecipe(req, res, next) {
  const { title, summary, spoonacularScore, healthScore, instructions, diets, image } = req.body;
  if (!title || !summary) return res.send({ error: 500, message: "Necesitas ponerle minimo un name y un summary en el body reina" });
  Recipe.create({
    id: uuidv4(),
    title: title,
    summary: summary,
    spoonacularScore: spoonacularScore,
    healthScore: healthScore,
    instructions: instructions,
    image: image || "https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png"
  })
    .then((recipeCreated) => {
      return recipeCreated.addDiets(diets);
    })
    .then(newRecipe => {
      return res.json({
        message: "Creaste una Receta!",
      });
    })
    .catch((error) => next(error));
}

async function getAllRecipes(req, res, next) {
  const q = req.query.name;
  if (!q) {
    try{
    const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${YOUR_API_KEY}&number=100`);
    const infoNeededApi = await recipeApi.data.results.map((recipe) => {
      return {
        title: recipe.title,
        diets: recipe.diets.map((diet) => { return { name: diet } }),
        healthScore: recipe.healthScore,
        summary: recipe.summary,
        image: recipe.image,
        id: recipe.id,
        spoonacularScore: parseInt(recipe.spoonacularScore),
        instructions: recipe.analyzedInstructions
      };
    });
    const recipeDB = await Recipe.findAll({
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: []
        }
      }
    });
    const response = await Promise.all([infoNeededApi, recipeDB])
        let [recipeApiRes, recipeDBres] = response;
        return res.send(
          recipeDBres.concat(recipeApiRes)
        );
        }
      catch(err){(next(err));}
  } else {
    const query = q.toLowerCase();
    try{
    const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${YOUR_API_KEY}&number=100`);
    const infoNeededApi2 = await recipeApi.data.results.map((recipe) => {
      return {
        title: recipe.title,
        diets: recipe.diets.map((diet) => { return { name: diet } }),
        healthScore: recipe.healthScore,
        summary: recipe.summary,
        image: recipe.image,
        id: recipe.id,
        spoonacularScore: parseInt(recipe.spoonacularScore),
        instructions: recipe.analyzedInstructions
      };
    });
    const filteredRecipeApi = await infoNeededApi2.filter(recipe => recipe.title.toLowerCase().includes(query))
    const recipeDB = await Recipe.findAll({
      where: {
        title: {
          [Sequelize.Op.iLike]: `%${query}%`
        },
      },
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: []
        }
      }
    });
    Promise.all([filteredRecipeApi, recipeDB])
      .then((respuesta) => {
        let [filteredRecipeApi, recipeDBres] = respuesta;
        return res.send(
          recipeDBres.concat(filteredRecipeApi)
        );
      })}
      catch(err){(next(err))}
  }
}

async function getRecipeById(req, res) {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${YOUR_API_KEY}`)
    res.json(response.data)
  } catch (error) {
    if (error.response?.status === 404) {
      Recipe.findByPk(req.params.id, {
        include: {
          model: Diets,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      }).then(recipe => {
        if (recipe) return res.json(recipe)
        return res.sendStatus(404)
      })
    } else {
      res.status(500).json({ error: "No pudimos acceder a la receta!" })
    }
  }
}

module.exports = {
  addRecipe,
  getRecipeById,
  getAllRecipes
};