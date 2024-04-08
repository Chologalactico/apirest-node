const express = require("express");
const router = express.Router();
const HeroesService = require("./../service/heroes.service");
const service = new HeroesService();

router.get("/getHeroes", async (req, res) => {
  try {
    const heroes = await service.getHeroes();

    if (heroes.success) {
      // If it worked I would send a 200
      res.status(200).json(heroes);
    } else {
      res.status(404).json({
        //If it doesn't work I get a 404 error
        success: false,
        error: "Heroes not found",
        message: "The heroes not exists in the database.",
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

router.post("/postHeroes", async (req, res) => {
  const { nombre, bio, img, aparicion, casa } = req.body; //Recuperation the body
  const data = {
    nombre,
    bio,
    img,
    aparicion,
    casa,
  };  const result = await service.postHeroes(data);
  res.status(201).json(result);
});

module.exports = router;
