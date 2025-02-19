import { AddressType } from '@/type/addressTypes';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { Box, Drawer, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

interface AddPromotionFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: AddressType) => void;
}

const AddAddressDrawer = ({ isOpen, onClose, onSubmit }: AddPromotionFormProps) => {
    const searchParams = useSearchParams();
    const customerId = searchParams.get("customerId");
    const [formData, setFormData] = useState<AddressType>({
        id: "",
        country: "",
        locationType: "home",
        isActive: true,
        customerId: String(customerId),
        createdDt: "",
        description: "",
        location: "",
        phoneNumber: "",
        modifedDt: null,
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
        onSubmit({
            ...formData,
            id: uuidv4(),
            createdDt: new Date(Date.now()).toLocaleString()
        });
        setFormData({
            id: "",
            country: "",
            locationType: "home",
            isActive: true,
            customerId: String(customerId),
            createdDt: Date.now().toLocaleString(),
            description: "",
            location: "",
            phoneNumber: "",
            modifedDt: null,
        });
        onClose();
    };

    return (
        <Drawer anchor="right" open={isOpen} onClose={onClose}>
            <Box sx={{ width: 400, p: 3 }}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                        Add Address
                    </Typography>
                    <IconButton onClick={onClose}>
                        <XMarkIcon className="h-5 w-5" />
                    </IconButton>
                </Stack>

                {/* Form */}
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            name="locationType"
                            value={formData.locationType || "home"}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="home">Home</MenuItem>
                            <MenuItem value="office">Office</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
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

export default AddAddressDrawer
