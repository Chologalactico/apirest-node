const connection = require("./DB/db");
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const app = express();

//settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2); // this is for the space the json

//Middwelares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require("./routes/index")); //CALL Another archives
app.use("/api/movies", require("./routes/movies.router"));
app.use("/api/heroes", require("./routes/heroes.router"));
app.use("/api/image", require("./routes/image.router"));
app.use("/api/CP", require("./routes/casting_pelicula.router"));
app.use("/api/user", require("./routes/users.router"));
app.use("/api/login",require("./routes/auth.router"))

app.listen(3000, () => {
  console.log(`Server on port ${app.get("port")}`);
});

// //Prub the conecction backend and BD
// const a = async () => {
//   // A simple SELECT query
//   try {
//     const [results] = await connection.query("SELECT * FROM heroes ");

//     console.log(results); // results contains rows returned by server
//   } catch (err) {
//     console.log(err);
//   }
// };

// a();
