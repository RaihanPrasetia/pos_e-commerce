"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ProductThumbnail() {
    const [file, setFile] = useState<File | null>(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": ["image/jpeg"],
            "image/png": ["image/png"],
        }, // Menggunakan tipe literal array
        onDrop: (acceptedFiles) => {
            // Mengambil file yang pertama kali diterima
            if (acceptedFiles.length > 0) {
                setFile(acceptedFiles[0]);
            }
        },
    });

    return (
        <div className="bg-white shadow-mui-customShadow p-6 rounded-md">
            <h1 className="text-lg font-semibold text-slate-500">Thumbnail</h1>

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
            <div className="text-center">
                <span className="text-sm text-slate-500">
                    Set the product thumbnail image. Only *.png, *.jpg, and *.jpeg image files are accepted.
                </span>
            </div>
            <span className="text-sm font-semibold text-slate-500">File</span>
            {/* Tampilkan nama file yang terpilih */}
            {file && (
                <div className="mt-4 text-sm text-gray-600">
                    <p>Selected file: {file.name}</p>
                </div>
            )}
        </div>
    );
}
