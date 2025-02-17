"use client"

import Content from '@/components/content/Content'
import { ContentHead } from '@/components/content/ContentHead'
import StoreLayout from '@/views/store/StoreLayout'
import { BuildingStorefrontIcon, CreditCardIcon, CurrencyDollarIcon, PresentationChartLineIcon } from '@heroicons/react/16/solid'
import { Typography } from '@mui/material'
import React, { useState } from 'react'

export type ContentType = {
    content: string | "store-detail" | "promotion" | "tax" | "payment-methode"
}

const Store = () => {

    const [content, setContent] = useState<string>("store-detail")

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };

    return (
        <Content>
            <ContentHead title='Store' subTitle='Manage your store here'>
                <button
                    onClick={() => handleContentChange('store-detail')}
                    className={`p-3 border-none flex space-x-3 rounded-xl cursor-pointer ${content === 'store-detail' ? 'bg-utama' : 'bg-transparent'}`}
                >
                    <BuildingStorefrontIcon className={`w-5 ${content === 'store-detail' ? ' text-white' : 'text-gray-800'}`} />
                    <Typography variant='body1' className={`font-semibold ${content === 'store-detail' ? 'text-white' : 'text-gray-800'}`}>Store Detail</Typography>

                </button>
                <button
                    onClick={() => handleContentChange('promotion')}
                    className={`p-3 border-none flex space-x-3 rounded-xl ${content === 'promotion' ? 'bg-utama' : 'bg-transparent'}`}
                >
                    <PresentationChartLineIcon className={`w-5 ${content === 'promotion' ? ' text-white' : 'text-gray-800'}`} />
                    <Typography variant='body1' className={`font-semibold ${content === 'promotion' ? 'text-white' : 'text-gray-800'}`}>Promotion</Typography>

                </button>
                <button
                    onClick={() => handleContentChange('tax')}
                    className={`p-3 border-none flex space-x-3 rounded-xl ${content === 'tax' ? 'bg-utama' : 'bg-transparent'}`}
                >
                    <CurrencyDollarIcon className={`w-5 ${content === 'tax' ? ' text-white' : 'text-gray-800'}`} />
                    <Typography variant='body1' className={`font-semibold ${content === 'tax' ? 'text-white' : 'text-gray-800'}`}>Tax</Typography>
                </button>
                <button
                    onClick={() => handleContentChange('payment')}
                    className={`p-3 border-none flex space-x-3 rounded-xl ${content === 'payment' ? 'bg-utama' : 'bg-transparent'}`}
                >
                    <CreditCardIcon className={`w-5 ${content === 'payment' ? ' text-white' : 'text-gray-800'}`} />
                    <Typography variant='body1' className={`font-semibold ${content === 'payment' ? 'text-white' : 'text-gray-800'}`}>Payment</Typography>
                </button>
            </ContentHead>
            <div className='p-4'>
                <StoreLayout content={content} />
            </div>
        </Content>
    )
}

export default Store 
