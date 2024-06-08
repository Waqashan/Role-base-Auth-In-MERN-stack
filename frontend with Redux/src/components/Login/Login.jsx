import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";

import Checkbox from "@mui/material/Checkbox"; 
import {
  Box,
  Grid,
  FormControlLabel,
  Typography,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../services/login";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFail,
} from "../../feature/userLoginSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data);
    dispatch(loginStart()); // Dispatching login start action
    try {
      const resp = await LoginApi(data);

      if (resp && resp.status === 200) {
        localStorage.setItem("mytoken", resp.data.user.token);
        toast.success(resp.data.message);
        setTimeout(() => {
          if (resp.data.user.role === "admin") {
            navigate("/inbox");
          } else {
            navigate("/user-profile");
          }
        }, 2000);
        dispatch(loginSuccess(resp.data.user)); // Dispatching login success action with user data
      } else {
        toast.error(resp.data.message);
        dispatch(loginFail(resp.data.message)); // Dispatching login fail action with error message
      }
    } catch (error) {
      toast.error("check your network connection.");
      dispatch(loginFail("check your network connection.")); // Dispatching login fail action with error message
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
      >
        <Grid item xs={12} md={5} sx={{ height: "500px" }}>
          <Item sx={{ padding: "30px" }}>
            <Typography variant="h3" textAlign={"center"}>
              Log In
            </Typography>
            <Box>
              <ToastContainer />
              <form onSubmit={handleSubmit}>
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
                <Box
                mt={1}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={rememberMe}
                        // onChange={handleRememberMeChange}
                      />
                    }
                    label="Remember Me"
                  />
                </Box>
                <NavLink to="/forgot-password">Forgot Password</NavLink>
              </Box>
                <Box my={2} sx={{ display: "flex", gap: "10px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ padding: "10px 30px", width: "100%",background:"black" }}
                  >
                    Log In
                  </Button>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: "6px" }}>
          
            <Typography>Don't have an account?</Typography>
            <NavLink to="/signup">Register</NavLink>
          </Box>
              </form>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
