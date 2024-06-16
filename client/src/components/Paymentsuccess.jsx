import React from 'react';
import { useSearchParams } from "react-router-dom";
import { Box, Typography, Container } from '@mui/material';

const Paymentsuccess = () => {
    const [searchParams] = useSearchParams();
    const referenceNum = searchParams.get("reference");
    console.log(referenceNum);

    return (
        <Container maxWidth="sm" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box textAlign="center">
                <Typography variant="h4" component="h1" gutterBottom style={{ textTransform: 'uppercase' }}>
                    Order Successful
                </Typography>
                <Typography variant="body1">
                    Reference No. {referenceNum}
                </Typography>
            </Box>
        </Container>
    );
}

export default Paymentsuccess;
