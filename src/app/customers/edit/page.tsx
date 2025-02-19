"use client";

import Content from '@/components/content/Content'
import { ContentHead } from '@/components/content/ContentHead'
import EditCustomerLayout from '@/views/customer/edit/EditCustomerLayout';
import React, { Suspense } from 'react'

const EditCustomer = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditCustomerLayout />
        </Suspense>
    );
}

export default EditCustomer
