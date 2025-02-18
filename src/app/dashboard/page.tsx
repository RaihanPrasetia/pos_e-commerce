"use client"
import DailyActivity from '@/components/dashboard/DailyActivity'
import InfoCard from '@/components/dashboard/InfoCard'
import MarketingReport from '@/components/dashboard/MarketingReport'
import Payment from '@/components/dashboard/Payment'
import ProductSale from '@/components/dashboard/ProductSale'
import SalesProfit from '@/components/dashboard/SalesProfit'
import WellcomeCard from '@/components/dashboard/WellcomeCard'
import { Grid } from '@mui/material'
import React from 'react'

export default function page() {
    return (
        <Grid container spacing={4}>
            {/* Wellcome Card */}
            <Grid item xs={12} sm={6}>
                <WellcomeCard />
            </Grid>

            {/* Info Card */}
            <Grid item xs={12} sm={6}>
                <InfoCard />
            </Grid>


            {/* Sales Profit */}
            <Grid item xs={12} sm={8}>
                <SalesProfit />
            </Grid>


            {/* Product Sale */}
            <Grid item xs={12} sm={4}>
                <ProductSale />
            </Grid>


            {/* Marketing Report */}
            <Grid item xs={12} sm={6}>
                <MarketingReport />
            </Grid>

            {/* Payment Report */}
            <Grid item xs={12} sm={3}>

                <Payment />
            </Grid>


            {/* Daily Activity */}
            <Grid item xs={12} sm={3}>

                <DailyActivity />
            </Grid>

        </Grid>
    )
}
