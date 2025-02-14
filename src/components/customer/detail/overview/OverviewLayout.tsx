import { Grid } from '@mui/material'
import React from 'react'
import AccBalance from './AccBalance'
import LoyalProgram from './LoyalProgram'
import CustumerOrder from './CustumerOrder'
import Wishlist from './Wishlist'
import Coupons from './Coupons'

export const OverviewLayout = () => {
    return (
        <Grid container spacing={4}>
            {/* Account Balance */}
            <AccBalance />

            {/* Loyal Program */}
            <LoyalProgram />

            {/* Wishlist */}
            <Wishlist />

            {/* Coupons */}
            <Coupons />

            {/* Customer Order */}
            <CustumerOrder />
        </Grid>
    )
}

export default OverviewLayout
