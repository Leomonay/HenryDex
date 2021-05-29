const { Router } = require('express');
const axios = require('axios');
const { Pokemon, Types, PokemonTypes} = require('../db.js');
const sequelize = require("sequelize")
const Op = sequelize.Op;
const BDprueba =require('../bdprueba/BDprueba');
const { Redirect } = require('react-router-dom');
const { push } = require('../bdprueba/BDprueba');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

 
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async function (req,res){
  res.send('Henry Pokemon Data Base')
  });


var idList = [];
var firstFreeId=1

async function startServer(){
  await axios('https://pokeapi.co/api/v2/pokemon/')
  .then(response=>count=response.data.count);
  var idsApiExt = await axios('https://pokeapi.co/api/v2/pokemon?limit=2000');
  idList=idsApiExt.data.results.map(e=>parseInt(e.url.slice(34,e.url.length-1),10));
  while(idList.find(e=>e===firstFreeId)){
    firstFreeId++;
  }
}
startServer();






router.get('/pokemons', async function (req,res){
  if(req.query.count){
    var idsBase=0;
    await Pokemon.findAll({
    })
      .then(response=>{
        idsBase=response.length
      })
      .catch(error=>res.json('error'));
    idsBase=idsBase.sort((a,b)=>a-b);
    console.log(idsBase);
    if (req.query.count==='both'){
      res.send(firstFreeId+idsBase.length)
    }else if(req.query.count==='api'){
      res.send(firstFreeId-1)
    }else if(req.query.count==='base'){
      res.send(idsBase.length)
    }
  }else{
  if(req.query.page){
    var min=(req.query.page-1)*12+1;
    var max=12*req.query.page;
  }else{
    var min=1;
    var max=12;
  }
  var pokeData=[];
  if (req.query.name){
    var response = await Pokemon.findOne({
      where:{name: req.query.name},
      include: Types
    })
    if(!response){
      console.log('Buscando en API')
      axios('https://pokeapi.co/api/v2/pokemon/'+req.query.name)
      .then(response=>{
        console.log('ENCONTRADO EN BD: '+response.data.name)
        var poke={
          id_poke: response.data.id,
          imagen: response.data.sprites.other['official-artwork'].front_default,
          name: response.data.name,
          type: {
            type1: response.data.types[0].type.name,
            type2: response.data.types[1]? response.data.types[1].type.name : '-'
          },
          vida: response.data.stats.filter(e=>e.stat.name==="hp")[0].base_stat,
          fuerza: response.data.stats.filter(e=>e.stat.name==="attack")[0].base_stat,
          defensa: response.data.stats.filter(e=>e.stat.name==="defense")[0].base_stat,
          velocidad: response.data.stats.filter(e=>e.stat.name==="speed")[0].base_stat,
          altura: response.data.height/10+' m',
          peso: response.data.weight/10+' kg',
        }
        res.json(poke)
      })
      .catch(error=>res.sendStatus(404))

    }else{console.log('ENCONTRADO EN BD: '+response.dataValues.name);
      var poke={
        id_poke: response.dataValues.id_pokemon,
        imagen: response.dataValues.imagen,
        name: response.dataValues.name,
        type: {
          type1: response.dataValues.types[0].dataValues.name,
          type2: response.dataValues.types[1]? response.dataValues.types[1].dataValues.name : '-'
        },
        vida: response.dataValues.vida,
        fuerza: response.dataValues.fuerza,
        defensa: response.dataValues.defensa,
        velocidad: response.dataValues.velocidad,
        altura: response.dataValues.altura+' m',
        peso: response.dataValues.peso+' kg',
      }
      res.json(poke)
    }
  
  }else{
    if(!req.query.base){
      console.log('Buscando en API&BASE...')
      var search = [];
      var pokeData = [];
      for(i=min;i<=max;i++){
      search[i]=
        axios('https://pokeapi.co/api/v2/pokemon/'+i)
        .then(response=>{
          var poke={
            id_poke: response.data.id,
            imagen: response.data.sprites.other['official-artwork'].front_default,
            name: response.data.name,
            type1: response.data.types[0].type.name,
            type2: response.data.types[1]? response.data.types[1].type.name : '-',
          }
          pokeData.push(poke)
        })
        .catch(err=>console.log('error'))
      }
    
      await Promise.all(search)
        .catch(error=>console.log('error'))
      pokeData=pokeData.sort((a,b)=>a.id_poke-b.id_poke)
      if(pokeData.length===max-min+1){
        res.json(pokeData);
      }else{
        var pokeSearch=[];
        await Pokemon.findAll({
          include: Types
          })
          .then(response=>{
            Object.entries(response).map(e=>e[0]).map(index=>{
              var poke={
                id_poke: response[index].dataValues.id_pokemon,
                imagen: response[index].dataValues.imagen,
                name: response[index].dataValues.name,
                type: {
                  type1: response[index].dataValues.types[0].dataValues.name,
                  type2: response[index].dataValues.types[1]? response[index].dataValues.types[1].dataValues.name : '-'
                }
              }
              pokeSearch.push(poke);
            })
          })
        pokeSearch=pokeSearch.sort((a,b)=>a.id_poke-b.id_poke);
      }
      while(pokeData.length<max-min&&pokeSearch.length>0){
        pokeData.push(pokeSearch.shift())
      }
      pokeData.map(e=>delete(e.id_poke))
      res.json(pokeData)
      .catch(error=>console.log('error'));
      ;

    }else if(req.query.base==='base'){
      console.log('Buscando en BASE...')
      var pokeSearch=[];
      var pokeData=[];
      await Pokemon.findAll({
        include: Types
      })
      .then(response=>{
        Object.entries(response).map(e=>e[0]).map(index=>{
          var poke={
            id_poke: response[index].dataValues.id_pokemon,
            imagen: response[index].dataValues.imagen,
            name: response[index].dataValues.name,
            type: {
              type1: response[index].dataValues.types[0].dataValues.name,
              type2: response[index].dataValues.types[1]? response[index].dataValues.types[1].dataValues.name : '-'
            }
          }
          pokeSearch.push(poke);
        })
      })
      .catch(error=>res.json('error'))
      pokeSearch=pokeSearch.sort((a,b)=>a.id_poke-b.id_poke)

      var i=min;
      while(pokeSearch[i-1]&&pokeData.length<12){
        pokeData.push(pokeSearch[i-1]);
        i++;
      }
      pokeData.map(e=>delete(e.id_poke))
      res.json(pokeData)



    }else if(req.query.base==='api'){
        console.log('Buscando en API...')
        var search = [];
        var pokeData = [];
        for(i=min;i<=max;i++){
        search[i]=
          axios('https://pokeapi.co/api/v2/pokemon/'+i)
          .then(response=>{
            var poke={
              id_poke: response.data.id,
              imagen: response.data.sprites.other['official-artwork'].front_default,
              name: response.data.name,
              type1: response.data.types[0].type.name,
              type2: response.data.types[1]? response.data.types[1].type.name : '-',
            }
            pokeData.push(poke)
          })
          .catch(err=>console.log('error'))
        }
      
        await Promise.all(search)
        pokeData=pokeData.sort((a,b)=>a.id_poke-b.id_poke)
        pokeData.map(e=>delete(e.id_poke))

        res.json(pokeData);
        }
      
    }
  }
});







