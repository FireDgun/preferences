import React from "react";
import { Typography, Box } from "@mui/material";
import BackButton from "../components/BackButton";

export default function StageOneClosed() {
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
        ברוך הבא
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        המענה על השאלון סגור כרגע למשתתפים חדשים
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        במידה וכבר עשית את שלב א' - יש לשים לב שהקלדת את ת.ז ללא שגיאות
      </Typography>
      <BackButton />
    </Box>
  );
}
