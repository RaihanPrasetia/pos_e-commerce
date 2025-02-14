import { Grid, Typography } from '@mui/material';
import React from 'react';
import OverviewCard from './OverviewCard';
import { TicketIcon } from '@heroicons/react/16/solid';

const Coupons = () => {
    return (
        <Grid item xs={12} sm={6}>
            <OverviewCard
                title='Coupons'
                icons={<TicketIcon className='w-10 p-2 rounded-full text-white bg-utama' />}
                title2={<Typography variant='h6' className='text-utama font-bold'>5 <span className='text-sm text-slate-800 font-medium'>Coupons you win</span></Typography>}
                subTitle='Use coupon on next purchase'
            />
        </Grid>
    );
};

export default Coupons;
