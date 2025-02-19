"use client";

import Content from '@/components/content/Content';
import { ContentHead } from '@/components/content/ContentHead';
import CustomerCardInfo from '@/components/customer/detail/CustomerCardInfo';
import CustomerRight from '@/components/customer/detail/CustomerRight';
import { getCustomerById } from '@/libs/service/customerService';
import { CustomerType } from '@/type/cutomersType';
import { ArrowLeftCircleIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Grid } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CustomerDetailClient = () => {
    const [customer, setCustomer] = useState<CustomerType | undefined>(undefined);
    const searchParams = useSearchParams();
    const customerId = searchParams.get("customerId");

    useEffect(() => {
        const fetchCustomer = async () => {
            if (!customerId) return;
            try {
                const customer = await getCustomerById(customerId);
                setCustomer(customer);
            } catch (error) {
                console.error("Error fetching Customer:", error);
            }
        };
        fetchCustomer();
    }, [customerId]);

    const handleBack = () => {
        window.history.back();
    };

    const handleDeleteCustomer = (customerId: string) => {
        console.log('Delete Customer id:', customerId);
    };

    return (
        <Content>
            <ContentHead title={`Customer Id #${customer?.id}`} subTitle={`Date : ${customer?.createdAt} - (${customer?.state})`}>
                <div className='flex items-center space-x-2'>
                    <button
                        onClick={handleBack}
                        className="flex items-center px-4 border-2 border-slate-500 py-2 text-sm font-semibold text-slate-500 rounded-md transition hover:bg-slate-200"
                    >
                        <ArrowLeftCircleIcon className="h-5 w-5 mr-1" />
                        Back
                    </button>
                    <button
                        onClick={() => handleDeleteCustomer(String(customer?.id))}
                        className="flex items-center px-4 border-2 border-red-500 py-2 text-sm font-semibold text-white rounded-md transition bg-red-600 hover:bg-red-700"
                    >
                        <TrashIcon className="h-5 w-5 mr-1" />
                        Discard
                    </button>
                </div>
            </ContentHead>
            <Grid container spacing={4}>
                <CustomerCardInfo customer={customer || undefined} />
                <CustomerRight />
            </Grid>
        </Content>
    );
};

export default CustomerDetailClient;
