import React from 'react'

const ProductCard = ({title, price, location, day, thumbnail}) => {
  return (
    <div className='p-2 cursor-pointer  border md:w-[29vw] lg:w-[21vw] xl:w-[18vw] bg-white overflow-clip border-gray-300 rounded-lg'>
        <div className='image h-[10rem] bg-gray-300 w-full'>
            <img src={thumbnail} alt="thumb" className='h-full w-full mix-blend-multiply object-cover'/>
        </div>
        <div>
            <h1 className='text-black roboto font-medium text-[1.2vw]'>₹ {price}</h1>
            <p className='text-gray-500 roboto text-[1.06vw]  capitalize'>{title}</p>
            <div className='text-gray-500 roboto uppercase flex items-center font-medium mt-4 justify-between'>
                <span className='text-[.7vw]'>{location}</span>
                <span className='text-[.7vw]'>{day}</span>
            </div>
        </div>
    </div>
  )
}

export default ProductCard