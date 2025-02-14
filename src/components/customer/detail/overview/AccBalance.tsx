import { CurrencyDollarIcon } from '@heroicons/react/16/solid'
import { Grid, Typography } from '@mui/material'
import React from 'react'
import OverviewCard from './OverviewCard'

const AccBalance = () => {
    return (
        <Grid item xs={12} sm={6}>
            <OverviewCard
                title='Account Balance'
                icons={<CurrencyDollarIcon className='w-10 p-2 rounded-full text-white bg-utama' />}
                title2={<Typography variant='h6' className='text-utama font-bold'>$2705 <span className='text-sm text-slate-800 font-medium'>Credit Left</span></Typography>}
                subTitle='Account balance for next purchase'
            />
        </Grid>
    )
}

export default AccBalance
