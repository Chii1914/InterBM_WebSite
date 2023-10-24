import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Background_local from './Images/Evento.jpg';
import axios from "axios";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function SignIn() {
  
  
  const [inputs, setInputs] = useState({
    RUN: "",
    password: "",
  })
  const handleChange = e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
} 
  const handleSubmit = async e =>{
    e.preventDefault()
    try{
        console.log(inputs)
        const res = await axios.get("/userver/", inputs)
        if(res.status === 200){
         
        }
    }catch(err){
    }
  }




  
  const background = Background_local;
  return (
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
       <Box
            sx={{
              backgroundImage: `url(${background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '100vh',
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center' 
            }}
        >     
        <Box
          sx={{
            width: '500px',
            height: '500px',
            backgroundColor: 'white',
            border: '1px solid gray',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',          
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src='https://pbs.twimg.com/profile_images/681180785504862208/RNR8RGGM_400x400.jpg'>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Inicio de sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="RUN"
              label="Ingresa tu Rut sin puntos ni guión"
              name="RUN"
              autoComplete="RUN"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuérdame"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Box>

    </ThemeProvider>
  );
}