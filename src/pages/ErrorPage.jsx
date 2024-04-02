import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh", // Full viewport height
        color: "text.primary",
        p: 3, // Padding
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        העמוד לא נמצא
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        חזור לעמוד הראשי
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        חזור
      </Button>
    </Box>
  );
}
