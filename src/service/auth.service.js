const connection = require("../DB/db");

class AuthService {
  login(data) {
    return new Promise(async (resolve) => {
      const [results] = await connection.query(
        "SELECT id, correo, password  FROM usuario_pamii WHERE correo= ? AND password = ?",
        [data.correo, data.password]
      );
      if (results.length == 0) {
        resolve({ success: false, data: results });
      }
      resolve({ success: true, data: results });
    });
  }
}

module.exports = AuthService;
