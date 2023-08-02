import React from "react";
import { Typography, Grid } from "@mui/material";

const Header = () => {
      return (
            <Grid container justifyContent="center" mb={2}>
                  <Typography
                        variant="h5"
                        align="center"
                        style={{ marginTop: "12px" }}
                  >
                        <b>Gestión de Libros</b>
                  </Typography>
            </Grid>
      );
};

export default Header;
