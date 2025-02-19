import { Button, Card, CardContent, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const PremiumCard = () => {
    return (
        <div className="shadow-mui-customShadow rounded-md p-6 mt-4 overflow-hidden w-full bg-utama">
            <div className='flex justify-between'>
                <div className='w-full flex flex-col justify-between'>
                    <Typography variant='h5' className='text-white' fontWeight="bold" noWrap>Upgrade to premium</Typography>
                    <span className='text-white text-lg font-medium'>Upgrade customer to premium membership to access pro features.</span>
                </div>
                <div className='w-full flex justify-center items-center'>
                    <Image src="/assets/img/logos/rocket.png" alt="Logo-Roket" className='object-cover' width={120} height={120} />
                </div>
            </div>

            <button
                className='bg-white mt-4 rounded-md w-full text-center py-3 cursor-pointer'
            >
                <span className='text-utama font-bold text-lg'>Upgrade To Premium</span>
            </button>
        </div>
    )
}

export default PremiumCard
