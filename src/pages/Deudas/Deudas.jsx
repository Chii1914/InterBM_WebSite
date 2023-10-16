import React from "react";
import PageContainer from "../../components/container/PageContainer";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";
import SpacingGrid from "./components/Cajita";

function Deudas() {
  return (
    <PageContainer title="Pagina inicio" description="aaaaaaaaaaaaaaaaa">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundImage:
            "url(https://uploadnow.io/s/b9a5ae78-b226-40bc-b62e-689760b70b51)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "18%",
          backgroundColor: "white",
        }}
        minHeight={600}
      >
        <SpacingGrid />
      </Box>
    </PageContainer>
  );
}

export default Deudas;
