import React, { useState } from "react";
              import {
                Avatar,
                Box,
                Button,
                Dialog,
                DialogContent,
                Grid,
                InputLabel,
                MenuItem,
                Select,
                TextField,
                Typography,
                Paper,
              } from "@mui/material";
              import { createTheme, ThemeProvider } from "@mui/material/styles";
              import CssBaseline from "@mui/material/CssBaseline";
              import axios from "axios";
              
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const url = 'https://pbs.twimg.com/profile_images/681180785504862208/RNR8RGGM_400x400.jpg';

export default function SignInSide() {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

    const initialValues = {
      RUN: "",
      direccion_completa: "",
      telefono_emergencia: "",
      nombre_completo: "",
      rol: "",
      categoria: "",
      telefono: "",
      password: "",     
  };
    const closeSuccessModal = () => {
      setIsSuccessModalOpen(false);
    };

    const [isFailureModalOpen, setIsFailureModalOpen] = useState(false)

    const closeFailureModal = () => {
      setIsFailureModalOpen(false);
    };

    const [inputs, setInputs] = useState({
        RUN: "",
        direccion_completa: "",
        telefono_emergencia: "",
        nombre_completo: "",
        rol: "",
        categoria: "",
        telefono: "",
        password: "",     
        
    })
    
    const handleChange = e =>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    } 

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            const res = await axios.post("/user/", inputs)
            if(res.status === 200){
              setIsSuccessModalOpen(true);
             
            }
        }catch(err){
          setIsFailureModalOpen(true);
          }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Dialog open={isSuccessModalOpen} onClose={closeSuccessModal}>
              <DialogContent>
                <Typography variant="h6">¡Usuario registrado!</Typography>
                <Typography variant="body1">Has registrado correctamente a {inputs.nombre_completo}.</Typography>
              </DialogContent>
            </Dialog>
            <Dialog open={isFailureModalOpen} onClose={closeFailureModal}>
              <DialogContent>
                <Typography variant="h6">Usuario no registrado</Typography>
                <Typography variant="body1">El usuario {inputs.nombre_completo} ya está registrado, o ocurrió un error.</Typography>
              </DialogContent>
            </Dialog>
            <Avatar alt="Custom Avatar" src={url} />
            <Typography component="h1" variant="h5">
              Registrar usuario
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="RUN"
                label="Rut del Usuario"
                name="RUN"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="direccion_completa"
                label="Dirección completa del usuario"
                type="text"
                id="direccion_completa"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="telefono_emergencia"
                label="Teléfono de emergencia del usuario"
                type="text"
                id="telefono_emergencia"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="nombre_completo"
                label="Nombre completo del usuario"
                type="text"
                id="nombre_completo"
                onChange={handleChange}
              />

              <Box>
                  <Grid container spacing={3}> {/* Wrapper Grid container */}
                      <Grid item xs={6}> {/* First Grid item */}
                          <InputLabel id="rol">Rol del usuario</InputLabel>
                          <Select
                              labelId="rol"
                              id="rol"
                              label="rol"
                              name="rol"
                              value={inputs.rol}
                              onChange={handleChange}
                          >
                              <MenuItem value={"Jugador"}>Jugador</MenuItem>
                              <MenuItem value={"Administrador"}>Administrador</MenuItem>
                          </Select>
                      </Grid>

                      <Grid item xs={6}> {/* Second Grid item */}
                          <InputLabel id="categoria">Categoría del jugador</InputLabel>
                          <Select
                              labelId="categoria"
                              id="categoria"
                              label="categoria"
                              name="categoria"
                              value={inputs.categoria}
                              onChange={handleChange}
                          >
                              <MenuItem value={"alevin"}>Alevin</MenuItem>
                              <MenuItem value={"mini_femenino"}>Mini femenino</MenuItem>
                              <MenuItem value={"mini_masculino"}>Mini masculino</MenuItem>
                              <MenuItem value={"infantil_femenino"}>Infantil femenino</MenuItem>
                              <MenuItem value={"infantil_masculino"}>Infantil masculino</MenuItem>
                              <MenuItem value={"cadete_femenino"}>Cadete femenino</MenuItem>
                              <MenuItem value={"cadete_masculino"}>Cadete masculino</MenuItem>
                              <MenuItem value={"juvenil_femenino"}>Juvenil femenino</MenuItem>
                              <MenuItem value={"juvenil_masculino"}>Juvenil masculino</MenuItem>
                              <MenuItem value={"adulto_femenino"}>Adulto femenino</MenuItem>
                              <MenuItem value={"adulto_masculino"}>Adulto masculino</MenuItem>
                          </Select>
                      </Grid>
                  </Grid>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                name="telefono"
                label="Teléfono asociado al usuario"
                type="text"
                id="telefono"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña asignada al usuario"
                type="password"
                id="password"
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrar persona
              </Button>           
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}