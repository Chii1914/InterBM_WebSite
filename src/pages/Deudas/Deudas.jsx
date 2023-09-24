import React from "react";
import PageContainer from "../../components/container/PageContainer";
import { Box, Button, Typography } from "@mui/material";
import ListarSuperHeroes from "./components/ListarSuperHeroes";

function Home() {
  return (
    <PageContainer title="Pagina inicio" description="aaaaaaaaaaaaaaaaa">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundImage:
            "url(https://images6.alphacoders.com/705/705204.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "18%",
        }}
        minHeight={600}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          justifyContent={"center"}
          alignItems="center"
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: "white",
              textShadow: "2px 2px 4px #000000",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            Super Hero App
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: "white",
              textShadow: "2px 2px 4px #000000",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            Busca tu super heroe favorito
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            Comenzar!
          </Button>
        </Box>
      </Box>
      <Box
        padding={10}
        display="flex"
        flexDirection="column"
        gap={5}
        alignItems="center"
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "white",
            textShadow: "2px 2px 4px #000000",
          }}
        >
          Listado de super heroes
        </Typography>
        <ListarSuperHeroes />
      </Box>
    </PageContainer>
  );
}

export default Home;
