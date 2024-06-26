import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { baseUrl } from '../../utils'
import { SearchContext } from '../../contexts/Search/SearchContext'

const SubCatData = ({isRotating,setIsRotating}) => {
    const[subCat, setSubCat]=useState([])
    const{getData}= useContext(SearchContext)

    useEffect(()=>{
        axios.get(baseUrl+"categories/get-categories")
        .then((res)=>{setSubCat(res.data.data)
            //  console.log(res.data.data)
            })
        .catch((err)=>console.log(err))
    },[])
  return (
    <div className='grid bg-white grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4'>
        {
            subCat.map((elem,i)=>{
                return (
                    <div key={i} className='h-[max-content]'>
                        <h1 onClick={()=>{getData(elem.title)
                            setIsRotating(!isRotating)
                        }} className='font-medium text-[1vw] roboto cursor-pointer hover:text-[#00a49f]'>{elem.title}</h1>
                        {elem.subcategory.map((sub,j)=>(
                            <ul key={j}>
                                <li onClick={()=>{getData(sub.title)
                                    setIsRotating(!isRotating)
                                }} className='roboto text-[.9vw] cursor-pointer my-2 text-black hover:text-[#00a49f]' key={i}>{sub.title}</li>
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