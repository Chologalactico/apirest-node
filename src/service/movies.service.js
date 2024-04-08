const connection = require("../DB/db");

class MoviesService {
  getMovies() {
    return new Promise(async (resolve, reject) => {
      const [results] = await connection.query("SELECT * FROM peliculas ");
      if (results.length == 0) {
        resolve({ success: false, data: results });
      }
      resolve({ success: true, data: results });
    });
  }

  postMovies(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const sql =
          "INSERT INTO `peliculas`(`titulo`,`descripcion`,`fecha_lanzamiento`,`img`) VALUES (?, ?, ?, ?)";
        const values = [
          data.titulo,
          data.descripcion,
          data.fecha_lanzamiento,
          data.img,
        ];
        console.log(data);
        const [result] = await connection.execute({
          sql,
          values,
        });

        resolve({
          success: true,
          data: result,
          message: "movies created successfully",
        });
      } catch (error) {
        reject({
          success: false,
          message: "movies err",
        });
      }
    });
  }
}

module.exports = MoviesService;
