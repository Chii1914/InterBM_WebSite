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
          backgroundImage: 'url(https://cdn.discordapp.com/attachments/1145537724644864134/1166227278720671775/image.png?ex=6549b8ca&is=653743ca&hm=fe863285f7e6c37ea2b2c8d499f3f9b9d7b92f615ef8f34692dd7c81586a0dec&)',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          minHeight: "983px",
          width: "654",
          padding: "100px",
        }}
        minHeight={700}
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
              color: "black",
              textShadow: "4px 4px 8px #FFFFFF",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
          
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: "black",
              textShadow: "2px 2px 4px #FFFFFF",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
          </Typography>
          
        </Box>
      </Box>
      <Box
        padding={0}
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
          
        </Typography>
    
      </Box>
    </PageContainer>
  );
}

export default Home;
