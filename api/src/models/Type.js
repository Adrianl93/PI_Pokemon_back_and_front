const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Type', {
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"unknown",
    },
  },{
    timestamps:false
      
});
};



// [ ] Tipo con las siguientes propiedades:
// ID
// Nombre