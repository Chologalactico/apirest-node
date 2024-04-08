const express = require("express");
const router = express.Router();
const ImageService = require("./../service/image.service");
const { reject, values } = require("underscore");
const service = new ImageService();

router.get("/getImage", async (req, res) => {
  try {
    const image = await service.getImage();

    if (image.success) {
      // If it worked I would send a 200
      res.status(200).json(image);
    } else {
      res.status(404).json({
        //If it doesn't work I get a 404 error
        success: false,
        error: "Heroes not found",
        message: "The image not exists in the database.",
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

router.post("/postImage", async (req, res) => {
  const { descripcion, url } = req.body; //Recuperation the body
  const data = {
    descripcion,
    url,
  };
  const result = await service.postImage(data);
  res.status(201).json(result);
});
module.exports = router;
