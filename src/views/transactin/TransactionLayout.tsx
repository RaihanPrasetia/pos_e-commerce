"use client"
import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import TransactionProduct from './TransactionProduct'
import TransactionItem from './TransactionItem'

const TransactionLayout = () => {
    return (
        <Card>
            <CardContent >
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={6}>
                        <TransactionProduct />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TransactionItem />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default TransactionLayout
