import React, { useState } from "react";
import { Grid, Button, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/book", { state: { email: user } });
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "20vh" }}
    >
      <Grid item>
        <Typography variant="h4">Login</Typography>
      </Grid>
      <Grid item>
        <TextField
          value={user}
          fullWidth
          label="Email"
          variant="outlined"
          onChange={(e) => setUser(e.target.value)}
          required
          type="email"
        />
      </Grid>
      <Grid item>
        <TextField
          type="password"
          fullWidth
          label="Password"
          variant="outlined"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
      </Grid>
      <Grid item>
        <Button onClick={handleLogin} variant="contained">
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
