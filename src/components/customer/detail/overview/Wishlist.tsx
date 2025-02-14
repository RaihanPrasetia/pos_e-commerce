import { Grid, Typography } from '@mui/material'
import React from 'react'
import OverviewCard from './OverviewCard'
import { StarIcon } from '@heroicons/react/16/solid'

const Wishlist = () => {
    return (
        <Grid item xs={12} sm={6}>
            <OverviewCard
                title='Whislist'
                icons={<StarIcon className='w-10 p-2 rounded-full text-white bg-utama' />}
                title2={<Typography variant='h6' className='text-utama font-bold'>15 <span className='text-sm text-slate-800 font-medium'>Items in whislist</span></Typography>}
                subTitle='Receive notifications on price drops'
            />
        </Grid>
    )
}

export default Wishlist
