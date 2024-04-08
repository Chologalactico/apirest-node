const express = require("express");
const router = express.Router();
const UsersService = require("./../service/users.service");
const service = new UsersService();

router.get("/getUser", async (req, res) => {
  try {
    const users = await service.getUsers();

    if (users.success) {
      // If it worked I would send a 200
      res.status(200).json(users);
    } else {
      res.status(404).json({
        //If it doesn't work I get a 404 error
        success: false,
        error: "User not found",
        message: "This user not exists in the database.",
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
//   const users = service.find();
//   if (users.length === 0) {
//     res.status(404).json({ error: "Users not found", success: false });
//   } else {
//     res.status(200).json(users);
//   }
// });

router.post("/postUser", async (req, res) => {
  const {nombre,correo,password,img,rol,estado,google,brandProviderld,
  } = req.body;
  const data = {
    nombre,
    correo,
    password,
    img,
    rol,
    estado,
    google,
    brandProviderld,
  };
  const result = await service.postUser(data);
  res.status(201).json(result);
});

module.exports = router;
