import Image from 'next/image'
import React from 'react'

export default function DailyActivity() {
    return (
        <div id="daily-activity-container" className="col-span-3 p-6 space-y-4 bg-white h-max rounded-md shadow-mui-customShadow">
            <h1 className="text-xl font-semibold font-mono text-slate-500">Daily Activity</h1>
            <Image
                src="/assets/img/dashboard/activity1.jpg"
                alt='activity-img'
                className='w-full h-40 object-cover'
                width={200}
                height={120}
            />
            <div>
                <p className='text-lg font-semibold text-slate-600'>Tamplet E-Commerce</p>
                <span className='text-sm text-slate-500'>By Raihan Prasetia</span>
            </div>
            <div className='w-full text-justify'>
                <span className='text-sm text-justify line-clamp-3'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint recusandae vero inventore reiciendis incidunt qui accusantium corporis nobis facilis eius, quas necessitatibus tempora, hic ipsam labore perferendis voluptatem obcaecati. Rem?
                </span>
            </div>

            <div className='flex items-center justify-end'>
                <button className='px-3 py-1 bg-purple-500 text-white rounded-md font-medium text-sm'>show more</button>
            </div>
        </div>
    )
}
