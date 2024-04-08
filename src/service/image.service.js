const { reject } = require("underscore");
const connection = require("../DB/db");

class ImageService {
  getImage() {
    return new Promise(async (resolve, reject) => {
      const [results] = await connection.query("SELECT * FROM imagenes ");
      if (results.length == 0) {
        resolve({ success: false, data: results });
      }
      resolve({ success: true, data: results });
    });
  }
  postImage(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = "INSERT INTO `imagenes`(`descripcion`,`url`) VALUES (?, ?)";
        const values = [data.descripcion, data.url];

        const [result] = await connection.execute({
          sql,
          values,
        });

        resolve({
          success: true,
          data: result,
          message: "Image create succeddfully",
        });
      } catch (error) {
        reject({
          success: false,
          message: "Image err",
        });
      }
    });
  }
}

module.exports = ImageService;
