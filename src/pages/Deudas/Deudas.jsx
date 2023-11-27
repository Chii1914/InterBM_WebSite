import React from "react";
import PageContainer from "../../components/container/PageContainer";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";
/* import CajitaEditable from "./components/Cajita"; */
import Cajita from "./components/Cajita.jsx";
import CajitaEditable from "./components/CajitaEditable.jsx";
function Deudas() {
  return (
    <PageContainer title="Pagina inicio" description="aaaaaaaaaaaaaaaaa">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "left",
          padding: "5%",
        }}
      >
        <CajitaEditable />
      </Box>
    </PageContainer>
  );
}

export default Deudas;
