// File: pages/new-product.tsx

"use client";
import dynamic from 'next/dynamic';

const Stepper = dynamic(() => import('@/components/product/new/Stepper'), { ssr: false });
const ProductInfoCard = dynamic(() => import('@/components/product/new/ProductInfo'), { ssr: false });
const Thumbnail = dynamic(() => import('@/components/product/new/Thumbnail'), { ssr: false });
const ProductOrganize = dynamic(() => import('@/components/product/new/ProductOrganize'), { ssr: false });
const ProductImage = dynamic(() => import('@/components/product/new/ProductImage'), { ssr: false });
const Confirmation = dynamic(() => import('@/components/product/new/Confirmation'), { ssr: false });

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import NavigationButtons from "@/components/product/new/NavigationButton";

const steps = [
    { title: "Information" },
    { title: "Thumbnail" },
    { title: "Organize" },
    { title: "Image" },
    { title: "Confirmation" },
];

export default function NewProduct() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    const [formData, setFormData] = useState<{
        productName: string;
        barcode: string;
        price: string;
        description: string;
        category: string;
        subcategory: string;
        status: string;
        thumbnail: File | null;
        image: File | null;
        variants: { variant: string; value: string }[];
    }>({
        productName: "",
        barcode: "",
        price: "",
        description: "",
        category: "",
        subcategory: "",
        status: "",
        thumbnail: null,
        image: null,
        variants: [{ variant: '', value: '' }],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleThumbnailChange = (file: File | null) => {
        setFormData((prevData) => ({ ...prevData, thumbnail: file }));
    };

    const handleImageChange = (file: File | null) => {
        setFormData((prevData) => ({ ...prevData, image: file }));
    };

    const handleBack = () => router.back();
    const handleNext = () => {
        if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
    };
    const handlePrevious = () => {
        if (currentStep > 0) setCurrentStep((prev) => prev - 1);
    };

    return (
        <>
            <div className="flex items-end justify-between mb-4">
                <div>
                    <h1 className="text-2xl text-slate-600 font-medium mb-2">Add Product</h1>
                    <span className="text-lg text-slate-500">Follow steps to add a new product</span>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={handleBack}
                        className="flex items-center px-4 border-2 border-slate-500 py-2 text-sm font-semibold text-slate-500 rounded-md transition hover:bg-slate-200"
                    >
                        <ArrowLeftCircleIcon className="h-5 w-5 mr-1" />
                        Back
                    </button>
                </div>
            </div>

            {/* Stepper */}
            <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />

            {/* Card Form */}
            <div className="flex justify-center">
                <div className="p-6 w-2/3 bg-white shadow-mui-customShadow rounded-md">
                    {/* Product Info Card */}
                    <div
                        className={`transition-all duration-500 ease-in-out opacity-0 ${currentStep === 0 ? "opacity-100" : ""}`}
                    >
                        {currentStep === 0 && (
                            <ProductInfoCard formData={formData} onInputChange={handleInputChange} />
                        )}
                    </div>
                    {/* Thumbnail Card */}
                    <div
                        className={`transition-all duration-500 ease-in-out opacity-0 ${currentStep === 1 ? "opacity-100" : ""}`}
                    >
                        {currentStep === 1 && (
                            <Thumbnail formData={formData} onThumbnailChange={handleThumbnailChange} />
                        )}
                    </div>
                    {/* Product Organize Card */}
                    <div
                        className={`transition-all duration-500 ease-in-out opacity-0 ${currentStep === 2 ? "opacity-100" : ""}`}
                    >
                        {currentStep === 2 && (
                            <ProductOrganize
                                formData={formData}
                                onInputChange={handleInputChange}
                                setFormData={setFormData}
                            />
                        )}
                    </div>

                    {/* Product Image Card */}
                    <div
                        className={`transition-all duration-500 ease-in-out opacity-0 ${currentStep === 3 ? "opacity-100" : ""}`}
                    >
                        {currentStep === 3 && (
                            <ProductImage formData={formData} onThumbnailChange={handleImageChange} />
                        )}
                    </div>
                    {/* Confirmation Card */}
                    <div
                        className={`transition-all duration-500 ease-in-out opacity-0 ${currentStep === 4 ? "opacity-100" : ""}`}
                    >
                        {currentStep === 4 && <Confirmation formData={formData} />}
                    </div>
                    {/* Navigation buttons */}
                    <div className="mt-4">
                        <NavigationButtons
                            currentStep={currentStep}
                            totalSteps={steps.length}
                            handlePrevious={handlePrevious}
                            handleNext={handleNext}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
