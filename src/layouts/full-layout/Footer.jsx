import {
    Container,
    Typography,
    Box,
    Link,
    Button,
    Toolbar,
  } from "@mui/material";
  
  function Footer() {
    const footerLinks = [
      { name: "Sobre Nosotros", path: "/sobre-nosotros" },
      { name: "Contacto", path: "/contacto" },
      { name: "Ayuda", path: "/ayuda" },
    ];
  
    return (
      <Box
        sx={{
          bgcolor: "black",
          color: "white",
          mt: 0,
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ bgcolor: "black" }}>
            {/* Logo and Description /}
            <Box>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                InterBM
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                Tu plataforma de gestión.
              </Typography>
            </Box>
  
            {/ Spacer /}
            <Box sx={{ flexGrow: 1 }} />
  
            {/ Footer Links */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {footerLinks.map((link) => (
                <Button
                  key={link.name}
                  component={Link}
                  to={link.path}
                  sx={{ color: "white", my: 2, mr: 6, display: "block" }}
                >
                  {link.name}
                </Button>
              ))}
            </Box>
          </Toolbar>
          <Typography variant="body2" align="center" mt={1}>
            © 2023 InterBM. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    );
  }
  
  export default Footer;