import { CustomerType } from '@/type/cutomersType';
import { TextField, Grid } from '@mui/material';
import React from 'react';

export type CustomerCountryProps = {
    formData: CustomerType;
    setFormData: React.Dispatch<React.SetStateAction<CustomerType>>;
};

const CustomerCountry = ({ formData, setFormData }: CustomerCountryProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div className='space-y-2 rounded-md shadow-mui-customShadow bg-white p-6 h-[100%]'>
            <span className='text-slate-600 font-semibold text-lg'>Customer Address</span>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        id='city'
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id='country'
                        fullWidth
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id='state'
                        fullWidth
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id='address'
                        fullWidth
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </Grid>



            </Grid>
        </div>
    );
};

export default CustomerCountry;