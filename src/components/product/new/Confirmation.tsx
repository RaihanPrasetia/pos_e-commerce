import React from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter untuk navigasi

interface ConfirmationProps {
    formData: {
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
    };
}

export default function Confirmation({ formData }: ConfirmationProps) {
    const router = useRouter(); // Hook to navigate to /products
    const { productName, barcode, price, description, category, subcategory, status, variants } = formData;

    // Fungsi untuk menangani navigasi setelah klik "Save"
    const handleSave = () => {
        router.push('/products'); // Navigasi ke halaman /products
    };

    return (
        <div className="w-full space-y-6">
            <h2 className="text-2xl font-semibold text-slate-600 mb-4">Confirmation</h2>
            <div className='grid grid-cols-2 gap-4'>
                <div className="bg-slate-50 p-4 rounded-md ">
                    <h3 className="text-lg font-medium text-slate-600 mb-2">Product Details</h3>
                    <p className="text-sm text-slate-500"><span>Product Name: </span>{productName}</p>
                    <p className="text-sm text-slate-500"><span>Barcode: </span>{barcode}</p>
                    <p className="text-sm text-slate-500"><span>Price: </span>{price}</p>
                    <p className="text-sm text-slate-500"><span>Description: </span>{description}</p>
                </div>

                {/* Category Information */}
                <div className="bg-slate-50 p-4 rounded-md ">
                    <h3 className="text-lg font-medium text-slate-600 mb-2">Category Information</h3>
                    <p className="text-sm text-slate-500"><span>Category: </span>{category}</p>
                    <p className="text-sm text-slate-500"><span>Subcategory: </span>{subcategory}</p>
                    <p className="text-sm text-slate-500"><span>Status: </span>{status}</p>
                </div>

                {/* Variants */}
                <div className="bg-slate-50 p-4 rounded-md ">
                    <h3 className="text-lg font-medium text-slate-600 mb-2">Variants</h3>
                    {variants.length > 0 ? (
                        variants.map((variant, index) => (
                            <p className="text-sm text-slate-500" key={index}>
                                <span>{variant.variant}: </span>{variant.value}
                            </p>
                        ))
                    ) : (
                        <p className="text-sm text-slate-500">No variants added</p>
                    )}
                </div>

                {/* Image Section */}
                <div className="bg-slate-50 p-4 rounded-md ">
                    <h3 className="text-lg font-medium text-slate-600 mb-2">Image</h3>
                    {formData.image ? (
                        <p className="text-sm text-slate-500">Image uploaded successfully</p>
                    ) : (
                        <p className="text-sm text-slate-500">No image uploaded</p>
                    )}
                    {formData.thumbnail ? (
                        <p className="text-sm text-slate-500">Thumbnail uploaded successfully</p>
                    ) : (
                        <p className="text-sm text-slate-500">No thumbnail uploaded</p>
                    )}
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-6 py-2 border-2 border-slate-300 shadow-mui-customShadow text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-700 rounded-md transition"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
