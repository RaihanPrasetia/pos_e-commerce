import { Grid, Typography } from '@mui/material'
import React from 'react'
import OverviewCard from './OverviewCard'
import { GiftIcon } from '@heroicons/react/16/solid'

const LoyalProgram = () => {
    return (
        <Grid item xs={12} sm={6}>
            <OverviewCard
                title='Loyal Program'
                icons={<GiftIcon className='w-10 p-2 rounded-full text-white bg-utama' />}
                title2={<Typography variant='body2' className='font-bold bg-utama w-max py-1 px-3 rounded-lg text-white'>Platinum member</Typography>}
                subTitle='3000 points to next tier'
            />
        </Grid>
    )
}

export default LoyalProgram
