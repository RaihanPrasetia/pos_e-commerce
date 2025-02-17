import { storeType } from '@/type/storeTypes';
import { Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

interface StoreInformationProps {
    storeData: storeType;
}

function StoreInformation({ storeData }: StoreInformationProps) {
    return (
        <Grid item xs={12} sm={8}>
            <Card>
                <CardContent className='space-y-4 shadow-mui-customShadow'>
                    <Typography variant='h6' fontWeight="bold">Store Information</Typography>
                    <TextField
                        fullWidth
                        label="Store Name"
                        value={storeData.storeName}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        value={storeData.storeEmail}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        value={storeData.phoneNumber}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Address"
                        value={storeData.storeAddress}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default StoreInformation;
