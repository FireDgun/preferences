import React from "react";
import { Typography, Box } from "@mui/material";

export default function ThankYou() {
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
        תודה רבה על השתתפותך בשאלון!
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        אנו מעריכים את הזמן והמחשבה שהקדשת.
      </Typography>
    </Box>
  );
}
