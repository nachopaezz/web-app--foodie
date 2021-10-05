const express = require('express')
const router = express.Router()
const axios = require('axios');
require('dotenv').config();
const { Recipe, Diet, Op } = require('../db');
const {YOUR_API_KEY, spoonacularURL} = process.env;


const getApiInfo = async () => {
    try
    {
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${YOUR_API_KEY}&number=100`);
        const { results } = resAxios.data ;

        if (results.length > 0) {

            let response = await results?.map((result) => {
                return {
                    name: result.title,
                    vegetarian: result.vegetarian,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree,
                    image: result.image,
                    idApi: result.id,
                    score: result.spoonacularScore,
                    healthScore: result.healthScore,
                    types: result.dishTypes?.map(element => element),
                    diets: result.diets?.map(element => element),
                    summary:result.summary,
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                }
            })

        return response;
    }
    }catch (e) {
        return ('error')
    }
}

const getApiByName = async (name) => {
    try{
        const resAxios = await axios.get(`${spoonacularURL}/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${YOUR_API_KEY}`);
        const { results } = resAxios.data;

        let response = results?.map((result) => {
            return {
                name: result.title,
                vegetarian: result.vegetarian,
                vegan: result.vegan,
                glutenFree: result.glutenFree,
                dairyFree: result.dairyFree,
                image: result.image,
                idApi: result.id,
                score: result.spoonacularScore,
                healthScore: result.healthScore,
                types: result.dishTypes?.map(element => element),
                diets: result.diets?.map(element => element),
                summary:result.summary,
                steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
            }
        })
    return response
    }catch(err) {
        return ('error')
    }
}

const getDBByName = async (name) => {
    try{
        const DBInfo = await getDBInfo();
        const filtByName = DBInfo.filter(recipe => recipe.name.includes(name))
        return filtByName
    }catch(err){
        return err
    }
}

const getInfoByName = async (name) => {
    try{
        const apiByName = await getApiByName(name)
        const DBByName = await getDBByName(name)
        const infoTotal = apiByName.concat(DBByName)
        return infoTotal
    }catch(err) {
        return ('error')
    }
}

const getDBInfo = async () => {
    try{
        return await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                    attributes: []
                }
            }
        })
    }catch(err) {
        return ('error')
    }
}

const getAllInfo = async () => {
    try{
        const apiInfo = await getApiInfo()
        const bdInfo = await getDBInfo()
        const infoTotal = apiInfo.concat(bdInfo)
        return infoTotal
    }catch(err) {
        return ('error')
    }
}


router.get('/', async (req, res) => {
    const { name } = req.query

    if (name) {

        const infoByName = await getInfoByName(name)
        if (infoByName !== 'error'){
            infoByName.length > 0 ? res.json(infoByName) : res.status(400).json({ message: 'no se encontraron coincidencias'});
        }else{
            res.status(404).json({ message: 'Error en la búsqueda de datos'})
        }

    }else{

        const allDate = await getAllInfo()
        if (allDate !== 'error'){
            res.json(allDate);
        }else{
            res.status(404).json({message:'Error en la búsqueda de datos'})
        }

    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try{
        if (id.length > 12){
            const dataDB = await Recipe.findByPk(id,{
                include: {
                model: Diet,
                atributes: ["name"],
                through: {
                    attributes: [],
                    },
                },
            });
            if (dataDB){
                res.json(dataDB)
            }else{
                res.status(404).json({messaje:'no se obtuvo resultados'})
            }
        }else{

            const resAxios = await axios.get(`${spoonacularURL}/recipes/${id}/information?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);

            let obj = {};

            obj = {
                name: resAxios.data.title,
                vegetarian: resAxios.data.vegetarian,
                vegan: resAxios.data.vegan,
                glutenFree: resAxios.data.glutenFree,
                dairyFree: resAxios.data.dairyFree,
                image: resAxios.data.image,
                idApi: resAxios.data.id,
                score: resAxios.data.spoonacularScore,
                healthScore: resAxios.data.healthScore,
                diets: resAxios.data.diets?.map(element => element),types: resAxios.data.dishTypes?.map(element => element), 
                summary:resAxios.data.summary,
                steps: resAxios.data.instructions}

            if (obj){
                res.json(obj);
            }else{
                res.status(404).json({message: 'no se encontraron coincidencias'})
            }
        }
    }catch(e){
        res.status(404).json({message:'error en la búsqueda'})
    }
})

module.exports = router