import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";

export default function Welcome() {
  // Function to handle button click
  const navigate = useNavigate();
  const handleButtonClick = (answer) => {
    if (answer === "No") {
      alert("עלייך לאשר את התנאים אם ברצונך להשתתף בשאלון");
      return;
    }
    if (answer === "Yes") {
      navigate(ROUTES.EXPLANATION);
    }
  };

  return (
    <Container sx={{ padding: 10 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "right" }}>
        שלום רב, לפניכם שאלון בנושא בחירה של מוצרים , אין בשאלון תשובות נכונות
        ולא נכונות ומה שחשוב לנו שתענו בכנות. השאלון אנונימי והנתונים שיאספו
        שימשו לצורכי מחקר אקדמי בלבד. הזמן הצפוי למענה על השאלון הוא כ-5 דקות
        והנכם ראשיים להפסיק את השאלון בכל עת. בכל בעיה ניתן לפנות אל צוות המחקר
        בדואר אלקטרוני
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "right" }}>
        be@ruppin.ac.il
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "right" }}>
        בלחיצתכם על כפתור המשך הנכם מאשרים כי
      </Typography>
      <List
        sx={{
          direction: "rtl",
        }}
      >
        <ListItem sx={{ textAlign: "right" }}>
          <ListItemText primary="1. אתם מסכימים להשתתף במחקר כמפורט למעלה." />
        </ListItem>
        <ListItem sx={{ textAlign: "right" }}>
          <ListItemText primary="2. הוסברה לכם מטרת המחקר באופן כללי." />
        </ListItem>
        <ListItem sx={{ textAlign: "right" }}>
          <ListItemText primary="3. הוסבר לכם משך הצפוי של המחקר." />
        </ListItem>
        <ListItem sx={{ textAlign: "right" }}>
          <ListItemText primary="4. הוסבר לכם כי אני ראשי להפסיק את המחקר בכל זמן שתחפצו." />
        </ListItem>
        <ListItem sx={{ textAlign: "right" }}>
          <ListItemText primary="5. הוסבר לכם שהמחקר הוא אנונימי ופרטכם האישיים לא ישמרו." />
        </ListItem>
        <ListItem sx={{ textAlign: "right" }}>
          <ListItemText primary="6. הוסבר לכם כי כלל הפרטים שיאספו ישמשו למחקר אקדמי בלבד." />
        </ListItem>
        <ListItem sx={{ textAlign: "right" }}>
          <ListItemText primary="7. הוסבר לכם כי כל בעיה הקשורה למחקר תוכלו לפנות אל המחקר להתייעצות נוספת." />
        </ListItem>
        <ListItem sx={{ textAlign: "right" }}>
          <ListItemText primary='8. הנכם מצהירים בזה כי נתתם את הסכמתי הנ"ל מרצונכם החופשי וכי הבנתם את כל האמור לעיל.' />
        </ListItem>
      </List>
      <Box mt={4} sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick("Yes")}
          sx={{ marginX: 1 }}
        >
          כן
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleButtonClick("No")}
          sx={{ marginX: 1 }}
        >
          לא
        </Button>
      </Box>
    </Container>
  );
}
