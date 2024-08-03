import React from 'react'
import CategoryCard from '../components/CategoryCard'

const CategoryPage = () => {
  return (
    <>
    <section className='bg-gray-50'>
        <div className='max-w-7xl mx-auto grid grid-cols-3 gap-10 py-10'>
            <CategoryCard/>
        </div>
    </section>
    </>
  )
}

export default CategoryPage