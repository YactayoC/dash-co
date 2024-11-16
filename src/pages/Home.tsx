import React, { useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (!userName) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <iframe
          title="Power BI Report"
          src="https://app.powerbi.com/reportEmbed?reportId=<YOUR_REPORT_ID>&groupId=<YOUR_GROUP_ID>"
          width="100%"
          height="100%"
          style={{
            border: "none",
            minHeight: "500px",
            minWidth: "100%",
            flexGrow: 1,
          }}
          allowFullScreen
        ></iframe>
      </Container>
    </Box>
  );
};

export default Home;
