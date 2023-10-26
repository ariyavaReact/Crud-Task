import React,{useState} from 'react';
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
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
//hook form 
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignupSchema = yup.object().shape({
    email: yup.string()
    .required("Email is required")
    .nullable()
    .email("Email is invalid")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,5}$/g, "Invalid Email Address")
    .trim(),
    password: yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
      "Must be 8 Characters one small capital letter number and special character"
    )
    .trim(),
  });
export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(SignupSchema)
      });

     
      const navigate = useNavigate();

      const onSubmit = (data) => {
        let emailStatus = data.email !== "archanadevi.m@sciflare.com";
        let passwordStatus = data.password !== "Task@123";
      
        if (emailStatus && passwordStatus) {
          toast.error("Invalid Email and Password");
        } else if (emailStatus) {
          toast.error("Invalid Email");
        } else if (passwordStatus) {
          toast.error("Invalid Password");
        } else {
          navigate('/dashboard');
          toast.success("Login successfully");
        }
      };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <from  onSubmit={handleSubmit(onSubmit)}>
          <Box component="form"  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email")}
            />
                    {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")}
            />
             {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
           
          </Box>    
          </from>
        
        </Box>
      </Container>
    </ThemeProvider>
  );
}