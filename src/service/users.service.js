const connection = require("../DB/db");

class UsersService {
  getUsers() {
    return new Promise(async (resolve, reject) => {
      const [results] = await connection.query("SELECT * FROM usuario_pamii ");
      if (results.length == 0) {
        resolve({ success: false, data: results });
      }
      resolve({ success: true, data: results });
    });
  }

  postUser(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const sql =
          "INSERT INTO `usuario_pamii`(`nombre`,`correo`,`password`,`img`,`rol`,`estado`,`google`,`brandProviderld`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
          data.nombre,
          data.correo,
          data.password,
          data.img,
          data.rol,
          data.estado,
          data.google,
          data.brandProviderld,
        ];
        console.log(values)

        const [result] = await connection.execute({
          sql,
          values,
        });

        resolve({
          success: true,
          data: result,
          message: "User created successfully",
        });
      } catch (error) {
        reject({
          success: false,
          message: "User err",
        });
      }
    });
  }
}

module.exports = UsersService;
