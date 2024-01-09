const { Router } = require('express');
const axios=require("axios");
const {Pokemon,Type}=require("../db.js");
const funcType=require("./types")
const funcPoke=require("./pokemon")
const db = require('../db.js');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//FUNCIONES CONTROLADORAS

 


//FIN FUNCIONES CONTROLADORAS


router.get("/",async(req, res)=>{
    const pokeNumber=400
    const api= await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${pokeNumber}`)
    console.log("DATA",api.data.results[0], api.data.results[pokeNumber-1])
    const apiPromises= api.data.results.map(async function(el){
        return axios.get(el.url).then(el=>el.data);
    });
    
    const allPokeApi= await Promise.all(apiPromises);
    console.log("ALLPOKEAPI:",allPokeApi[0])

    const getInfPoke=async (api)=>{
        const objPoke= allPokeApi.map(data=>{
            return {
            id:data.id,
            name:data.name,
            hp:data.stats[0].base_stat,
             attack:data.stats[1].base_stat,
            defense:data.stats[2].base_stat,
            speed:data.stats[5].base_stat,
            height:data.height,
            weight:data.weight,
            img:data.sprites.other.home.front_default,
            type:data.types.map(el=>el.type.name),
            created:false
            }
        });
    }
    
    console.log("OBJPOKE:",objPoke[0])
res.json(objPoke)
    //  res.send( "Hi I'm the /")
    
})

router.delete("/pokemons/:id",async(req,res)=>{
    var {id}= req.params
    try{
        if(id.length<5){
            console.log("You can't delete a Pokémon from API")
            res.status(400).json({msg:"You can't delete a Pokémon from API"})
        }else{
            await Pokemon.destroy({
                where: {
                    id: id
                  }
                }),
            
            res.send("The Pokémon was deleted from db")
        
        }
       

    }catch(e){
        console.log("This Pokémon can't be deleted")
    }
})



router.get("/pokemons",async(req, res)=>{
    
    try{
    const name= req.query.name
    let allPokes= await funcPoke.getAllPokeApiDb();
    // console.log("ALLPOKES",allPokes)

    if(name){
        let pokeName=allPokes.filter(el => el.name.toLowerCase()===(name.toLowerCase()));
        pokeName.length?
        res.json(pokeName) :
        res.status(404).send('Pokémon not found')

        }else{
            res.json(allPokes)
        }
    }catch(e){
        console.log(e)
        res.status(400).json({msg:"We couldn't find the pokémons"})

    }
    })

router.get("/types",async (req,res)=>{
    
    try{
        
        const all= await funcType.getAllTypes();
        res.json(all)
    }catch(e){
        res.status(400).json({msg:"We couldn't charge the types"})
    }
})


router.get("/pokemons/:id", async (req,res)=>{
//     GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
var {id}= req.params

if(!id) res.status(400).json({msg:"Enter a ID"});
try{
    if(id.length<5){
        console.log("The pokemon will be searched in api")
        const apiId= await funcPoke.getPokeIdApi(id);
        res.json(apiId)
    }else{
        console.log("The pokemon will be searched in db")
        const dbId= await funcPoke.getPokeIdDb(id)
        // console.log("dbId",dbId)
        res.json(dbId)
    }
    
}catch(e){
    res.status(404).json({msg:"Pokémon not found"})
}
});



router.post("/pokemons",async(req,res)=>{
const {name,hp,attack,defense,speed,height,weight,img,types}= req.body

    if(!name){
        res.status(400).json({msg:"You must put a Name"})
    }
    if(typeof name!=="string"){
        res.status(400).json({msg:"Name must be a string"})
    }

try{
    
    let newPoke= await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img
    })



   if(types){
    const dbFilt= await funcType.getTypeDb(types);
    await newPoke.addTypes(dbFilt);
    res.send("Pokémon created with Types")
   }else{
    
    res.send("The pokemon was created but has no types")
   }
    
    

}catch(e){
    // console.log(e)
    res.status(400).json({msg:"Couldn't create the pokémon"})
}


})
module.exports = router;
