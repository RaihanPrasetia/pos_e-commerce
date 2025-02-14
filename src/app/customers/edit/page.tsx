"use client";

import Content from '@/components/content/Content'
import { ContentHead } from '@/components/content/ContentHead'
import { ArrowLeftCircleIcon } from '@heroicons/react/16/solid'
import React from 'react'
import { BiMemoryCard } from 'react-icons/bi';

const EditCustomer = () => {

    const handleBack = () => {
        window.history.back();
    }

    const handleAddCustomer = () => {
        alert("Edit a customer")
    }
    return (
        <Content>
            <ContentHead title='Edit Customer' subTitle='Follow steps to edit a customer'>
                <button
                    onClick={handleBack}
                    className="flex items-center px-4 border-2 border-slate-500 py-2 text-sm font-semibold text-slate-500 rounded-md transition hover:bg-slate-200"
                >
                    <ArrowLeftCircleIcon className="h-5 w-5 mr-1" />
                    Back
                </button>
                <button
                    onClick={() => handleAddCustomer()}
                    className="flex items-center px-4 border-2 border-purple-700  py-2 text-sm font-semibold text-white rounded-md transition bg-utama hover:brightness-105"
                >
                    <BiMemoryCard className="h-5 w-5 mr-1" />
                    Save
                </button>
            </ContentHead>

        </Content>
    )
}

export default EditCustomer
