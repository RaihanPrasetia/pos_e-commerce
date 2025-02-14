import { useState, useEffect } from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { CategoryType } from "@/type/categoryTypes";

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category?: CategoryType;
    parentOptions: CategoryType[];
    onSave: (formData: {
        updatedName: string;
        description: string;
        isActive: boolean;
        parentId: string;
    }) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    isOpen,
    onClose,
    category,
    parentOptions,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        updatedName: category?.name || '',
        description: category?.description || '',
        isActive: category?.isActive || false,
        parentId: category?.parentId || 'None',
    });

    useEffect(() => {
        if (isOpen) {
            setFormData({
                updatedName: category?.name || '',
                description: category?.description || '',
                isActive: category?.isActive || false,
                parentId: category?.parentId || 'None',
            });
        }
    }, [isOpen, category]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const { name, value } = event.target;
        if (!name) return;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (event: SelectChangeEvent) => {
        const { value } = event.target;
        setFormData((prev) => ({ ...prev, isActive: value === 'Active' }));
    };

    const handleSave = () => {
        if (!formData.updatedName.trim()) {
            alert("Category name cannot be empty.");
            return;
        }
        onSave(formData);
        onClose();
    };

    return isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-40">
            <div className="bg-white w-96 h-full max-w-lg shadow-2xl p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-600">Edit Category</h2>
                    <button onClick={onClose}>
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>
                <hr className="flex bg-slate-700" />
                <div className="mt-5 space-y-4">
                    {/* Input Name */}
                    <TextField
                        fullWidth
                        label="Category Name"
                        name="updatedName"
                        value={formData.updatedName}
                        onChange={handleInputChange}
                    />

                    {/* Input Description */}
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />

                    {/* Select Status */}
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="isActive"
                            value={formData.isActive ? 'Active' : 'Inactive'}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Select Parent Category */}
                    <FormControl fullWidth>
                        <InputLabel>Parent Category</InputLabel>
                        <Select
                            name="parentId"
                            value={formData.parentId}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="None">None</MenuItem>
                            {parentOptions
                                .filter((option) => option.parentId === null)
                                .map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>

                {/* Button Actions */}
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