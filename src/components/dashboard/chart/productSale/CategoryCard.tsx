import React from 'react';

interface CategoryCardProps {
    color: string;
    title: string;
    salesIncrease: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ color, title, salesIncrease }) => {
    return (
        <div className={`bg-${color}-50 p-2 rounded-sm shadow-md`}>
            <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600">{title}</span>
                <p className="text-sm font-semibold text-slate-700">
                    <span className={`px-2 py-1 ml-2 bg-${color}-100 text-${color}-600 text-xs rounded-lg font-medium`}>
                        +{salesIncrease}%
                    </span>
                </p>
            </div>
        </div>
    );
};

export default CategoryCard;
