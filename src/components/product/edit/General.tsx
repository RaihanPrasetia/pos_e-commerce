"use client";
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { TextInput } from "@/components/form/Input";

export default function General() {
    const [formData, setFormData] = useState({
        productName: "",
        weight: "",
        description: "",
        barcode: "",
        price: "",
    });

    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null); // Menyimpan instansi Quill

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["bold", "italic", "underline"],
                        ["link"],
                        ["image"],
                    ],
                },
                placeholder: "Enter product description",
            });

            // Menangani perubahan teks di editor
            quillRef.current.on("text-change", function () {
                const newDescription = quillRef.current?.root.innerHTML;
                setFormData((prev) => ({
                    ...prev,
                    description: newDescription || "", // Pastikan nilainya terupdate
                }));
            });
        }
    }, []); // Efek hanya dipanggil satu kali saat pertama kali komponen dimuat

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="bg-white shadow-mui-customShadow p-6 rounded-md">
            <h1 className="text-lg font-semibold text-slate-500">Product Information</h1>
            <div className="mt-4 grid grid-cols-2 gap-4 items-start justify-start">
                <div className="col-span-2">
                    <TextInput
                        id="productName"
                        name="productName"
                        type="text"
                        value={formData.productName}
                        onChange={handleInputChange}
                        label="Product Name"
                        required
                    />
                </div>
                <div className="col-span-1">
                    <TextInput
                        id="barcode"
                        name="barcode"
                        type="text"
                        value={formData.barcode}
                        onChange={handleInputChange}
                        label="Barcode"
                        required
                    />
                </div>
                <div className="col-span-1">
                    <TextInput
                        id="price"
                        name="price"
                        type="text"
                        value={formData.price}
                        onChange={handleInputChange}
                        label="Price"
                        required
                    />
                </div>
                <div className="col-span-2">
                    <label
                        htmlFor="description"
                        className="block text-sm font-semibold text-gray-500 mb-1"
                    >
                        Description
                    </label>
                    <div ref={editorRef} className="border" />
                </div>
            </div>
        </div>
    );
}
