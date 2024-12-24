"use client"
import React, { useState } from 'react';
import SelectInput from '@/components/form/SelectInput';
import { TextInput } from '@/components/form/Input';
import { XMarkIcon } from '@heroicons/react/20/solid';

export default function Varian() {
    // State untuk menangani array varian
    const [formData, setFormData] = useState({
        variants: [
            { variant: '', value: '' }
        ]
    });

    // Menangani perubahan nilai input
    const handleInputChange = (
        index: number,
        field: 'variant' | 'value',
        value: string
    ) => {
        const updatedVariants = [...formData.variants];
        updatedVariants[index][field] = value; // Tidak ada lagi error karena 'field' sekarang memiliki tipe yang aman
        setFormData({
            ...formData,
            variants: updatedVariants,
        });
    };


    // Menambah varian baru
    const handleAddVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { variant: '', value: '' }],
        });
    };

    // Menghapus varian berdasarkan index
    const handleRemoveVariant = (index: number) => {
        const updatedVariants = formData.variants.filter((_, idx) => idx !== index);
        setFormData({
            ...formData,
            variants: updatedVariants,
        });
    };

    return (
        <div className="bg-white shadow-mui-customShadow p-6 rounded-md space-y-4">
            <h1 className="text-lg font-semibold text-slate-500">Variant</h1>

            {formData.variants.map((variantData, index) => (
                <div className="flex items-center space-x-4" key={index}>
                    <SelectInput
                        label="Select variant"
                        name={`variant-${index}`}
                        value={variantData.variant}
                        onChange={(e) => handleInputChange(index, 'variant', e.target.value)}
                        options={["Size", "Color", "Weight"]}
                    />
                    <TextInput
                        type='text'
                        id={`value-${index}`}
                        name={`value-${index}`}
                        value={variantData.value}
                        onChange={(e) => handleInputChange(index, "value", e.target.value)}
                        label="Value"
                    />
                    <button
                        className="  text-slate-500 rounded-full hover:text-red-500"
                        onClick={() => handleRemoveVariant(index)}
                    >
                        <XMarkIcon className='w-10 h-10' />
                    </button>
                </div>
            ))}

            {/* Tombol untuk menambah varian */}
            <div className="flex justify-start space-x-4">
                <button
                    className="px-4 py-2 text-white rounded-md font-medium hover:brightness-110 transition-all duration-300 shadow-mui-customShadow bg-gradient-to-br from-pink-500 to-purple-700"
                    onClick={handleAddVariant}
                >
                    Add Variant
                </button>
            </div>
        </div>
    );
}
