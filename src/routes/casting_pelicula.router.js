const express = require("express");
const router = express.Router();
const CPService = require("./../service/casting_pelicula.service");
const service = new CPService();

router.get("/getCP", async (req, res) => {
  try {
    const cps = await service.getCP();

    if (cps.success) {
      // If it worked I would send a 200
      res.status(200).json(cps);
    } else {
      res.status(404).json({
        //If it doesn't work I get a 404 error

        success: false,
        error: "casting not found",
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

module.exports = router;
