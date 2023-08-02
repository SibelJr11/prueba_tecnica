import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales/esES";
import { Grid, Paper } from "@mui/material";

const DataTable = ({
      columns,
      rows,
      page,
      onPageChange,
      rowCount,
      rowsPerPage,
      onChangeRowsPerPage,
}) => {
      return (
            <Grid container justifyContent="center" spacing={2} mt={4}>
                  <Grid item xs={12} md={12}>
                        <Paper>
                              <DataGrid
                                    getRowId={(row) => row.id}
                                    localeText={
                                          esES.components.MuiDataGrid
                                                .defaultProps.localeText
                                    }
                                    autoHeight
                                    pagination
                                    page={page}
                                    onPageChange={(newPage) => {
                                          onPageChange(newPage); // Actualizar el estado de "page" en el componente App
                                    }}
                                    pageSize={rowsPerPage}
                                    onPageSizeChange={(newPageSize) => {
                                          onChangeRowsPerPage(newPageSize); // Actualizar el estado de "rowsPerPage" en el componente App
                                    }}
                                    rowsPerPageOptions={[5, 10, 15]}
                                    labelRowsPerPage={"Libros por página"}
                                    rowCount={rowCount}
                                    columns={columns}
                                    rows={rows}
                              />
                        </Paper>
                  </Grid>
            </Grid>
      );
};

export default DataTable;
