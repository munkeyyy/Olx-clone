import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../utils'

const SubCatData = () => {
    const[subCat, setSubCat]=useState([])

    useEffect(()=>{
        axios.get(baseUrl+"sub-categories/get-sub-categories")
        .then((res)=>setSubCat(res.data.data))
        .catch((err)=>console.log(err))
    },[])
  return (
    <div className='grid bg-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
        {
            subCat.map((elem, i)=>(
                <div key={i} className=''>
                    <h1 className='roboto text-[.9vw] text-black font-semibold'>{elem?.category.title}</h1>
                    <ul className='mt-3'>
                        <li className='text-black cursor-pointer font-normal text-[.9vw] transition-[all1s] hover:text-[#00a49f]'>{elem?.title}</li>
                    </ul>
                </div>
            ))
        }

    </div>
  )
}

export default SubCatData