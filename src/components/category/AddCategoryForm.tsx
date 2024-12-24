import React, { useState } from 'react';
import { TextInput } from '../form/Input';
import SelectInput from '../form/SelectInput';

interface AddCategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: {
        categoryName: string;
        description: string;
        status: string;
        parentCategory: string;
    }) => void;
    parentOptions: string[]; // List parent categories
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    parentOptions,
}) => {
    const [formData, setFormData] = useState({
        categoryName: '',
        description: '',
        status: 'Active',
        parentCategory: 'None',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSave = () => {
        onSubmit(formData);
        setFormData({
            categoryName: '',
            description: '',
            status: 'Active',
            parentCategory: 'None',
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50">
            <div className="bg-white w-80 max-w-lg h-full shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-600">Add Category</h2>
                <div className="mt-5 space-y-4">
                    <TextInput
                        type="text"
                        id="categoryName"
                        label="Category Name"
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        type="text"
                        id="description"
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <SelectInput
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        options={['Active', 'Inactive']}
                    />
                    <SelectInput
                        label="Parent Category"
                        name="parentCategory"
                        value={formData.parentCategory}
                        onChange={handleInputChange}
                        options={['None', ...parentOptions]}
                    />
                </div>

                <div className="mt-6 flex justify-start gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-gradient-to-br from-pink-500 to-purple-700 text-white font-semibold rounded-md hover:from-pink-600 hover:to-purple-800"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCategoryForm;
