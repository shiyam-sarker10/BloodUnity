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
import { Link, Outlet, useNavigate } from 'react-router-dom';
import useUserInfo from "../../hooks/useUserInfo";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HandshakeIcon from '@mui/icons-material/Handshake';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { FaUsers } from "react-icons/fa";
import { MdBadge } from "react-icons/md";
import { FaSuitcaseMedical } from "react-icons/fa6";
import { IoDocumentTextSharp } from "react-icons/io5";
import HomeIcon from "@mui/icons-material/Home";

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

  const {LogOut} = useAuth()


  const handleLogOut = () =>{
    LogOut()
    .then(()=>{
    })
  }

  const drawer = (
    <div className="bg-gradient-to-tl from-[#9c102c] to-[#EB2C29] h-screen">
      <div className="flex flex-col items-center space-y-3 py-8">
        <Avatar
          alt="Remy Sharp"
          src={UserInfo?.imageUrl}
          sx={{
            width: 80,
            height: 80,
            border: "2px solid white",
            boxShadow: "0px 0px 15px 2px white",
          }}
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

      {UserInfo?.role === "admin" ? (
        <List>
          {[
            "Dashboard",
            "Profile",
            "All Users",
            "All Donation Request",
            "Content Management",
          ].map((text, index) => (
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
                        <MdBadge className="mr-1 text-[25px] text-white" />
                      )) ||
                      (index === 2 && (
                        <FaUsers className="text-[25px] mr-1 text-white" />
                      )) ||
                      (index === 3 && (
                        <FaSuitcaseMedical className="text-[25px] mr-1 text-white" />
                      )) ||
                      (index === 4 && (
                        <IoDocumentTextSharp className="text-[25px] mr-1 text-white" />
                      ))}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      ) : UserInfo?.role === "donor" ? (
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
      ) : UserInfo?.role === "volunteer" ? (
        <List>
          {["Dashboard", "All Donation Request", "Content Management"].map(
            (text, index) => (
              <Link
                key={index}
                to={`/dashboard/${
                  text === "All Donation Request"
                    ? "all blood donation request"
                    : text === "Content Management"
                    ? "volunteer content management"
                    : text === "Dashboard"
                    ? ""
                    : `/${text.toLowerCase()}`
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
      ) : (
        <div className="text-white p-4">
          Loadinng .....
            </div>
          )}

      <Divider />
      <Link to="/">
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ color: "white" }}>
              <ListItemIcon>
                <HomeIcon sx={{ mr: 1, fontSize: "25px", color: "white" }} />
              </ListItemIcon>
              Home
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </List>
      </Link>
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
          background: "linear-gradient(to bottom right, #9c102c, #EB2C29)",
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
            Welcome To Dashboard
          </Typography>
        </Toolbar>
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
        <Outlet></Outlet>
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
