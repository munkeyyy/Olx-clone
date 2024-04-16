import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../utils'

const SubCatData = () => {
    const[subCat, setSubCat]=useState([])

    useEffect(()=>{
        axios.get(baseUrl+"categories/get-categories")
        .then((res)=>{setSubCat(res.data.data)
             console.log(res.data.data)})
        .catch((err)=>console.log(err))
    },[])
  return (
    <div className='grid bg-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4'>
        {
            subCat.map((elem,i)=>{
                return (
                    <div key={i} className='h-[max-content]'>
                        <h1 className='font-medium text-[1vw] roboto'>{elem.title}</h1>
                        {elem.subcategory.map((sub,i)=>(
                            <ul>
                                <li className='roboto' key={i}>{sub.title}</li>
                            </ul>
                        ))}
                    </div>
                )
            })
        }

    </div>
  )
}

export default SubCatData