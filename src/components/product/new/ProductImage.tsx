"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

// Menentukan tipe props untuk ProductImage
interface ImageProps {
    formData: {
        productName: string;
        barcode: string;
        price: string;
        description: string;
        category: string;
        subcategory: string;
        status: string;
        thumbnail: File | null;  // Tambahkan tipe untuk thumbnail
        image: File | null;  // Tambahkan tipe untuk image
    };
    onThumbnailChange: (file: File | null) => void;  // Ubah nama properti menjadi onImageChange
}

export default function ProductImage({ formData, onThumbnailChange }: ImageProps) {
    const [image, setImage] = useState<File | null>(formData.image); // Memulai dengan file image yang ada, jika ada

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": ["image/jpeg"],
            "image/png": ["image/png"],
        },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const newFile = acceptedFiles[0];
                setImage(newFile);  // Mengupdate state file
                onThumbnailChange(newFile); // Mengirim file ke parent via props
            }
        },
    });

    return (
        <div className=" w-full">
            <h1 className="text-lg font-semibold text-slate-500">Image</h1>

            {/* Form Input File menggunakan drag-and-drop */}
            <div
                {...getRootProps()}
                className="mt-4 border-dashed border-2 border-gray-300 px-8 py-16 rounded-md bg-blue-50 text-center cursor-pointer"
                style={{ overflow: "hidden", width: "auto" }}
            >
                <input {...getInputProps()} />
                <p className="text-sm text-gray-500">
                    Drag & Drop image here, or click to select
                </p>
            </div>
            <div className="text-center mt-2">
                <span className="text-sm text-slate-500">
                    Set the product image. Only *.png, *.jpg, and *.jpeg image files are accepted.
                </span>
            </div>
            <span className="text-sm font-semibold text-slate-500">File</span>
            {/* Tampilkan nama file yang terpilih */}
            {image && (
                <div className="mt-4 text-sm text-gray-600">
                    <p>Selected file: {image.name}</p>
                </div>
            )}
        </div>
    );
}
