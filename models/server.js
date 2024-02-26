const express = require("express");
const cors = require("cors");

// const { dbConnection } = require('../database/MongoConnection');

const { bdmysql, sequelize } = require("../database/MySqlConnection");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Rutas MONGO
    this.usuariosPath = "/api/usuarios";
    this.heroesPath = "/api/heroes";

    this.pathsMongo = {
      auth: "/api/auth",
      buscar: "/api/buscar",
      //categorias: '/api/categorias',
      //productos:  '/api/productos',
      usuarios: "/api/usuarios",
      user: "/api/user",
      //referencias:'/api/referencias',
      //grupomultimedias:'/api/grupomultimedias',
      //multimedias:'/api/multimedias',
      //proveedores:'/api/proveedores',
      //marcas:'/api/marcas',
      roles: "/api/roles",
      //opciones:'/api/opciones',
      //opcionesrole:'/api/opcionesrole',
      //proveedormarcas:'/api/proveedormarcas',
      heroes: "/api/heroes",
      //uploads:'/api/uploads',
    };

    //Rutas MySQL
    this.heroesMySQLPath = "/api/heroesm";

    this.pathsMySql = {
      auth: "/api/authm",
      buscar: "/api/buscarm",
      prueba: "/api/prueba",
      casting: "/api/casting",
      //categorias: '/api/categorias',
      //productos:  '/api/productos',
      usuarios: "/api/usuariosm",
      //referencias:'/api/referencias',
      //grupomultimedias:'/api/grupomultimedias',
      //multimedias:'/api/multimedias',
      //proveedores:'/api/proveedores',
      //marcas:'/api/marcas',
      roles: "/api/rolesm",
      //opciones:'/api/opciones',
      //opcionesrole:'/api/opcionesrole',
      //proveedormarcas:'/api/proveedormarcas',
      heroes: "/api/heroesm",
      //uploads:'/api/uploads',
    };

    //Conectar BD
    this.conectarBD();
    // this.dbConnection();

    //Middlewares
    this.middlewares();

    //Rutas de la Aplicacion
    this.routes();
  }

  async conectarBD() {
    await this.dbConnection();
  }

  async dbConnection() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  middlewares() {
    //CORS
    //Evitar errores por Cors Domain Access
    //Usado para evitar errores.
    this.app.use(cors());

    //Lectura y Parseo del body
    //JSON
    /*
        JSON (JavaScript Object Notation) 
        es un formato ligero de intercambio de datos. 
        JSON es de fácil lectura y escritura para los usuarios. 
        JSON es fácil de analizar y generar por parte de las máquinas. 
        JSON se basa en un subconjunto del lenguaje de programación JavaScript, 
        Estándar ECMA-262 3a Edición - Diciembre de 1999.
        */
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    /*
        this.app.get('/api', (req, res) => {
            //res.send('Hello World')
            res.json({ok:true,
                msg:'get API'
               })

        });

        this.app.post('/api', (req, res) => {
            //res.send('Hello World')
            res.status(201).json({ok:true,
                msg:'post API'
               })

        });

        this.app.put('/api', (req, res) => {
            //res.send('Hello World')
            res.json({ok:true,
                msg:'put API'
               })

        });

        this.app.delete('/api', (req, res) => {
            //res.send('Hello World')
            res.json({ok:true,
                msg:'delete API'
               })

        });

        */
    //MONGO
    //this.app.use(this.usuariosPath, require('../routes/MongoUser'));
    //this.app.use(this.heroesPath, require('../routes/MongoHeroe'));
    //this.app.use(this.usuariosPath, require('../routes/MongoUser'));
    //this.app.use(this.heroesPath, require('../routes/MongoHeroe'));
    // this.app.use(this.pathsMongo.auth, require("../routes/MongoAuth"));
    // this.app.use(this.pathsMongo.roles, require("../routes/MongoRoles"));
    // this.app.use(this.pathsMongo.usuarios, require("../routes/MongoUsuarios"));
    // this.app.use(this.pathsMongo.heroes, require("../routes/MongoHeroe"));
    // this.app.use(this.pathsMongo.buscar, require("../routes/MongoBuscar"));
    // this.app.use(this.pathsMongo.user, require("../routes/MongoUser"));
    // //MYSQL
    // //this.app.use(this.heroesMySQLPath, require('../routes/MySqlHeroe'));
    // this.app.use(this.pathsMySql.auth, require("../routes/MySqlAuth"));
    // this.app.use(this.pathsMySql.usuarios, require("../routes/MySqlUsuarios"));
    // this.app.use(this.pathsMySql.heroes, require("../routes/MySqlHeroe"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
