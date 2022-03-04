import React from "react";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import Paper from "@mui/material/Paper";
import { Grid, Box } from "@mui/material";
import LoginForm from "./LoginForm";
const Login = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Grid item>
          <LoginForm />
        </Grid>
      </Box>
    </Grid>
  );
};

export default Login;
