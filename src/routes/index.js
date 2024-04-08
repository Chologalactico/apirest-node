const { Router } = require("express");
const router = Router();

router.get("/test", (req, res) => {
  const data = {
    Name: "j",
    Age: "23",
    Adress: "calletres",
    chil: "Yes",
  };

  res.json(data);
});

module.exports = router;
