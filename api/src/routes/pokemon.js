const axios=require("axios");
const Router= require("express");
const {Pokemon, Type}= require("../db");
const db = require('../db.js');
const funcType=require("./types")

const exPokeNumber=0
//386 hasta 3ra generacion
const pokeNumber=386
// const exPokeNumber2=450

const apiUrl1=`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${pokeNumber}`




const getAllPokeApi1=async ()=>{
   
    const api= await axios.get(apiUrl1)
    // const api2= await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${exPokeNumber2}&limit=${pokeNumber}`)
    // console.log("API:",api.data.results.length)
    // console.log("API2",api2.data.results.length)
    // const api3={...api,...api2}
    // console.log("API3",api3.data.results.length)
    const apiPromises= api.data.results.map(async function(el){
        
        return axios.get(el.url).then(el=>el.data);
    });
    const allPokeApi= await Promise.all(apiPromises);
    // console.log("ALLPOKEAPI:",allPokeApi)
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
    console.log("OBJPOKE1",objPoke[0])
   return objPoke;
}




const chargePokemons= async()=>{
    // await Pokemon.bulkCreate(await getAllPokeApi())
const bulkData=await getAllPokeApi1();
// console.log("BULKDATA:",bulkData[0])

for (let i=0;i<pokeNumber;i++){
    // console.log("BULKDATA","[",i,"]",bulkData[i])
    const {id,name,hp,attack,defense,speed,height,weight,img,type}= bulkData[i]

    let newPoke= await Pokemon.create({
        id,
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
        created:false,
    })
    if(type){
        
        const dbFilt= await funcType.getTypeDb(type);
        
        await newPoke.addTypes(dbFilt);
        // console.log("NEWPOKE",newPoke)
    }
}
    
}



const getAllPokeApiDb=async()=>{
    
    const dbPoke= await getPokeDb();
    
    
    if(dbPoke.length<pokeNumber){
        const apiPoke= await getAllPokeApi1();
     
        const bulk=await chargePokemons();

        console.log("There are no Pokes in the db, we will proceed to load them")
        const dbPoke2= await getPokeDb();
        return dbPoke2;
    }else{
        console.log("Showing all Pokemons")
        const dbPoke= await getPokeDb();
        return dbPoke;
    }
}


const getPokeDb= async ()=>{
    
    const db=await Pokemon.findAll({
        include:{
            model:Type,
            attributes:['name'],
        through:{
            atributes:[],
        },
    }
     
    });

    const objPokeDb= db.map(data=>{
        return {
        id:data.dataValues.id,
        name:data.dataValues.name,
        hp:data.dataValues.hp,
        attack:data.dataValues.attack,
        defense:data.dataValues.defense,
        speed:data.dataValues.speed,
        height:data.dataValues.height,
        weight:data.dataValues.weight,
        img:data.dataValues.img,
        type:data.dataValues.Types.map(el=>el.dataValues.name),
        created:data.dataValues.created,
        }})

    return objPokeDb;
}


const getAllpoke= async()=>{
    // const apiPoke= await getPokeApi();
    const dbPoke= await getPokeDb();
    const allPoke = [...dbPoke,...apiPoke];
    return allPoke;
}

const getPokeIdApi=async(id)=>{
const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data=api.data
    const obj2={
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
    }
   
return obj2;
    
}

const getPokeIdDb=async(id)=>{
    
    
        const db= await Pokemon.findByPk(id,{
            include:{
                model:Type,
                attributes:['name'],
            through:{
                atributes:[],}}
            });
    
        const objPokeDb= {
            id:db.dataValues.id,
            name:db.dataValues.name,
            hp:db.dataValues.hp,
            attack:db.dataValues.attack,
            defense:db.dataValues.defense,
            speed:db.dataValues.speed,
            height:db.dataValues.height,
            weight:db.dataValues.weight,
            img:db.dataValues.img,
            type:db.dataValues.Types.map(el=>el.dataValues.name),
            created:db.dataValues.created,
        }
    return objPokeDb;
}





module.exports={
    getPokeIdDb,
    getPokeIdApi,
    getAllpoke,
    getPokeDb,
    getAllPokeApi1,
    getAllPokeApiDb,
    // getPokeApi,
    
}