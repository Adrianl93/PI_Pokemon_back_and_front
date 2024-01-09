![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)

# Individual Project - Henry Pokemon

<img height="150" src="./pokemon.png" />

## Descripción del Proyecto


El proyecto "Henry Pokemon" es una aplicación completa desarrollada con tecnologías modernas como React, Redux, Node y Sequelize. El objetivo principal de este proyecto individual fue consolidar y conectar los conocimientos adquiridos a lo largo de la carrera en el Bootcamp de Henry, aplicando mejores prácticas y utilizando un flujo de trabajo eficiente con GIT.

## Duración del proyecto

El proyecto fue llevado a cabo en 3 semanas y luego presentado para su evaluacion por el equipo de Henry.


### Únicos Endpoints/Flags permitidos

- GET <https://pokeapi.co/api/v2/pokemon>
- GET <https://pokeapi.co/api/v2/pokemon/{id}>
- GET <https://pokeapi.co/api/v2/pokemon/{name}>
- GET <https://pokeapi.co/api/v2/type>


#### Tecnologías necesarias

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

## Frontend

El frontend está desarrollado con React y Redux, y consta de las siguientes rutas:

Página Inicial: Landing page con una imagen representativa y un botón para acceder al home.
Ruta Principal: Contiene un formulario de búsqueda, un área para mostrar el listado de pokemons, opciones de filtrado y ordenamiento, y paginado.
Ruta de Detalle de Pokemon: Muestra detalles como imagen, nombre, tipos, número, estadísticas, altura y peso del pokemon.
Ruta de Creación: Incluye un formulario controlado con JavaScript para crear nuevos pokemons, con validaciones adicionales.



## Base de datos

Se realizó un modelo de base de datos utilizando Sequelize y PostgreSQL, la cual cuenta con las siguientes entidades:

- [ ] Pokemon: Con propiedades como ID, Nombre, Vida, Ataque, Defensa, Velocidad, Altura y Peso.

La relación entre Pokemon y Tipo es de muchos a muchos, permitiendo que un pokemon pertenezca a más de un tipo y viceversa.


  
- [ ] Tipo: Con propiedades como ID y Nombre.


La relación entre Pokemon y Tipo es de muchos a muchos, permitiendo que un pokemon pertenezca a más de un tipo y viceversa.



## Backend

Se realizó una conexion a una API externa de la cual se obtuvo toda la informacion de los Pokemons, para luego filtrada y reordenada para facilitar el flujo de la informacion y optimizar su ejecución.
Luego, dichos datos fueron almacenados en una base de datos.
Las rutas de back creadas fueron las siguientes:
GET /pokemons: Obtiene un listado de pokemons desde pokeapi, devolviendo solo los datos necesarios para la ruta principal.
GET /pokemons/{idPokemon}: Obtiene el detalle de un pokemon en particular, permitiendo trabajar con id de pokemons de pokeapi o creados por los participantes.
GET /pokemons?name="...": Busca un pokemon que coincida exactamente con el nombre proporcionado como parámetro de consulta.
POST /pokemons: Recibe datos desde el formulario de creación y crea un nuevo pokemon en la base de datos, relacionándolo con sus tipos.
GET /types: Obtiene todos los tipos de pokemons posibles, inicialmente desde pokeapi y luego utilizando la base de datos.
DELETE /pokemons/{idPokemon} : Elimina un pokemón de la base de datos a traves de su id.



