import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { CategoryType } from '@/type/categoryTypes'
import { getCategory } from '@/libs/service/categoryService'
import { Grid } from '@mui/material'

interface ProductFilterProps {
    setCategory: (category: string) => void
    setSearchTerm: (term: string) => void
}

const ProductFilter: React.FC<ProductFilterProps> = ({ setCategory, setSearchTerm }) => {
    const [categoryData, setCategoryData] = useState<CategoryType[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const result = await getCategory()
                setCategoryData(result.categories)
            } catch (error) {
                console.error("Error fetch category data :", error)
            }
        }
        fetchCategory()
    }, [])

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        const categoryId = event.target.value as string
        setSelectedCategory(categoryId)
        setSelectedSubcategory('') // Reset subcategory when category changes
        setCategory(categoryId)
    }

    const handleSubcategoryChange = (event: SelectChangeEvent<string>) => {
        const subcategoryId = event.target.value as string
        setSelectedSubcategory(subcategoryId)
        setCategory(subcategoryId)
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div className='space-x-2 flex items-center'>
            <TextField
                label="Search Product"
                variant="outlined"
                fullWidth
                onChange={handleSearchChange}
            />

            <FormControl variant="outlined" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    label="Category"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {categoryData.filter(c => c.parentId == null).map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div className='w-full'>
                {selectedCategory && categoryData.some(c => c.parentId === selectedCategory) ? (
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel>Subcategory</InputLabel>
                        <Select
                            value={selectedSubcategory}
                            onChange={handleSubcategoryChange}
                            label="Subcategory"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categoryData.filter(c => c.parentId === selectedCategory).map((subcategory) => (
                                <MenuItem key={subcategory.id} value={subcategory.id}>
                                    {subcategory.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : (
                    <div className='h-[100%] flex items-center justify-center'>
                        <span className='text-lg text-utama font-semibold'>Filter Product</span>
                    </div>
                )
                }
            </div>
        </ div>
    )
}

export default ProductFilter