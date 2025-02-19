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
                        <div className='bg-orange-50 flex h-full items-center p-4 rounded-md space-x-4'>
                            <CurrencyDollarIcon className='w-10 h-10 text-orange-700' />
                            <div className='flex flex-col'>
                                <span className='text-xl font-semibold text-slate-700'>Total</span>
                                <span className="font-medium text-slate-700">8</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <div className='bg-green-50 flex items-center p-4 rounded-md space-x-4'>
                            <CheckCircleIcon className='w-10 h-10 text-green-700' />
                            <div className='flex flex-col'>
                                <span className='text-xl font-semibold text-slate-700'>Active</span>
                                <span className="font-medium text-slate-700">4</span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default TaxInfo
