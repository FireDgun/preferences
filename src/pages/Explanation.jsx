import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";

export default function Explanation() {
  // Function to handle button click
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(ROUTES.TEST);
  };

  return (
    <Container sx={{ padding: 10 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "right" }}>
        לניסוי זה שני חלקים, החלק השני יתבצע בעוד שבוע. בשני החלקים תתבקשו לבצע
        מספר בחירות בין מוצרים שונים. בסוף שני חלקי הניסוי, אחת מכל הבחירות
        שעשיתם תבחר באופן אקראי ואתם תקבל את המוצר שבחרת בבחירה זו.
      </Typography>

      <Box mt={30} sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleButtonClick}
          sx={{ marginX: 1 }}
        >
          המשך
        </Button>
      </Box>
    </Container>
  );
}
