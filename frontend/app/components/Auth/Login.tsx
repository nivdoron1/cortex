import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Typography } from '@mui/material';
import LoginIcon from './LoginIcon'; // Adjust path as needed

export default function Login() {
    const theme = useTheme();

    return (
        <AppProvider theme={theme}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                bgcolor="#f0f2f5"
            >
                <Card sx={{ minWidth: 360, padding: 3, boxShadow: 4 }}>
                    <CardContent>
                        <Typography variant="h5" textAlign="center" gutterBottom>
                            Welcome to the Dashboard of Cortex
                        </Typography>
                        <Typography variant="body1" textAlign="center" color="text.secondary" mb={2}>
                            Please log in with your Google account
                        </Typography>
                        <Box display="flex" justifyContent="center">
                            <LoginIcon />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </AppProvider>
    );
}
