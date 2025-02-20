import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'

const ProductHead = () => {
    const currentDate = new Date().toLocaleDateString()

    return (
        <div className='flex w-full justify-between items-center p-4 bg-utama text-white rounded-sm'>
            <div className='flex items-center space-x-4'>
                <HiLocationMarker className='w-10 h-10 p-1 rounded-full text-purple-500 bg-white' />
                <div className='flex flex-col'>
                    <span className='text-xl font-bold'>Location</span>
                    <span className='text-lg font-medium'>Indonesia, Jakarta</span>
                </div>
            </div>
            <div className='flex flex-col items-start'>
                <span className='text-xl font-bold'>Date Now</span>
                <span className='text-md font-semibold'>{currentDate}</span>
            </div>
        </div>
    )
}

export default ProductHead