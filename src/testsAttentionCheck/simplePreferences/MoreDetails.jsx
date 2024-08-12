import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function MoreDetails({ age, setAge, gender, setGender, setCoupleIndex }) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh", // Full height of the viewport
        alignItems: "center", // Centers the content vertically
        justifyContent: "center", // Centers the content horizontally
      }}
    >
      <Box sx={{ p: 2, width: "100%", maxWidth: "500px" }}>
        {/* You can adjust maxWidth to fit your needs */}
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
          פרטים אחרונים
        </Typography>
        <Grid container spacing={2} sx={{ direction: "rtl" }}>
          {/* Added RTL direction */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth // Makes TextField take full width
              label="גיל"
              variant="outlined"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>מין</InputLabel>
              <Select
                value={gender}
                label="מין"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value={""}></MenuItem>
                <MenuItem value={"male"}>זכר</MenuItem>
                <MenuItem value={"female"}>נקבה</MenuItem>
                <MenuItem value={"prefer not to say"}>מעדיף לא לומר</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{ mt: 2, width: "100%" }} // Button takes full width
          onClick={() => setCoupleIndex((prev) => prev + 1)}
          disabled={
            !["male", "female", "prefer not to say"].includes(gender) ||
            age <= 0 ||
            age > 120
          }
        >
          סיום
        </Button>
      </Box>
    </Box>
  );
}

export default MoreDetails;
