import React, { useState } from "react";
import {
    Drawer,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
    Stack,
    Typography,
    IconButton,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { CategoryType } from "@/type/categoryTypes";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { v4 as uuidv4 } from 'uuid';

interface AddCategoryFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: {
        categoryName: string;
        description: string;
        status: string;
        parentId: string;
    }) => void;
    parentOptions: CategoryType[]; // List parent categories
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    parentOptions,
}) => {
    const [formData, setFormData] = useState({
        id: "",
        categoryName: "",
        description: "",
        status: "Active",
        parentId: "None",
    });

    // Handler untuk TextField
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    // Handler untuk Select
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        if (name) {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleSave = () => {
        onSubmit(formData);
        setFormData({
            id: uuidv4(),
            categoryName: "",
            description: "",
            status: "Active",
            parentId: "None",
        });
        onClose();
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <Box sx={{ width: 400, p: 3 }}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                        Add Category
                    </Typography>
                    <IconButton onClick={onClose}>
                        <XMarkIcon className="h-5 w-5" />
                    </IconButton>
                </Stack>

                {/* Form */}
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Category Name"
                        name="categoryName"
                        value={formData.categoryName}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                    />

                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select name="status" value={formData.status} onChange={handleSelectChange}>
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Parent Category</InputLabel>
                        <Select name="parentId" value={formData.parentId} onChange={handleSelectChange}>
                            <MenuItem value="None">None</MenuItem>
                            {parentOptions
                                .filter((option) => option.parentId === "None") // Hanya menampilkan kategori induk
                                .map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Stack>

                {/* Action Buttons */}
                <Stack direction="row" justifyContent="flex-start" gap={2} mt={4}>
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
                </Stack>
            </Box>
        </Drawer>
    );
};

export default AddCategoryForm;
