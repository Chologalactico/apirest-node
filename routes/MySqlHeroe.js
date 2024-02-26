const { Router } = require('express');

//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole } = require('../middlewares/validar-roles');


/*
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');
*/

const { heroesGet,
    heroesPost,
    heroesPut,
    heroesDelete,
    heroesPatch,
    heroesAnGet,
    heroesComoGet,
} = require('../controllers/MySqlHeroe');

const router = Router();


router.get('/', 
//validarJWT, //Midlleware para el Tokens
//esAdminRole, //Midlewara para validar el Role
 heroesGet);

router.get('/:id', 
//validarJWT, //Midlleware para el Tokens
//esAdminRole, //Midlewara para validar el Role
 heroesAnGet);

 router.get('/como/:termino', 
 //validarJWT, //Midlleware para el Tokens
 //esAdminRole, //Midlewara para validar el Role
  heroesComoGet);
 

 
router.post('/', 
//validarJWT, //Midlleware para el Tokens
//esAdminRole, //Midlewara para validar el Role
 heroesPost);

router.put('/:id', 
//validarJWT, //Midlleware para el Tokens
//esAdminRole, //Midlewara para validar el Role
heroesPut);


router.delete('/:id',
//validarJWT, //Midlleware para el Tokens
//esAdminRole, //Midlewara para validar el Role
heroesDelete);

router.patch('/', heroesPatch);

module.exports = router;