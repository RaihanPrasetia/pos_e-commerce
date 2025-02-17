import Content from '@/components/content/Content'
import ContentBody from '@/components/content/ContentBody'
import { ContentHead } from '@/components/content/ContentHead'
import StoreLayout from '@/views/store/StoreLayout'
import React from 'react'

const Store = () => {
    return (
        <Content>
            <ContentHead title='Store' subTitle='Manage your store here' />
            <div className='p-4'>
                <StoreLayout />
            </div>
        </Content>
    )
}

export default Store 
