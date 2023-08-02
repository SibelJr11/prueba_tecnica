const express = require("express");
const routes1 = express.Router();

routes1.get("/", (req, res) => {
      //🔰Me trae todos los libros🔰
      req.getConnection((error, conn) => {
            if (error) return res.status(500).send(error);

            conn.query("SELECT * FROM libros", (error, rows) => {
                  if (error) {
                        return res.status(500).send(error);
                  } else {
                        res.json(rows);
                  }
            });
      });
});

routes1.post("/create", (req, res) => {
      //🔰Crea un libro🔰
      const { titulo, autor, publicacion, genero } = req.body;
      if (!titulo || !autor || !publicacion || !genero) {
            //Valida que todos los campos se envien a la database
            return res
                  .status(400)
                  .json({ error: "Todos los campos son requeridos." });
      }

      req.getConnection((err, conn) => {
            if (err) return res.status(500).send(err);

            conn.query("INSERT INTO libros SET ?", [req.body], (err, rows) => {
                  if (err) return res.status(500).send(err);
                  res.send("Libro Registrado!");
            });
      });
});

routes1.put("/update/:id", (req, res) => {
      //🔰Modifica los datos de un libro 🔰
      const { titulo, autor, publicacion, genero } = req.body;
      if (!titulo || !autor || !publicacion || !genero) {
            //Valida que todos los campos se envien a la database
            return res
                  .status(400)
                  .json({ error: "Todos los campos son requeridos." });
      }

      req.getConnection((err, conn) => {
            if (err) return res.status(500).send(err);

            conn.query(
                  "UPDATE libros SET ? WHERE id = ?",
                  [req.body, req.params.id],
                  (err, rows) => {
                        if (err) return res.status(500).send(err);
                        res.send("Libro Actualizado!");
                  }
            );
      });
});

routes1.get("/filter/:termino", (req, res) => {
      //🔰Filtra los libros por todas las opciones de la tabla🔰
      const termino = req.params.termino;
      const sql = `
    SELECT * FROM libros 
    WHERE id LIKE ? OR titulo LIKE ? OR autor LIKE ? OR publicacion LIKE ? OR genero LIKE ?
  `;
      const params = Array(5).fill(`${termino}%`);

      req.getConnection((error, conn) => {
            if (error) return res.status(500).send(error);

            conn.query(sql, params, (error, rows) => {
                  if (error) {
                        return res.status(500).send(error);
                  } else {
                        res.json(rows);
                  }
            });
      });
});

routes1.delete("/delete/:id", (req, res) => {
      //🔰Elimina un libro por su id🔰
      req.getConnection((error, conn) => {
            if (error) return res.status(500).send(error);
            conn.query(
                  "DELETE FROM libros WHERE id = ?",
                  [req.params.id],
                  (err, rows) => {
                        if (err) return res.status(500).send(err);
                        res.send("Libro Eliminado!");
                  }
            );
      });
});

module.exports = routes1;
