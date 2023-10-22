import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function ListarSuperHeroes() {
  const [listadoSuperHeroes, setListadoSuperHeroes] = useState([]);
  const [banderaCarga, setBanderaCarga] = useState(true);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://akabab.github.io/superhero-api/api/all.json"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const dataIn = await response.json();
        setListadoSuperHeroes(dataIn);
        setBanderaCarga(false);
      } catch (error) {
        console.error("There was an error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <>
      {banderaCarga ? (
        <p>Cargando...</p>
      ) : (
        <Box display="flex" flexDirection="column" gap={2}>
          <Grid container spacing={2}>
            {listadoSuperHeroes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((superHeroe) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ maxWidth: 345 }} key={superHeroe.id}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          sx={{
                            maxHeight: 350,
                          }}
                          image={superHeroe.images.sm}
                          alt={`Image-${superHeroe.name}`}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {superHeroe.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {superHeroe.biography.fullName}
                            {superHeroe.biography.alterEgos}
                            {superHeroe.biography.placeOfBirth}
                            {superHeroe.biography.firstAppearance}
                            {superHeroe.biography.publisher}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
          <Box display="flex" flexDirection="row" justifyContent="end">
            <TablePagination
              sx={{
                color: "white",
              }}
              rowsPerPageOptions={[6, 8, 12, 18]}
              count={listadoSuperHeroes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={({ from, to, count }) => {
                return "" + from + "-" + to + " de " + count;
              }}
              labelRowsPerPage={"Elementos por páginas"}
            ></TablePagination>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ListarSuperHeroes;
