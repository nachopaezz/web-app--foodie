
const server = require('./src/app.js');
const { conn, Diet } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    const dietas = ["Gluten Free","Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian","Vegan","Pescetarian","Paleo","Primal","Whole30", "Low Fodmap", "Fruitarian"];
    dietas.forEach(async (element) => await Diet.create({name: element}));
    console.log('Tipos de dieta pre-cargadas')
  });
});