"use client";
import React from 'react';
import SelectInput from '@/components/form/SelectInput';  // Asumsi SelectInput sudah ada
import { TextInput } from '@/components/form/Input';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface ProductOrganizeProps {
    formData: {
        productName: string;
        barcode: string;
        price: string;
        description: string;
        category: string;
        subcategory: string;
        status: string;
        thumbnail: File | null;
        image: File | null;
        variants: { variant: string; value: string }[];
    };
    onInputChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<{
        productName: string;
        barcode: string;
        price: string;
        description: string;
        category: string;
        subcategory: string;
        status: string;
        thumbnail: File | null;
        image: File | null;
        variants: { variant: string; value: string }[];
    }>>;
}


export default function ProductOrganize({ formData, onInputChange, setFormData }: ProductOrganizeProps) {
    // Menangani perubahan nilai input variant dan value
    const handleInputChange = (
        index: number,
        field: 'variant' | 'value',
        value: string
    ) => {
        const updatedVariants = [...formData.variants];
        updatedVariants[index][field] = value;
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
        <div className='flex space-x-4'>
            <div className="w-full transition duration-300 space-y-4">
                <h1 className="text-lg font-semibold text-slate-500">Organize Product</h1>

                {/* Dropdown untuk memilih kategori */}
                <SelectInput
                    label="Select Category"
                    name="category"
                    value={formData.category}
                    onChange={onInputChange}
                    options={["Category 1", "Category 2", "Category 3"]}
                    required
                />

                {/* Dropdown untuk memilih subkategori */}
                <SelectInput
                    label="Select Sub-category"
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={onInputChange}
                    options={["Sub 1", "Sub 2", "Sub 3"]}
                    required
                />

                {/* Dropdown untuk memilih status */}
                <SelectInput
                    label="Select Status"
                    name="status"
                    value={formData.status}
                    onChange={onInputChange}
                    options={["Publish", "Inactive", "Scheduled"]}
                    required
                />
            </div>

            <div className="w-full space-y-3">
                <h1 className="text-lg font-semibold text-slate-500">Variant</h1>

                {formData.variants.map((variantData, index) => (
                    <div className="flex items-center space-x-4" key={index}>
                        <SelectInput
                            label="Select Variant"
                            name={`variant-${index}`}
                            value={variantData.variant}
                            onChange={(e) => handleInputChange(index, 'variant', e.target.value)}
                            options={["Size", "Color", "Weight"]}
                        />
                        <TextInput
                            type="text"
                            id={`value-${index}`}
                            name={`value-${index}`}
                            value={variantData.value}
                            onChange={(e) => handleInputChange(index, "value", e.target.value)}
                            label="Value"
                        />
                        <button
                            className="text-slate-500 rounded-full hover:text-red-500"
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
        </div>
    );
}
