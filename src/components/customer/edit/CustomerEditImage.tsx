import { CustomerType } from '@/type/cutomersType';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export type CustomerImageProps = {
    formData: CustomerType;
    setFormData: React.Dispatch<React.SetStateAction<CustomerType>>;
};

const CustomerEditImage = ({ formData, setFormData }: CustomerImageProps) => {
    const [file, setFile] = useState<File | null>(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": [".jpeg"],
            "image/png": [".png"],
        },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const selectedFile = acceptedFiles[0];
                setFile(selectedFile);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    imageUrl: selectedFile.name,
                }));
            }
        },
    });

    return (
        <div className="bg-white shadow-mui-customShadow p-6 rounded-md">
            <h1 className="text-lg font-semibold text-slate-500">Customer Image</h1>

            <div
                {...getRootProps()}
                className="mt-4 border-dashed border-2 border-gray-300 px-8 py-20 rounded-md bg-blue-50 text-center cursor-pointer"
                style={{ overflow: "hidden", width: "auto" }}
            >
                <input {...getInputProps()} />
                <p className="text-sm text-gray-500">
                    Drag & Drop image here, or click to select
                </p>
            </div>
            <div className="text-center">
                <span className="text-sm text-slate-500">
                    Set the customer image. Only *.png, *.jpg, and *.jpeg image files are accepted.
                </span>
            </div>
            <span className="text-sm font-semibold text-slate-500">File</span>
            {file ? (
                <div className="mt-4 text-sm text-gray-600">
                    <p>Selected file: {file.name}</p>
                </div>
            ) : (
                <div className="mt-4 text-sm text-gray-600">
                    <p>Selected file: {formData.imageUrl}</p>
                </div>
            )
            }
        </div>
    );
};

export default CustomerEditImage;