const connection = require("../DB/db");

class HeroesService {
  getHeroes() {
    return new Promise(async (resolve, reject) => {
      const [results] = await connection.query("SELECT * FROM heroes ");
      if (results.length == 0) {
        resolve({ success: false, data: results });
      }
      resolve({ success: true, data: results });
    });
  }



  postHeroes(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const sql =
          "INSERT INTO `heroes`(`nombre`,`bio`,`img`,`aparicion`,`casa`) VALUES (?, ?, ?, ?, ?)";
        const values = [
          data.nombre,
          data.bio,
          data.img,
          data.aparicion,
          data.casa,
        ];

        const [result] = await connection.execute({
          sql,
          values,
        });

        resolve({
          success: true,
          data: result,
          message: "heroe created successfully",
        });
      } catch (error) {
        reject({
          success: false,
          message: "heroe err",
        });
      }
    });
  }
}

module.exports = HeroesService;
