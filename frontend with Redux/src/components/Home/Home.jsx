import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import LayOut from "../../layout/LayOut";


import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Home = () => {
  
  useEffect(() => {

  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={12}>
            <Item><Typography variant="h3">Home</Typography></Item>
          </Grid>
         
        </Grid>
      </Box>
    </>
  );
};

export default Home;
