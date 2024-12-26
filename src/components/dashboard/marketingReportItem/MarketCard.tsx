import React from 'react'

interface MarketCardProps {
    icon: React.ReactNode; // Ikon yang akan ditampilkan (React element)
    value: number; // Nilai yang akan ditampilkan
    percentageChange: string; // Perubahan persentase, bisa positif atau negatif
    percentageColor: string; // Warna untuk perubahan persentase (misalnya 'text-red-600', 'text-green-600')
    bgColor: string; // Warna background keseluruhan (misalnya 'bg-purple-100/50')
    iconBgColor: string; // Warna background ikon (misalnya 'bg-purple-200')
    title: string; // Judul card (misalnya 'Google Ads')
}

export default function MarketCard({
    icon,
    value,
    percentageChange,
    percentageColor,
    bgColor,
    iconBgColor,
    title,
}: MarketCardProps) {
    return (
        <div className={`flex items-center space-x-2 py-2 px-4 ${bgColor} w-full rounded-md`}>
            {/* Market Icon */}
            <div className={`flex justify-center items-center ${iconBgColor} text-slate-700 p-2 rounded-full`}>
                {icon}
            </div>

            {/* Market Info */}
            <div>
                <p className="flex items-center font-medium text-lg">
                    {value}
                    <span className={`px-2 py-0 ml-2 rounded-sm text-[10px] font-bold shadow-sm ${percentageColor}`}>
                        {percentageChange}
                    </span>
                </p>
                <span className="text-sm font-semibold text-slate-500">{title}</span>
            </div>
        </div>
    );
}
