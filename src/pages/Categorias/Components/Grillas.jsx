import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "150px",
}));

function entrenadores() {
  return (
    <Grid container spacing={1} columns={0}>
      <Grid item xs={12}>
        <Item>
          <img
            src=""
            alt="Descripción"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <Box mt={2}>Texto 1</Box>
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Item></Item>
      </Grid>
      <Grid item xs={12}>
        <Item></Item>
      </Grid>
      <Grid item xs={12}>
        <Item></Item>
      </Grid>
      <Grid item xs={12}>
        <Item></Item>
      </Grid>
      <Grid item xs={12}>
        <Item></Item>
      </Grid>
    </Grid>
  );
}
export default entrenadores;
