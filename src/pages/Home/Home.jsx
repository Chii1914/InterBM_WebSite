import React from "react";
import PageContainer from "../../components/container/PageContainer";
import { Box, Button, Typography } from "@mui/material";

function Home() {
  return (
    <PageContainer title="InterBalonmano" description="aaaaaaaaaaaaaaaaa">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundImage: `url(https://scontent-scl2-1.xx.fbcdn.net/v/t31.18172-8/12605418_919278914854705_8867189512935674290_o.jpg?_nc_cat=100&ccb=1-7&_nc_sid=2be8e3&_nc_ohc=49aj0r7oiu0AX_G9ggn&_nc_ht=scontent-scl2-1.xx&oh=00_AfC-XU4KN8fCWOfDiYvk8I0r4DfbklYrnnxBRlMazhDiLQ&oe=654D0E3F)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "70%",
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
              color: "white",
              textShadow: "4px 4px 8px #FFFFFF",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          ></Typography>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              color: "white",
              textShadow: "2px 2px 4px #FFFFFF",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          ></Typography>
          {/* <Button
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
          </Button> */}
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
        ></Typography>
      </Box>
    </PageContainer>
  );
}

export default Home;
