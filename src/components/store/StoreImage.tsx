import { Grid, Typography } from '@mui/material';
import React from 'react'

interface StoreImageProps {
    imageUrl: string | null;
    name: string;
}

const StoreImage: React.FC<StoreImageProps> = ({ imageUrl, name }) => {
    return (
        <Grid item xs={12} sm={4}>
            <div className='w-full items-center flex flex-col'>
                <img src={imageUrl || "/assets/img/logos/store-logo.png"} alt={name} className="w-full h-full object-cover" />
                <Typography variant='h5' fontWeight="bold">{name}</Typography>
            </div>
        </Grid>
    )
}

export default StoreImage
