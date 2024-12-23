"use client"
import SelectInput from '@/components/form/SelectInput';
import React, { useState } from 'react'

export default function Organize() {
    const [formData, setFormData] = useState({
        category: '',
        subcategory: '',
        status: '',
    });

    // Fungsi untuk menangani perubahan input
    const handleInputChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="bg-white shadow-mui-customShadow p-6 rounded-md space-y-4">
            <h1 className="text-lg font-semibold  text-slate-500">Organize</h1>
            <SelectInput
                label="Select category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={["Category 1", "Category 2", "Category 3"]}
                required
            />
            <SelectInput
                label="Select sub-category"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                options={["Sub 1", "Sub 2", "Sub 3"]}
                required
            />
            <SelectInput
                label="Select status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                options={["Publish", "Inactive", "Scheduled"]}
                required
            />
        </div>
    )
}
