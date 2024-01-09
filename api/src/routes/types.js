const axios=require("axios");
const Router= require("express");
const {Pokemon, Type}= require("../db");




const getTypeApi= async()=>{
    const promise= await axios.get('https://pokeapi.co/api/v2/type');

    const objType= promise.data.results.map((type)=>{
        return{
            name:type.name,
            id:type.id,
        }
    });
    return objType;
}

const charge= async()=>{
    await Type.bulkCreate(await getTypeApi())
}

const getTypeDb=async(types)=>{
    
    if(types){
        const db=await Type.findAll({
            where:{
                name:types
            }
        })
        
        return db;
    }else{
        
        const db=await Type.findAll();
        return db;
    }
    
}

const getAllTypes=async()=>{
    
    const dbType= await getTypeDb();
    
    
    if(dbType.length===0){
        const apiType= await getTypeApi();
        const bulk=await charge();
        console.log("There are no types in the db, we will proceed to load them")
        const dbType2= await getTypeDb();
        return dbType2;
    }else{
        console.log("Showing all types")
        const dbType= await getTypeDb();
        return dbType;
    }
}
module.exports={
    getTypeApi,
    getTypeDb,
    getAllTypes,
    // charge,
}