const express = require("express"); // levanta servicio de express
const cors = require("cors"); //instanciacion del cors

//establecer conexion de bd haciendo un llamado a la libreria con la que nos queremos conectar  'POSTGRESS'

const { bdmysql, sequelize } = require("../database/MySqlConnection");

class Server {
  //en el contructor vamos a hacer la conexion a express, pero como un atributo de la clase
  constructor() {
    this.app = express(); //constructor hace la conexion
    this.port = process.env.PORT; // process. env , va a la variable de entorno y asigna el puerto de port definido en env, esto se hace para que los puertos sean configurables más facilmente

    //rutas , el primero auth para autenticacion en un futuro con el token, el segundo con prueba inicialmente con get, son json
    this.pathsMySql = {
      auth: "/api/auth",
      prueba: "/api/prueba",
      heroes: "/api/heroes",
      usuario: "/api/usuario",
    };

    //RUTAS, ya no es de esta manera sino en router
    /*
        this.app.get('/', function (req, res) {  //a traves de la app tenemos una ruta para responder con el hello world dependiendo de la peticion que voy a hacer
        res.send('hola mundo')
        })
*/
    this.conectarBD(); //AQUI ME CONECTO A LA BASE DE DATOS
    //this.dbConnection();
    //Middlewares
    this.middlewares();
    //Routes
    this.routes();
  }

  async conectarBD() {
    await this.dbConnection(); // Este async se deja quieto
  }

  async dbConnection() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  routes() {
    //haciendo referencia al archivo donde estan las rutas , o la hago directamente, lo de get.api ....
    //o le digo a la app que use esa ruta donde tengo el pathmysql, es un archivo de autorizacion que hace referencia alas rutas
    this.app.use(this.pathsMySql.auth, require("../routes/MySqlAuth"));
    this.app.use(this.pathsMySql.prueba, require("../routes/prueba"));
    this.app.use(this.pathsMySql.heroes, require("../routes/MySqlHeroe"));
    this.app.use(this.pathsMySql.usuario, require("../routes/MySqlUsuarios"));
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
