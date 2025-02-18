import { CheckCircleIcon, CurrencyDollarIcon, PercentBadgeIcon, PresentationChartLineIcon } from '@heroicons/react/16/solid'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

const PromotionInfo = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant='h6' fontWeight="bold" className='mb-4'>Promotion Info</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={6} sm={3}>
                        <div className='bg-orange-50 flex h-full items-center p-4 rounded-md space-x-4'>
                            <PresentationChartLineIcon className='w-10 h-10 text-orange-700' />
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
                    <Grid item xs={6} sm={3}>
                        <div className='bg-purple-50 flex items-center p-4 rounded-md space-x-4'>
                            <PercentBadgeIcon className='w-10 h-10 text-purple-700' />
                            <div className='flex flex-col'>
                                <span className='text-xl font-semibold text-slate-700'>Percentage</span>
                                <span className="font-medium text-slate-700">4</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <div className='bg-blue-50 flex items-center p-4 rounded-md space-x-4'>
                            <CurrencyDollarIcon className='w-10 h-10 text-blue-700' />
                            <div className='flex flex-col'>
                                <span className='text-xl font-semibold text-slate-700'>Fixed</span>
                                <span className="font-medium text-slate-700">7</span>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PromotionInfo
