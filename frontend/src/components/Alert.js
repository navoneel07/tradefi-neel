import React from "react";
import { Snackbar } from "@mui/material";
const Alert = (props) => {
  const { message, severity } = props;
  return (
    <Snackbar open={true} autoHideDuration={3000}>
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Alert;
