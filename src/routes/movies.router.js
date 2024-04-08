const express = require("express");
const router = express.Router();
const MoviesService = require("./../service/movies.service");
const service = new MoviesService();

//Vie all
router.get("/getMovies", async (req, res) => {
  try {
    const movies = await service.getMovies();

    if (movies.success) {
      // If it worked I would send a 200
      res.status(200).json(movies);
    } else {
      res.status(404).json({
        //If it doesn't work I get a 404 error
        success: false,
        error: "Movies not found",
        message: "This movie not exists in the database.",
      });
    }
  } catch (error) {
    // In this case, if the if does not work, we get a 500 error
    res.status(500).json({
      error: "Server error",

      message: error.message,
    });
  }
});
router.post("/postMovies", async (req, res) => {
  const { titulo, descripcion, fecha_lanzamiento, img } = req.body; //Recuperation the body
  const data = {
    titulo,
    descripcion,
    fecha_lanzamiento,
    img
  };
  const result = await service.postMovies(data);
  res.status(201).json(result);
});

module.exports = router;
