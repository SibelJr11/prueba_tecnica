import React from "react";
import {
      Dialog,
      Grid,
      IconButton,
      Tooltip,
      Typography,
      Box,
      TextField,
      Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const Modal = ({ open, onClose, onSave, onUpdate, isNewRecord, data }) => {
      const initialValues = {
            titulo: "",
            autor: "",
            publicacion: "",
            genero: "",
      };
      return (
            <Dialog open={open} onClose={onClose}>
                  <div>
                        <Formik
                              initialValues={isNewRecord ? initialValues : data}
                              validationSchema={Yup.object().shape({
                                    titulo: Yup.string().required(
                                          "* Requerido"
                                    ),

                                    autor: Yup.string()
                                          .trim()
                                          .matches(
                                                /^[A-Za-zÀ-ÿ\s]+$/,
                                                "* Solo se admiten letras"
                                          )
                                          .required("* Requerido"),

                                    publicacion: Yup.number()
                                          .typeError(
                                                "* Solo se admiten números"
                                          )
                                          .integer(
                                                "* Solo se admiten números enteros"
                                          )
                                          .required("* Requerido"),

                                    genero: Yup.string()
                                          .trim()
                                          .matches(
                                                /^[A-Za-zÀ-ÿ\s]+$/,
                                                "* Solo se admiten letras"
                                          )
                                          .required("* Requerido"),
                              })}
                              onSubmit={(values, { resetForm }) => {
                                    if (isNewRecord) {
                                          onSave(values);
                                    } else {
                                          onUpdate(values);
                                    }
                                    resetForm();
                              }}
                        >
                              {({
                                    errors,
                                    touched,
                                    values,
                                    handleBlur,
                                    handleChange,
                              }) => (
                                    <Form
                                          style={{
                                                padding: "40px",
                                          }}
                                    >
                                          <Grid container>
                                                <div
                                                      style={{
                                                            width: "100%",
                                                            display: "flex",
                                                            justifyContent:
                                                                  "space-between",
                                                            alignItems:
                                                                  "center",
                                                      }}
                                                >
                                                      <Typography
                                                            variant="h5"
                                                            component="h2"
                                                            align="start"
                                                      >
                                                            {isNewRecord ? (
                                                                  <b>
                                                                        Registrar
                                                                        Libro
                                                                  </b>
                                                            ) : (
                                                                  <b>
                                                                        Modificar
                                                                        Libro
                                                                  </b>
                                                            )}
                                                      </Typography>
                                                      <Tooltip
                                                            interactive
                                                            placement={"top"}
                                                            title={"Cerrar"}
                                                      >
                                                            <IconButton
                                                                  aria-label="details"
                                                                  style={{
                                                                        color: "red",
                                                                  }}
                                                                  size={
                                                                        "medium"
                                                                  }
                                                                  onClick={
                                                                        onClose
                                                                  }
                                                            >
                                                                  <CancelRoundedIcon />
                                                            </IconButton>
                                                      </Tooltip>
                                                </div>

                                                <Box
                                                      sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                  "flex-end",
                                                            width: "100%",
                                                            mt: 2,
                                                      }}
                                                >
                                                      <TextField
                                                            variant="standard"
                                                            name="titulo"
                                                            label="Titulo *"
                                                            error={Boolean(
                                                                  touched.titulo &&
                                                                        errors.titulo
                                                            )}
                                                            helperText={
                                                                  touched.titulo &&
                                                                  errors.titulo
                                                            }
                                                            value={
                                                                  values.titulo
                                                            }
                                                            onBlur={handleBlur}
                                                            onChange={
                                                                  handleChange
                                                            }
                                                            type="text"
                                                            fullWidth
                                                      />
                                                </Box>

                                                <Box
                                                      sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                  "flex-end",
                                                            width: "100%",
                                                            mt: 2,
                                                      }}
                                                >
                                                      <TextField
                                                            variant="standard"
                                                            name="autor"
                                                            label="Autor *"
                                                            error={Boolean(
                                                                  touched.autor &&
                                                                        errors.autor
                                                            )}
                                                            helperText={
                                                                  errors.autor
                                                            }
                                                            value={values.autor}
                                                            onBlur={handleBlur}
                                                            onChange={
                                                                  handleChange
                                                            }
                                                            type="text"
                                                            fullWidth
                                                      />
                                                </Box>
                                                <Box
                                                      sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                  "flex-end",
                                                            width: "100%",
                                                            mt: 2,
                                                      }}
                                                >
                                                      <TextField
                                                            variant="standard"
                                                            name="publicacion"
                                                            label="Año de Publicación *"
                                                            error={Boolean(
                                                                  touched.publicacion &&
                                                                        errors.publicacion
                                                            )}
                                                            helperText={
                                                                  touched.publicacion &&
                                                                  errors.publicacion
                                                            }
                                                            value={
                                                                  values.publicacion
                                                            }
                                                            onBlur={handleBlur}
                                                            onChange={
                                                                  handleChange
                                                            }
                                                            type="text"
                                                            fullWidth
                                                      />
                                                </Box>
                                                <Box
                                                      sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                  "flex-end",
                                                            width: "100%",
                                                            mt: 2,
                                                      }}
                                                >
                                                      <TextField
                                                            variant="standard"
                                                            name="genero"
                                                            label="Genero *"
                                                            error={Boolean(
                                                                  touched.genero &&
                                                                        errors.genero
                                                            )}
                                                            helperText={
                                                                  touched.genero &&
                                                                  errors.genero
                                                            }
                                                            value={
                                                                  values.genero
                                                            }
                                                            onBlur={handleBlur}
                                                            onChange={
                                                                  handleChange
                                                            }
                                                            type="text"
                                                            fullWidth
                                                      />
                                                </Box>

                                                <Grid
                                                      container
                                                      md={12}
                                                      justifyContent="center"
                                                      sx={{ mt: 2 }}
                                                >
                                                      <Button
                                                            fullWidth
                                                            style={{
                                                                  background:
                                                                        "#1565c0",
                                                                  color: "white",
                                                                  borderRadius:
                                                                        "20px",
                                                                  maxWidth: "200px", // Ajusta el ancho máximo según tus necesidades
                                                                  margin: "0 auto",
                                                            }}
                                                            size="large"
                                                            type="submit"
                                                      >
                                                            {isNewRecord
                                                                  ? "Registrar"
                                                                  : "Modificar"}
                                                      </Button>
                                                </Grid>
                                          </Grid>
                                    </Form>
                              )}
                        </Formik>
                  </div>
            </Dialog>
      );
};

export default Modal;