router.get('/types',(req,res)=>{
  Types.findAll({
  })
  .then(response=>res.json(response.map(e=>e.dataValues.name)));
})




router.get('/pokemons/:idPokemon', async function (req,res){

  if(parseInt(req.params.idPokemon)){
    console.log('Buscando en BD por ID')
    var response = await Pokemon.findOne({
      where:{id_pokemon: parseInt(req.params.idPokemon)},
      include: Types
    })
  }else{
    console.log('Buscando en BD por name')
    var response = await Pokemon.findOne({
      where:{name: req.params.idPokemon},
      include: Types
    })
  }
  if(!response){
    console.log('Buscando en API')
    axios('https://pokeapi.co/api/v2/pokemon/'+req.params.idPokemon)
    .then(response=>{
      console.log('ENCONTRADO EN BD: '+response.data.name)
      var poke={
        id_poke: response.data.id,
        imagen: response.data.sprites.other['official-artwork'].front_default,
        name: response.data.name,
        type: {
          type1: response.data.types[0].type.name,
          type2: response.data.types[1]? response.data.types[1].type.name : '-'
        },
      }
      res.json(poke)
    })
    .catch(error=>res.send('error'))

  }else{console.log('ENCONTRADO EN BD: '+response.dataValues.name);
    var poke={
      id_poke: response.dataValues.id_pokemon,
      imagen: response.dataValues.imagen,
      name: response.dataValues.name,
      type: {
        type1: response.dataValues.types[0].dataValues.name,
        type2: response.dataValues.types[1]? response.dataValues.types[1].dataValues.name : '-'
      },
    }
    res.json(poke)
  }
});






router.post('/pokemons', async function (req,res){
  //cantidad de registros en API
  // const idsApiExt = await axios('https://pokeapi.co/api/v2/pokemon?limit=2000');
  // idList=idsApiExt.data.results.map(e=>parseInt(e.url.slice(34,e.url.length-1),10));
  // var ids=1;
  //   while(idList.find(e=>e===id)){
  //     ids++;
  //   }

  //Al primer id Libre le sumo la cantidad de registros de la base
  const idsEnBase = await Pokemon.findAll();
  newId=firstFreeId+idsEnBase.length;

  await Pokemon.create({
    id_pokemon: newId,
    imagen: req.body.imagen,
    name: req.body.name,
    vida: req.body.vida,
    fuerza: req.body.fuerza, 
    defensa: req.body.defensa,
    velocidad: req.body.velocidad,
    altura: req.body.altura,
    peso: req.body.peso,
  });

    const types = await Types.findAll({
      where:{name: [req.body.type1,req.body.type2]}
    });
    const pokemon = await Pokemon.findOne({
      where:{name: req.body.name},
    });
    await pokemon.setTypes(types);
    const pokemonRes = await Pokemon.findOne({
      where:{name: req.body.name},
      include: Types
    });
    res.json(pokemonRes);

});




router.get('/query', async function (req,res){
  axios('https://pokeapi.co/api/v2/pokemon?limit=100&offset=83')
  .then(response=>{
    res.json(response.data.results.map(e=>e.name))
  })

});




module.exports = router;
