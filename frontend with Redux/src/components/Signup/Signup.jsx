import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  Box,
  Grid,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {
  signupStart,
  signupSuccess,
  signupFail,
} from "../../feature/signupSlice";
import { SignUp } from "../../services/SignUp";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signupStart());

    try {
      const resp = await SignUp(data);

      if (resp && resp.status === 200) {
        console.log(resp, "resssssssssss");
        dispatch(signupSuccess(resp.data.userdata));
        toast.success(resp.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        console.log(resp, "resssssssssss");
        dispatch(signupFail(resp.data.message));
        toast.error(resp.data.message);
      }
    } catch (error) {
      dispatch(signupFail("Check your network connection."));
      toast.error("Check your network connection.");
    }
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} p={2}>
          <Item sx={{ padding: "30px" }}>
            <Typography variant="h3" textAlign="center">
              Signup
            </Typography>
            <Box>
              <ToastContainer />
              <form onSubmit={handleSubmit}>
                <Box my={4}>
                  <FormControl fullWidth>
                    <TextField
                      value={data.name}
                      fullWidth
                      label="Enter your Username"
                      name="name"
                      onChange={handleChange}
                      variant="outlined"
                      style={{ borderRadius: "12px" }}
                    />
                  </FormControl>
                </Box>
                <Box my={4}>
                  <FormControl fullWidth>
                    <TextField
                      value={data.email}
                      fullWidth
                      label="Enter your email"
                      name="email"
                      onChange={handleChange}
                      variant="outlined"
                      style={{ borderRadius: "12px" }}
                    />
                  </FormControl>
                </Box>
                <Box my={4}>
                  <FormControl fullWidth>
                    <TextField
                      value={data.password}
                      fullWidth
                      label="Enter your password"
                      name="password"
                      onChange={handleChange}
                      variant="outlined"
                      style={{ borderRadius: "12px" }}
                    />
                  </FormControl>
                </Box>
                <Box my={2} sx={{ display: "flex", gap: "10px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ padding: "10px 30px" }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </form>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Signup;
