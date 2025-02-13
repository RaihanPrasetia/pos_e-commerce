import React from 'react'

interface ContentHeadProps {
    title: string
    subTitle: string
    children: React.ReactNode
    flex?: boolean
    items?: string
    justify?: string
    mb?: string
    mt?: string
    className?: string
}

export const ContentHead = ({ children, flex = true, items = "end", justify = "between", mb = "6", mt = "0", className = "", title, subTitle }: ContentHeadProps) => {
    return (
        <div className={`${flex ? "flex" : ""} items-${items} justify-${justify} mb-${mb} mt-${mt} ${className}`}>
            <div>
                <h1 className='text-2xl text-slate-600 font-medium mb-2'>{title}</h1>
                <span className='text-lg text-slate-500'>{subTitle}</span>
            </div>
            <div className='flex space-x-4'>
                {children}
            </div>
        </div>
    )
}
