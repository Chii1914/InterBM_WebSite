import React from "react";
import PageContainer from "../../components/container/PageContainer";
import { Box, Button, Typography } from "@mui/material";

function categorias() {
  return (
    <PageContainer title="Pagina inicio" description="aaaaaaaaaaaaaaaaa">
      <Typography
            variant="h1"
            component="h1"
            sx={{
              color: "black",
              textShadow: "4px 4px 8px #FFFFFF",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
      Categorias
      </Typography>
    </PageContainer>
  );
}

export default categorias;
