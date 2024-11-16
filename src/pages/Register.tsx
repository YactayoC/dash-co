import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type RegisterFormInputs = {
  username: string;
  password: string;
  fullName: string;
};

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const { onRegister, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await onRegister(data);
      navigate("/login");
    } catch (err) {
      console.error("Error al manejar el login:", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          height: "100vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="fullName"
            label="Nombres"
            {...register("fullName", {
              required: "El nombre es requerido",
            })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            autoComplete="fullName"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Nombre de usuario"
            {...register("username", {
              required: "El nombre de usuario es requerido",
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            label="Contraseña"
            type="password"
            id="password"
            {...register("password", {
              required: "Contraseña requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            autoComplete="current-password"
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
          <Grid container>
            <Grid item>
              <Typography variant="body2" color="primary">
                Tienes una cuenta?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Inicia sesión
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
