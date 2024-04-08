const connection = require("../DB/db");

class CPService {
  getCP() {
    return new Promise(async (resolve, reject) => {
      const [results] = await connection.query("SELECT * FROM casting_pelicula ");
      if (results.length == 0) {
        resolve({ success: false, data: results });
      }
      resolve({ success: true, data: results });
    });
  }
}

// postHeroues(){
  
// }

module.exports = CPService;