import { CheckCircleIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

const TaxInfo = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant='h6' fontWeight="bold" className='mb-4'>Tax Info</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={6} sm={3}>
                        <div className='bg-gradient-to-br from-lime-50 to-green-50 shadow-md flex h-full items-center p-4 rounded-md space-x-4'>
                            <CurrencyDollarIcon className='w-12 h-12 text-lime-500 p-2 bg-lime-100 rounded-full' />
                            <div className='flex flex-col'>
                                <span className='text-xl font-semibold text-slate-500'>Total</span>
                                <span className="font-medium text-slate-500">8</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <div className='bg-gradient-to-br from-yellow-50 to-orange-50 shadow-md flex items-center p-4 rounded-md space-x-4'>
                            <CheckCircleIcon className='w-12 h-12  text-red-500 p-2 bg-red-100 rounded-full' />
                            <div className='flex flex-col'>
                                <span className='text-xl font-semibold text-slate-500'>Active</span>
                                <span className="font-medium text-slate-500">4</span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default TaxInfo
