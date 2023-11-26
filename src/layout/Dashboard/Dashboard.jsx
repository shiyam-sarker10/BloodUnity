import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useAuth from "../../hooks/useAuth";
import { Avatar } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link, Outlet } from 'react-router-dom';
import useUserInfo from "../../hooks/useUserInfo";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
     const [UserInfo] = useUserInfo();

    const {user} = useAuth();
    console.log(user)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="bg-[#EB2C29] h-screen">
      <div className="flex flex-col items-center space-y-3 py-8">
        <Avatar
          alt="Remy Sharp"
          src={UserInfo?.imageUrl}
          sx={{ width: 70, height: 70 }}
        />
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "20px",
            fontWeight: "500",
            color: "white",
          }}
        >
          {UserInfo?.name}
        </Typography>
      </div>

      <List>
        {["Dashboard", "Profile", "Create Request", "My Request"].map(
          (text, index) => (
            <Link
              key={index}
              to={`/dashboard${
                text === "Dashboard" ? "" : `/${text.toLowerCase()}`
              }`}
            >
              <ListItem disablePadding>
                <ListItemButton sx={{ color: "white" }}>
                  <ListItemIcon sx={{ color: "white" }}>
                    {(index === 0 && (
                      <DashboardIcon
                        sx={{ mr: 1, fontSize: "25px", color: "white" }}
                      />
                    )) ||
                      (index === 1 && (
                        <AccountBoxIcon
                          sx={{ mr: 1, fontSize: "25px", color: "white" }}
                        />
                      )) ||
                      (index === 2 && (
                        <MedicalServicesIcon
                          sx={{ mr: 1, fontSize: "25px", color: "white" }}
                        />
                      )) ||
                      (index === 3 && (
                        <HandshakeIcon
                          sx={{ mr: 1, fontSize: "25px", color: "white" }}
                        />
                      ))}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        )}
      </List>

      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ color: "white" }}>
            <ListItemIcon>
              <ExitToAppIcon sx={{ mr: 1, fontSize: "25px", color: "white" }} />
            </ListItemIcon>
            LogOut
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
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
          backgroundColor: "rgb(220 38 38)",
        }}
      >
        <div className="xs:block sm:hidden">
          <Toolbar>
            <IconButton
              color="transparent"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </div>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
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
        <Outlet />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
