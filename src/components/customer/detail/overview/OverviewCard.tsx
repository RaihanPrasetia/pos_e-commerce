import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

interface OverviewCardProps {
    title: string
    icons: React.ReactNode
    title2: React.ReactNode
    subTitle: string
}

export const OverviewCard = ({ title, icons, title2, subTitle, }: OverviewCardProps) => {
    return (
        <Card className='shadow-mui-customShadow rounded-lg'>
            <CardContent className='space-y-4'>
                {icons}
                <Typography variant='h6' className='font-bold'>{title}</Typography>
                <div>
                    {title2}
                    <Typography className='font-medium text-lg'>{subTitle}</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default OverviewCard
