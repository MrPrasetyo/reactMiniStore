import React from 'react'
import CategoryCard from '../components/CategoryCard'

const CategoryPage = () => {
  return (
    <>
    <section className='bg-gray-50'>
        <div className='max-w-7xl mx-auto grid xl:grid-cols-3 md:grid-cols-2 gap-10 py-10 xl:px-0 px-5'>
            <CategoryCard/>
        </div>
    </section>
    </>
  )
}

export default CategoryPage