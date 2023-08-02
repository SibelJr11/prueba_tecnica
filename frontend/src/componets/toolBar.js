import React from "react";
import { TextField, Grid, Button, Paper } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const Toolbar = ({ onOpenAddBookModal, onChange }) => {
      return (
            <Grid container alignItems="center">
                  <Grid item xs={12} md={8}>
                        <TextField
                              name="filtro"
                              label="Buscar..."
                              size="small"
                              onChange={onChange}
                              variant="standard"
                              margin="normal"
                              InputProps={{
                                    endAdornment: (
                                          <InputAdornment position="start">
                                                <SearchIcon />
                                          </InputAdornment>
                                    ),
                              }}
                        />
                  </Grid>
                  <Grid
                        item
                        xs={12}
                        md={4}
                        align={window.innerWidth < 768 ? "left" : "right"}
                  >
                        <Button
                              variant="contained"
                              color="primary"
                              onClick={onOpenAddBookModal}
                        >
                              Nuevo Libro
                        </Button>
                  </Grid>
            </Grid>
      );
};

{
}

export default Toolbar;
