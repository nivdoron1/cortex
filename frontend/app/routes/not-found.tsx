import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();
    const handleBackHome = () => {
        navigate("/");
      };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <Container maxWidth="md">
                <Grid container spacing={2}>
                    <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" minHeight="100vh" p={4}>
                        <Box flex="1 1 50%" p={2}>
                            <Typography variant="h1">404</Typography>
                            <Typography variant="h6" mb={2}>
                                The page you’re looking for doesn’t exist.
                            </Typography>
                            <Button onClick={handleBackHome} variant="contained">Back Home</Button>
                        </Box>
                        <Box flex="1 1 50%" p={2} textAlign="center">
                            <img
                                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                                alt="404 illustration"
                                width={500}
                                height={250}
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Container>
        </Box>
    );
}