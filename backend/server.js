require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const myConn = require("express-myconnection");
const routes1 = require("./routes/routes1");

const app = express();
app.set("port", process.env.PORT || 9000);

const conf_DB = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
};

app.use(myConn(mysql, conf_DB, "pool"));
app.use(express.json());
app.use(cors());

//Ruta principal
app.get("/", (req, res) => {
      res.send("BIENVENIDO AL SERVIDOR DE LIBROS");
});

app.use("/libros", routes1);

app.listen(app.get("port"), (req, res) => {
      console.log("SERVIDOR CORRIENDO EL EL PUERTO: ", app.get("port"));
});

module.exports = app;
