const request = require("supertest");
const app = require("../server.js");

/*Test para agregar un libro.*/

test("Agregar un libro", async () => {
      const nuevoLibro = {
            titulo: "Nuevo Libro",
            autor: "Autor Desconocido",
            publicacion: "2023",
            genero: "Ficción",
      };

      const response = await request(app)
            .post("/libros/create")
            .send(nuevoLibro);
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe("Libro Registrado!");
});

/*Test para editar un libro existente*/

test("Editar un libro existente", async () => {
      const libroExistenteId = 31;
      const libroModificado = {
            titulo: "Libro Modificado1",
            autor: "Autor Modificado1",
            publicacion: "2022",
            genero: "Aventura",
      };

      const response = await request(app)
            .put(`/libros/update/${libroExistenteId}`)
            .send(libroModificado);

      expect(response.statusCode).toBe(200);
      expect(response.text).toBe("Libro Actualizado!");
});

/* Test para eliminar un libro por su ID */

test("Eliminar un libro por su ID", async () => {
      const libroExistenteId = 30;

      const response = await request(app).delete(
            `/libros/delete/${libroExistenteId}`
      );

      expect(response.statusCode).toBe(200);
      expect(response.text).toBe("Libro Eliminado!");
});

/* Test para validar campos requeridos al agregar un libro.*/

test("Validar campos requeridos al agregar un libro", async () => {
      const libroIncompleto = {
            // Falta el campo "titulo"
            autor: "Autor Modificado",
            publicacion: "2022",
            genero: "Aventura",
      };

      const response = await request(app)
            .post("/libros/create")
            .send(libroIncompleto);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Todos los campos son requeridos.");
});

/* Test para validar campos requeridos al editar un libro.*/
test("Validar campos requeridos al editar un libro", async () => {
      const libroExistenteId = 11;
      const edicionLibroIncompleto = {
            // Falta el campo "titulo"
            autor: "Autor Modificado",
            publicacion: "2022",
            genero: "Aventura",
      };

      const response = await request(app)
            .put(`/libros/update/${libroExistenteId}`)
            .send(edicionLibroIncompleto);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Todos los campos son requeridos.");
});

/* Test para filtrar los libros por término de búsqueda */

test("Filtrar libros por término de búsqueda", async () => {
      const terminoBusqueda = "Libro Modificado";

      const response = await request(app).get(
            `/libros/filter/${terminoBusqueda}`
      );

      expect(response.statusCode).toBe(200);
});
