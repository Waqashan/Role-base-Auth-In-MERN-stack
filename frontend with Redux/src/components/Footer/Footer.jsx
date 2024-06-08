import { Typography, Grid, Link, TextField, Button, Box,InputBase} from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box sx={{ background: "#252525", color: "white" }}>
        <Grid
          container
          spacing={2}
          mt={1}
          sx={{ padding: { xs: "0 10px", sm: "0 5px" } }}
        >
          <Grid item xs={12} sm={6} md={4} mb={2}>
            <Typography variant="h6">Contact Us</Typography>

            <Typography  variant="body1">
              Email:waqaskhan26394@gmail.com
            </Typography>
            <Typography variant="subtitle1">Phone: +92340-9495625</Typography>
            <Typography variant="subtitle1">
              Address: GullBerg-III, Lahore, Pakistan
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2} mb={2}>
            <Typography variant="h6">Useful Links</Typography>
            <Box
              sx={{ display: "flex", gap: "2px 5px", flexDirection: "column" }}
            >
              <Link  style={{textDecoration:"none",color:"white",fontSize:"14px"}} href="/about">About Us</Link>
              <Link  style={{textDecoration:"none",color:"white",fontSize:"14px"}} href="/faq">FAQ</Link>
              <Link  style={{textDecoration:"none",color:"white",fontSize:"14px"}} href="/terms">Terms & Conditions</Link>
              <Link  style={{textDecoration:"none",color:"white",fontSize:"14px"}} href="/privacy">Privacy Policy</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3} mb={2}>
            <Typography variant="h6">Connect With Us</Typography>
            <Box
              sx={{ display: "flex", gap: "2px 5px", flexDirection: "column" }}
            >
              <Link  style={{textDecoration:"none",color:"white",fontSize:"14px"}} href="#">Facebook</Link>
              <Link  style={{textDecoration:"none",color:"white",fontSize:"14px"}} href="#">Twitter</Link>
              <Link  style={{textDecoration:"none",color:"white",fontSize:"14px"}} href="#">Instagram</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" mb={2}>Subscribe to Our Newsletter</Typography>
            <TextField
          sx={{width:"90%"}}
              size="small"
              style={{ padding: "0px 2px" }}
              label="Enter your email"
              variant="outlined"
             
            />
            <Button
              sx={{ marginTop: "10px" }}
              variant="contained"
              color="primary"
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body2">
          © {new Date().getFullYear()} Webseowiz Tech. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
