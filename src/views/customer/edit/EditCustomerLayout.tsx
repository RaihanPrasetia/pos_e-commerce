import Content from '@/components/content/Content';
import { ContentHead } from '@/components/content/ContentHead';
import CustomerEditCountry from '@/components/customer/edit/CustomerEditCountry';
import CustomerEditImage from '@/components/customer/edit/CustomerEditImage';
import CustomerEditInfo from '@/components/customer/edit/CustomerEditInfo';
import { getCustomerById } from '@/libs/service/customerService';
import { CustomerType } from '@/type/cutomersType';
import { ArrowLeftCircleIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Grid } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiMemoryCard } from 'react-icons/bi';

const EditCustomerLayout = () => {
    const searchParams = useSearchParams();
    const customerId = searchParams.get("customerId");
    const [customer, setCustomer] = useState<CustomerType | undefined>(undefined);
    const [formData, setFormData] = useState<CustomerType>({
        id: "",
        address: "",
        city: "",
        country: "",
        email: "",
        imageUrl: "",
        name: "",
        phone: "",
        state: "",
        zip: "",
        createdAt: "",
        updatedAt: ""
    });

    useEffect(() => {
        const fetchCustomer = async () => {
            if (!customerId) return;
            try {
                const customer = await getCustomerById(customerId);
                setCustomer(customer);
                if (customer) {
                    setFormData(customer);
                }
            } catch (error) {
                console.error("Error fetching Customer:", error);
            }
        };
        fetchCustomer();
    }, [customerId]);

    const handleBack = () => {
        window.history.back();
    };

    const handleAddCustomer = (formData: CustomerType) => {
        console.log(formData)
        alert("Edit a customer");
    };

    const handleDeleteCustomer = (customerId: string) => {
        alert(`Delete Customer id: ${customerId}`);
    };

    return (
        <Content>
            <ContentHead title='Edit Customer' subTitle={`Follow steps to edit a customer #${customer?.id}`}>
                <button
                    onClick={handleBack}
                    className="flex items-center px-4 border-2 border-slate-500 py-2 text-sm font-semibold text-slate-500 rounded-md transition hover:bg-slate-200"
                >
                    <ArrowLeftCircleIcon className="h-5 w-5 mr-1" />
                    Back
                </button>
                <button
                    onClick={() => handleDeleteCustomer(String(formData?.id))}
                    className="flex items-center px-4 py-2 text-sm font-semibold text-white rounded-md transition bg-gradient-to-br from-orange-400 to-red-700 hover:brightness-105"
                >
                    <TrashIcon className="h-5 w-5 mr-1" />
                    Discard
                </button>
                <button
                    onClick={() => handleAddCustomer(formData)}
                    className="flex items-center px-4 py-2 text-sm font-semibold text-white rounded-md transition bg-utama hover:brightness-105"
                >
                    <BiMemoryCard className="h-5 w-5 mr-1" />
                    Save
                </button>
            </ContentHead>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <CustomerEditInfo formData={formData} setFormData={setFormData} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomerEditImage formData={formData} setFormData={setFormData} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomerEditCountry formData={formData} setFormData={setFormData} />
                </Grid>
            </Grid>
        </Content>
    );
};

export default EditCustomerLayout;
