import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../utils'
import ProductCard from './ProductCard'

const ProductList = () => {
    const[proData, setProData]=useState([])
    useEffect(()=>{
        axios.get(baseUrl+"products/get-products")
        .then((res)=>setProData(res.data.data))
        .catch((err)=>console.log(err))
    },[])
  return (
    <div className='mx-auto my-0 max-w-[1280px] py-6'>
        <h1 className='text-black font-medium text-[1.4vw] roboto'>Fresh Recommendations</h1>
        <div className='flex justify-start gap-4 flex-wrap mt-4'>
            {
                proData&&proData.map((product,i)=>(<div key={i}>
                    <ProductCard
                        title={product.title}
                        
                        price={product.price}
                        location={product.location}
                        day={product.day}
                        thumbnail={"http://localhost:8001/uploads/product/"+product.thumbnail}
                    />
                </div>))
            }
        </div>
    </div>
  )
}

export default ProductList