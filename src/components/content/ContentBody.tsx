import React from 'react'

interface ContentBodyProps {
    children?: React.ReactNode
    className?: string
}

export const ContentBody = ({ children, className = "" }: ContentBodyProps) => {
    return (
        <div className={`card shadow-mui-customShadow border-2-gray-500 rounded-md overflow-hidden pb-6 bg-white ${className}`}>
            {children}
        </div>
    )
}

export default ContentBody
