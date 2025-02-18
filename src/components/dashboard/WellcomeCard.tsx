import Image from 'next/image'
import React from 'react'

export default function WellcomeCard() {
    return (
        <div className="flex z-0 col-span-6 relative shadow-mui-customShadow rounded-tw bg-gradient-to-br from-pink-500 to-purple-700 text-white p-6 items-center space-x-4">
            <div className="space-y-4 lg:w-2/3 w-full">
                <h1 className="text-2xl font-medium font-mono">Wellcome Raihan Prasetia</h1>
                <span>Check all the statistics</span>
                <div className="flex rounded-tw w-2/3 bg-purple-200 text-slate-700 font-mono font-medium justify-center items-center">
                    <div className="p-2 border-r border-white text-center w-full">
                        <p className="text-xl font-bold">573</p>
                        <span>New Leads</span>
                    </div>
                    <div className="p-2 text-center w-full">
                        <p className="text-xl font-bold">30%</p>
                        <span>Conversion</span>
                    </div>
                </div>
            </div>
            <Image
                src="/assets/img/avatar/avatar-d.png"
                alt="Avatar 1"
                width={200}
                height={200}
                className="rounded-full object-fill right-6 lg:absolute lg:block hidden z-10"
            />
        </div>
    )
}