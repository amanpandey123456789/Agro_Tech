import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Button, Container, Box, Drawer, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import Login from "./components/Login";
import Register from "./components/Register";
import FarmerDashboard from "./components/FarmerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import ViewCrops from "./components/ViewCrops";

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green theme
    },
    secondary: {
      main: '#ff9800',
    },
  },
});

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    setCurrentView('home');
  };

  const handleLoginSuccess = (userRole) => {
    setRole(userRole);
    if (userRole === 'farmer') {
      setCurrentView('farmer-dashboard');
    } else if (userRole === 'admin') {
      setCurrentView('admin-dashboard');
    } else if (userRole === 'customer') {
      setCurrentView('customer-dashboard');
    }
  };

  const renderContent = () => {
    if (!role) {
      switch (currentView) {
        case 'login':
          return <Login onLoginSuccess={handleLoginSuccess} onBack={() => setCurrentView('home')} />;
        case 'register':
          return <Register onBack={() => setCurrentView('home')} />;
        default:
          return (
            <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
              <Typography variant="h2" component="h1" gutterBottom>
                Welcome to AgroConnect
              </Typography>
              <Typography variant="h5" component="p" sx={{ mb: 4 }}>
                Connecting Farmers and Buyers for Better Agriculture
              </Typography>
              <Typography variant="body1" sx={{ mb: 6 }}>
                Join our platform to manage your crops, connect with buyers, and grow your agricultural business.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button variant="contained" size="large" onClick={() => setCurrentView('login')}>
                  Login
                </Button>
                <Button variant="outlined" size="large" onClick={() => setCurrentView('register')}>
                  Create Account
                </Button>
              </Box>
              <Card sx={{ mt: 6, mx: 'auto', maxWidth: 600 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Features
                  </Typography>
                  <Typography variant="body2">
                    • Farmers can add and manage their crops<br/>
                    • Admins can oversee user management<br/>
                    • Browse available crops from all farmers<br/>
                    • Secure authentication and role-based access
                  </Typography>
                </CardContent>
              </Card>
            </Container>
          );
      }
    }

    switch (currentView) {
      case 'farmer-dashboard':
        return <FarmerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'customer-dashboard':
        return <CustomerDashboard />;
      case 'view-crops':
        return <ViewCrops />;
      default:
        return <ViewCrops />;
    }
  };

  const getMenuItems = () => {
    if (role === 'farmer') {
      return [
        { text: 'Dashboard', view: 'farmer-dashboard' },
        { text: 'View Crops', view: 'view-crops' },
      ];
    } else if (role === 'admin') {
      return [
        { text: 'Dashboard', view: 'admin-dashboard' },
        { text: 'View Crops', view: 'view-crops' },
      ];
    } else if (role === 'customer') {
      return [
        { text: 'Dashboard', view: 'customer-dashboard' },
        { text: 'View Crops', view: 'view-crops' },
      ];
    }
    return [];
  };

  const menuItems = getMenuItems();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => setCurrentView('home')}>
            AgroConnect
          </Typography>
          {role && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex' }}>
        {role && (
          <Drawer
            variant="permanent"
            sx={{
              width: 240,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                {menuItems.map((item) => (
                  <ListItem button key={item.text} onClick={() => setCurrentView(item.view)}>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        )}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
