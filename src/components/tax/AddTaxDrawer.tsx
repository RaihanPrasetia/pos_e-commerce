import { TaxType } from '@/type/taxTypes';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { Box, Drawer, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

interface AddTaxFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: TaxType) => void;
}

const AddTaxDrawer = ({ isOpen, onClose, onSubmit }: AddTaxFormProps) => {
    const [formData, setFormData] = useState<TaxType>({
        id: "",
        name: "",
        isActive: true,
        value: 0,
    });

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

    const handleStatusChange = (e: SelectChangeEvent<string>) => {
        const { value } = e.target;
        setFormData((prevState) => ({ ...prevState, isActive: value === "true" }));
    };

    const handleSave = () => {
        onSubmit(formData);
        setFormData({
            id: uuidv4(),
            name: "",
            isActive: true,
            value: 0,
        });
        onClose();
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <Box sx={{ width: 400, p: 3 }}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                        Add Tax
                    </Typography>
                    <IconButton onClick={onClose}>
                        <XMarkIcon className="h-5 w-5" />
                    </IconButton>
                </Stack>

                {/* Form */}
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        label="Value"
                        name="value"
                        value={formData.value}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="isActive"
                            value={formData.isActive ? "true" : "false"}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value="true">Active</MenuItem>
                            <MenuItem value="false">Inactive</MenuItem>
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
    )
}

export default AddTaxDrawer
