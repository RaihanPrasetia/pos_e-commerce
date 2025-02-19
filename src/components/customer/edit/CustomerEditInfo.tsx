import { CustomerType } from '@type/cutomersType';
import { TextField, Grid } from '@mui/material';
import React from 'react';

export type CustomerInfoProps = {
    formData: CustomerType | undefined;
    setFormData: React.Dispatch<React.SetStateAction<CustomerType>>;
};

const CustomerEditInfo = ({ formData, setFormData }: CustomerInfoProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData: CustomerType) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div className='space-y-2 rounded-md shadow-mui-customShadow bg-white p-6 h-[100%]'>
            <span className='text-slate-600 font-semibold text-lg'>Customer Information</span>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        id='name'
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData?.name || ""}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData?.phone || ""}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="ZIP Code"
                        name="zip"
                        value={formData?.zip || ""}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={formData?.email || ""}
                        onChange={handleInputChange}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default CustomerEditInfo;