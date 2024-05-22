const express = require("express");
const router = express.Router();
const AuthService = require("./../service/auth.service");
const service = new AuthService();

router.post("/", async (req, res) => {
  //   res.status(200).json({
  //     success: true,
  //     message: "test",
  //   });
  try {
    const { correo, password } = req.body;
    const data = {
      correo,
      password,
    };
    const result = await service.login(data);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Access login",
        data: result.data,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Login failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      value: error,
    });
  }
});

module.exports = router;
