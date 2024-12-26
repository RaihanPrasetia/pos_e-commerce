import React from 'react';
import { BsFacebook, BsGoogle, BsTwitter } from 'react-icons/bs';
import MarketCard from './marketingReportItem/MarketCard';
import PieChartComponent from './chart/marketReport/PieChartHover';
import { PlayCircleIcon } from '@heroicons/react/20/solid';

export default function MarketingReport() {
    // Pie chart data
    const data = [
        { name: 'Google Ads', value: 123 },
        { name: 'Facebook Ads', value: 200 },
        { name: 'Twitter Ads', value: 85 },
    ];

    // Mapping pie chart data to MarketCard components dynamically
    const marketData = data.map((item) => {
        const iconMap: { [key in 'Google Ads' | 'Facebook Ads' | 'Twitter Ads']: React.ReactNode } = {
            'Google Ads': <BsGoogle className="w-6 h-6" />,
            'Facebook Ads': <BsFacebook className="w-6 h-6" />,
            'Twitter Ads': <BsTwitter className="w-6 h-6" />,
        };

        return (
            <MarketCard
                key={item.name}
                icon={iconMap[item.name as 'Google Ads' | 'Facebook Ads' | 'Twitter Ads']}  // Safely access iconMap with a cast
                value={item.value}
                percentageChange={`+${(item.value % 20) * 2}%`}  // Simulated percentage change for demonstration
                percentageColor={item.value > 100 ? 'text-green-600' : 'text-red-600'}
                bgColor={`${item.name === 'Google Ads' ? 'bg-purple-100/50' : item.name === 'Facebook Ads' ? 'bg-blue-100/50' : 'bg-sky-100/50'}`}
                iconBgColor={`${item.name === 'Google Ads' ? 'bg-purple-200' : item.name === 'Facebook Ads' ? 'bg-blue-200' : 'bg-sky-200'}`}
                title={item.name}
            />
        );
    });

    return (
        <div id="marketing-report-container" className="col-span-6 p-6 space-y-4 bg-white h-max rounded-md shadow-mui-customShadow">
            <h1 className="text-xl font-semibold font-mono text-slate-500">Marketing Report</h1>
            <div className="flex items-start justify-between space-x-4">
                {/* Market Cards on the left */}
                <div className="space-y-4 w-full">
                    {marketData}  {/* Render the dynamic MarketCard components */}
                </div>
                {/* Pie Chart on the right */}
                <div className="w-full lg:w-full rounded-md bg-slate-50">
                    <PieChartComponent data={data} height={210} />
                </div>
            </div>
            <div className="flex items-center justify-between mt-6 bg-slate-100 py-2 px-4 rounded-md">
                <span className='font-medium text-slate-400'>Learn insigs how to manage</span>
                <button className="p-2 bg-purple-500 text-white font-semibold rounded-full shadow-md hover:bg-purple-600 transition">
                    <PlayCircleIcon className='h-7 w-7' />
                </button>
            </div>
        </div>
    );
}
