//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {Pokemon, Types} = require ('./src/db.js');
const axios = require('axios');
const BDprueba = require('./src/bdprueba/BDprueba');



// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    await axios('https://pokeapi.co/api/v2/type')
      .then(response=>{
        var i=0;
        response.data.results.map(e=>{
          Types.create({
            id_type: i+1,
            name: e.name,
            });
          i++;
        })
      })
      .catch(error=>console.log(error))
    console.log('tipos precargados');
    
//PRECARGA DE POKEMON PARA PRUEBAS
    BDprueba.map(async (pokePrueba)=>{
      await Pokemon.create({
        id_pokemon: pokePrueba.id,
        imagen: pokePrueba.imagen,
        name: pokePrueba.name,
        vida: pokePrueba.vida,
        fuerza: pokePrueba.fuerza, 
        defensa: pokePrueba.defensa,
        velocidad: pokePrueba.velocidad,
        altura: pokePrueba.altura,
        peso: pokePrueba.peso,
    })
      const types = await Types.findAll({
        where:{name: [pokePrueba.type1,pokePrueba.type2]}
      });
      const pokemon = await Pokemon.findOne({
        where:{name: pokePrueba.name},
      });
      await pokemon.setTypes(types);
      const pokSent = await Pokemon.findOne({
        where:{name: pokePrueba.name},
        include: Types,
      });
    });
    console.log('Pokemon Precargados');

  })

  
});
