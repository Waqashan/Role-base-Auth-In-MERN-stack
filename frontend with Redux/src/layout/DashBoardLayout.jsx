import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemIcon from "@mui/material/ListItemIcon"; // Import ListItemIcon
import "./layout.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

function DashBoardLayout(props) {
  let navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const handleLogout = () => {
    // Perform logout logic here, such as clearing token from local storage
    localStorage.removeItem("mytoken");
    // Redirect the user to the login page
    navigate("/login");
  };
  const itemsList = [
    // {
    //   text: "Dashboard",
    //   path: "/Dashboard",
    //   icon: <InboxIcon />,
    // },
    {
      text: "Inbox",
      path: "/inbox",
      icon: <MailIcon />,
    },
    {
      text: "Logout",
      path: "/inventory",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },

    // Add other menu items here
  ];

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Box
        sx={{
          display: "flex",
          boxSizing: "border-box",
          height: "100px",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={"img"}
          src="./assets/1.jpg"
          sx={{
            width: "90px",
            height: "90px",
            objectFit: "cover",
            borderRadius: "50%",
            marginTop: "50px",
          }}
        ></Box>
        <Typography
          variant="subtiltle"
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        >
          @Waqas khan
        </Typography>
      </Box>
      <Toolbar />

      <Divider />
      <List>
        {itemsList.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            className="navitem"
            onClick={item.onClick}
          >
            <ListItemIcon sx={{ padding: "18px" }}>{item.icon}</ListItemIcon>
            <NavLink to={item.path} onClick={handleDrawerClose}>
              <ListItemText primary={item.text} />
            </NavLink>
          </ListItem>
        ))}
      </List>

      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {/* <Box
            sx={{
              display: "flex",
              boxSizing: "border-box",
              height: "100px",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component={"img"}
              src="./assets/1.jpg"
              sx={{
                width: "90px",
                height: "90px",
                objectFit:"cover",
                borderRadius: "50%",
                marginTop: "50px",
              }}
            ></Box>
          </Box> */}
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}

DashBoardLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashBoardLayout;
