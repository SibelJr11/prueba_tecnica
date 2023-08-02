import React, { useState, useEffect } from "react";
import DataTable from "./componets/dataTable";
import Toolbar from "./componets/toolBar";
import Header from "./componets/header";
import { Container, Grid, IconButton, Stack, Tooltip } from "@mui/material";
import Modal from "./componets/modal";
import CreateIcon from "@mui/icons-material/Create";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";

const App = () => {
      const [books, setBooks] = useState([]);
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const [size, setSize] = useState(0);
      const [openModal, setOpenModal] = useState(false); //Se encarga de manejar la visibilidad de mi modal
      const [data, setData] = useState([]);
      const [actualizar, setActualizar] = useState(false);
      const apiUrl = process.env.REACT_APP_API_URL; // Variable de entorno donde esta la ruta del servidor

      useEffect(() => {
            fetch(`${apiUrl}/libros`)
                  .then((res) => res.json())
                  .then((res) => {
                        setBooks(res);
                        setSize(res.length);
                  });
            setActualizar(false);
      }, [actualizar]);

      const columns = [
            {
                  field: "id",
                  headerName: "ID",
                  width: 90,
                  renderCell: (params) => (
                        <Stack direction="row" spacing={1}>
                              <b>{params.row.id}</b>
                        </Stack>
                  ),
            },
            {
                  field: "titulo",
                  headerName: "Titulo",
                  width: 200,
                  editable: true,
            },
            {
                  field: "autor",
                  headerName: "Autor",
                  width: 200,
                  editable: true,
            },
            {
                  field: "publicacion",
                  headerName: "Año de Publicación",
                  width: 150,
                  editable: true,
            },
            {
                  field: "genero",
                  headerName: "Genero",
                  width: 150,
                  editable: true,
            },
            {
                  field: "Opciones",
                  headerName: "Opciones",
                  width: 200,
                  headerAlign: "center",
                  renderCell: (params) => (
                        <Grid
                              xs={12}
                              sm={12}
                              md={12}
                              container
                              justifyContent="center"
                              alignItems="end"
                        >
                              <Tooltip
                                    interactive
                                    placement={"top"}
                                    title={"Modificar"}
                              >
                                    <IconButton
                                          aria-label="details"
                                          style={{
                                                color: "#1565c0",
                                          }}
                                          size={"medium"}
                                          onClick={() =>
                                                openModalEditar(params.row)
                                          }
                                    >
                                          <CreateIcon />
                                    </IconButton>
                              </Tooltip>
                              <Tooltip
                                    interactive
                                    placement={"top"}
                                    title={"Eliminar"}
                              >
                                    <IconButton
                                          aria-label="details"
                                          style={{
                                                color: "#1565c0",
                                          }}
                                          size={"medium"}
                                          onClick={() =>
                                                confirmDelete(params.row)
                                          }
                                    >
                                          <DeleteForeverIcon />
                                    </IconButton>
                              </Tooltip>
                        </Grid>
                  ),
            },
      ];

      const handleChange = (e) => {
            filterBooks(e.target.value);
      };

      const filterBooks = (termino) => {
            if (termino === "") {
                  setActualizar(true);
            } else {
                  fetch(`${apiUrl}/libros/filter/${termino}`)
                        .then((res) => res.json())
                        .then((res) => {
                              setSize(res.length);
                              setBooks(res);
                        });
            }
      };

      const saveBooks = (values) => {
            const requestInit = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
            };
            fetch(`${apiUrl}/libros/create`, requestInit)
                  .then((res) => res.text())
                  .then((res) =>
                        Swal.fire({
                              position: "center",
                              icon: "success",
                              title: res,
                              showConfirmButton: false,
                              timer: 4000,
                        })
                  );

            setActualizar(true);
            setOpenModal(!openModal);
      };

      const updateBooks = (values) => {
            const requestInit = {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(values),
            };

            fetch(`${apiUrl}/libros/update/${data.id}`, requestInit)
                  .then((res) => res.text())
                  .then((res) => {
                        Swal.fire({
                              position: "center",
                              icon: "success",
                              title: res,
                              showConfirmButton: false,
                              timer: 4000,
                        });

                        setActualizar(!actualizar);
                        closeModalEditar();
                  });
      };

      const confirmDelete = (book) => {
            console.log(book);
            Swal.fire({
                  title: "¿Estas seguro?",
                  html: "Estás a punto de borrar: <b>" + book.titulo + "</b>",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "green",
                  cancelButtonColor: "red",
                  confirmButtonText: "¡Sí, bórralo!",
                  cancelButtonText: "Cancelar",
            }).then((result) => {
                  if (result.isConfirmed) {
                        deleteBooks(book.id);
                  }
            });
      };

      const deleteBooks = (id) => {
            const requestInit = {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
            };

            fetch(`${apiUrl}/libros/delete/${id}`, requestInit)
                  .then((res) => res.text())
                  .then((res) => {
                        Swal.fire({
                              position: "center",
                              icon: "success",
                              title: res,
                              showConfirmButton: false,
                              timer: 4000,
                        });
                  });
            setActualizar(!actualizar);
      };

      const openModalEditar = (book) => {
            setData(book);
            setOpenModal(!openModal);
      };

      const closeModalEditar = () => {
            setOpenModal(!openModal);
            setData([]);
      };
      const isNewRecord = Object.keys(data).length === 0; //Pregunta si el array data que se envía al modal editar está vacío o no para saber si se va a editar o registrar un nuevo libro

      const handleChangeRowsPerPage = (newPageSize) => {
            setRowsPerPage(newPageSize);
      };

      return (
            <>
                  <Header />
                  <Container>
                        {/**Modal para Crear o Editar un libro*/}
                        <Modal
                              open={openModal}
                              onClose={closeModalEditar}
                              onSave={saveBooks}
                              onUpdate={updateBooks}
                              isNewRecord={isNewRecord}
                              data={data}
                        />
                        {/*Barra de Busqueda y boton para registrar o editar*/}
                        <Toolbar
                              onOpenAddBookModal={() => setOpenModal(true)}
                              onChange={handleChange}
                        />

                        {/*Tabla*/}
                        <DataTable
                              columns={columns}
                              rows={books}
                              page={page}
                              onPageChange={(newPage) => setPage(newPage)}
                              rowCount={size}
                              rowsPerPage={rowsPerPage}
                              onChangeRowsPerPage={handleChangeRowsPerPage} // Pasar la función al componente DataTable
                        />
                  </Container>
            </>
      );
};

export default App;
