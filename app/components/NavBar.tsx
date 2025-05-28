import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useAuth } from "~/context/AuthContext";
import { LoginIcon } from "./Auth/LoginIcon";

export const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6" component="div">
                    Cortex Dashboard
                </Typography>

                <Box>
                    {user ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Typography variant="body2">
                                {user.displayName || user.email}
                            </Typography>
                            <Button variant="outlined" color="primary" onClick={logout}>
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <LoginIcon />
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
