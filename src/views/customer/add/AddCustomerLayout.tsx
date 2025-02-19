import Content from '@/components/content/Content';
import { ContentHead } from '@/components/content/ContentHead';
import CustomerCountry from '@/components/customer/add/CustomerCountry';
import CustomerImage from '@/components/customer/add/CustomerImage';
import CustomerInfo from '@/components/customer/add/CustomerInfo';
import { CustomerType } from '@/type/cutomersType';
import { ArrowLeftCircleIcon } from '@heroicons/react/16/solid';
import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { BiMemoryCard } from 'react-icons/bi';

const AddCustomerLayout = () => {
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
    });

    const handleBack = () => {
        window.history.back();
    };

    const handleAddCustomer = (formData: CustomerType) => {
        console.log("Data yang dikirim :", formData);
        alert(`Add new customer ${formData.name || "Undefined"}`);
    };

    return (
        <Content>
            <ContentHead title='New Customer' subTitle='Follow steps to add a new customer'>
                <button
                    onClick={handleBack}
                    className="flex items-center px-4 border-2 border-slate-500 py-2 text-sm font-semibold text-slate-500 rounded-md transition hover:bg-slate-200"
                >
                    <ArrowLeftCircleIcon className="h-5 w-5 mr-1" />
                    Back
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
                    <CustomerInfo formData={formData} setFormData={setFormData} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomerImage formData={formData} setFormData={setFormData} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomerCountry formData={formData} setFormData={setFormData} />
                </Grid>
            </Grid>
        </Content>
    );
};

export default AddCustomerLayout;