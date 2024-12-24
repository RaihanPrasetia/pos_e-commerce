// components/ProductInfoCard.tsx

import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { TextInput } from "@/components/form/Input";
interface ProductInfoCardProps {
    formData: {
        productName: string;
        barcode: string;
        price: string;
        description: string;
    };
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductInfoCard: React.FC<ProductInfoCardProps> = ({ formData, onInputChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current) {
            const quill = new Quill(editorRef.current, {
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

            quill.on("text-change", function () {
                // Update formData.description
                const newDescription = quill.root.innerHTML;
                onInputChange({
                    target: { name: "description", value: newDescription },
                } as React.ChangeEvent<HTMLInputElement>);
            });
        }
    }, [onInputChange]);

    return (
        <div className="w-full transition duration-300">
            <h1 className="text-lg font-semibold text-slate-500">Product Information</h1>
            <div className="mt-4 grid grid-cols-2 gap-4 items-start justify-start">
                <div className="col-span-2">
                    <TextInput
                        id="productName"
                        name="productName"
                        type="text"
                        value={formData.productName}
                        onChange={onInputChange}
                        label="Product Name"
                        required
                    />
                </div>
                <div className="col-span-1">
                    <TextInput
                        id="barcode"
                        name="barcode"
                        type="text"
                        label="Barcode"
                        value={formData.barcode}
                        onChange={onInputChange}
                        required
                    />
                </div>
                <div className="col-span-1">
                    <TextInput
                        id="price"
                        name="price"
                        type="text"
                        label="Price"
                        value={formData.price}
                        onChange={onInputChange}
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
                    <div ref={editorRef} className="border p-2 text-sm" />
                </div>
            </div>
        </div>
    );
};

export default ProductInfoCard;
