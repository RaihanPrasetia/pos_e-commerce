"use client";

import { DocumentCheckIcon } from '@heroicons/react/20/solid';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'; // Mengimpor useRouter

// Import komponen secara dinamis (disable SSR)
const General = dynamic(() => import('@/components/product/edit/General'), { ssr: false });
const ProductImage = dynamic(() => import('@/components/product/edit/ProductImage'), { ssr: false });
const Varian = dynamic(() => import('@/components/product/edit/Varian'), { ssr: false });
const ProductThumbnail = dynamic(() => import('@/components/product/edit/ProductThumbnail'), { ssr: false });
const Organize = dynamic(() => import('@/components/product/edit/Organize'), { ssr: false });

export default function EditProduct() {
    const router = useRouter();  // Inisialisasi router dari useRouter()

    // Fungsi untuk menangani aksi simpan
    const handleSave = () => {
        console.log("Data produk disimpan!");
        // Tambahkan logika penyimpanan sesuai kebutuhan aplikasi Anda
    };

    // Fungsi untuk menangani aksi discard, navigasi kembali
    const handleDiscard = () => {
        router.back();  // Kembali ke halaman sebelumnya
    };

    return (
        <>
            <div className='flex items-end justify-between mb-6'>
                <div>
                    <h1 className='text-2xl text-slate-600 font-medium mb-2'>Edit product</h1>
                    <span className='text-lg text-slate-500'>Orders placed across your store</span>
                </div>
                <div className='flex space-x-4'>
                    <button
                        onClick={handleDiscard}
                        className="flex items-center px-4 border-2 border-slate-500 py-2 text-sm font-semibold text-slate-500 rounded-md transition"
                    >
                        Discard
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex items-center px-4 border-2 border-slate-300 shadow-mui-customShadow py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-700 rounded-md transition"
                    >
                        <DocumentCheckIcon className="h-5 w-5 mr-1" />
                        Save
                    </button>
                </div>
            </div>
            <div className="flex items-start justify-between gap-8">
                <div className="w-3/5 space-y-8">
                    <General />
                    <ProductImage />
                    <Varian />
                </div>
                <div className="w-2/5 space-y-8">
                    <ProductThumbnail />
                    <Organize />
                </div>
            </div>
        </>
    );
}
