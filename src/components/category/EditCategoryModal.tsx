import { useState, useEffect } from "react";
import { TextInput } from "../form/Input";
import SelectInput from "../form/SelectInput"; // Pastikan path ini sesuai
import { XMarkIcon } from "@heroicons/react/20/solid";

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryName: string;
    onSave: (formData: {
        updatedName: string;
        description: string;
        status: string;
        parentCategory: string;
    }) => void;
}


const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    isOpen,
    onClose,
    categoryName,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        updatedName: categoryName,
        description: '',
        status: '',
        parentCategory: '',
    });

    useEffect(() => {
        if (isOpen) {
            setFormData((prev) => ({
                ...prev,
                updatedName: categoryName,
            }));
        }
    }, [isOpen, categoryName]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const { updatedName } = formData;
        if (!updatedName.trim()) {
            alert('Category name cannot be empty.');
            return;
        }
        onSave(formData);
        onClose();
    };

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-40">
            <div className="bg-white w-96 h-full max-w-lg shadow-2xl p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-600 ">Edit Category</h2>
                    <button
                        onClick={onClose}
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <hr className="flex bg-slate-700" />
                <div className="mt-5 space-y-4">
                    <TextInput
                        type="text"
                        id="updatedName"
                        label="Category Name"
                        name="updatedName"
                        value={formData.updatedName}
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
                        options={['None', 'Parent 1', 'Parent 2']}
                    />
                </div>

                <div className="mt-6 flex gap-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">
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
    ) : null;
};


export default EditCategoryModal;
