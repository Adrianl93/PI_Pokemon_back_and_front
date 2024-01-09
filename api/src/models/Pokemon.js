const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id:{
      type:DataTypes.STRING,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
      allowNull:false,

    },
    

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:false,
      validate:{
      // isAlpha: true, 
      }
    },

    hp:{
      type:DataTypes.INTEGER,
      validate:{
        isInt: true, 
        max: 256,                  
        min: 1, 
      }
    },

    attack:{
      type:DataTypes.INTEGER,
      validate:{
        isInt: true, 
        max: 256,                  
        min: 1, 
      } 
    },
    defense:{
      type:DataTypes.INTEGER,
      validate:{
        isInt: true, 
        max: 256,                  
        min: 1, 
      } 
    },
    speed:{
      type:DataTypes.INTEGER,
      validate:{
        isInt: true, 
        max: 256,                  
        min: 1, 
      } 
    },
    height:{
      type:DataTypes.INTEGER,
      validate:{
        isInt: true, 
        max: 100000,                  
        min: 0, 
      } 
    },
    weight:{
      type:DataTypes.INTEGER,
      
      validate:{
        isInt: true,
        max:100000,                   
        min: 0,
      
      }
    },
    img:{
      type:DataTypes.TEXT,
      allowNull:true,
      validate: {
        is: /([a-zA-Z\-_0-9\/\:\.]+\.(jpg|jpeg|png|gif|bmp|svg|webp|tiff|ico))/i,
      },
      defaultValue:"https://imagenpng.com/wp-content/uploads/2016/09/Pokebola-pokeball-png-4.png"
     
    },
    created:{
      type:DataTypes.BOOLEAN,
      defaultValue:true,
      allowNull:false,
    }
  },{
    timestamps:false
      
});

  
};



// [ ] Pokemon con las siguientes propiedades:
// ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
// Nombre *
// Vida
// Ataque
// Defensa
// Velocidad
// Altura
// Peso