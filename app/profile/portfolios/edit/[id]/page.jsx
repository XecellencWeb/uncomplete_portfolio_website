'use client'

import useFetch from '@hooks/useFetch'
import React, { createRef, useEffect, useState } from 'react'
import { Input, TextArea } from '../../add/page'
import IframeLoader from '@components/IframeLoader'
import { UploadBox } from '@components'
import ImagesCollection from '@components/ImagesCollection'
import { patchData } from '@vanilla/requests/patch'
import { devGenre } from '@constants/contents'
import { isempty } from '@vanilla/objects_methods/isempty'
import { authBox } from '@vanilla/box/authbox'

const EditPortfolio = ({params}) => {
    const {data:portfolio, loading} = useFetch(`/api/portfolio/get/${params.id}`)
    const [type,setType] = useState()
    const [link,setLink] = useState()
    const [appPics,setAppPics] = useState([])
    const [isSubmiting,setIsSubmiting] = useState(false)
    const [name, setName] = useState()
    const [description, setDescription] = useState()

    console.log(type)


    const enterPortfolio = (e)=>{
        if(!e.key === 'Enter')return
        const value = e.target.value 
        if(!value || !value.startsWith('http'))return authBox(400,'Not a valid link')
        setLink(value)
        e.target.value = ''
    }





    useEffect(()=>{
        setType(portfolio?.type)
        setLink(portfolio?.link)
        setName(portfolio?.name)
        setDescription(portfolio?.description)
        // console.log(portfolio)
    },[portfolio])




    
    const editPortfolio = async(type)=>{
        const data = {
            name,
            description,
            link,
            type,
            appPics:appPics.length > 0?appPics:'App Picture goes here',

        }


        
        if(isempty(data,{strict:true}))return authBox(400,'You must provide name, description and Link for portfolio project')
        setIsSubmiting(true)




        try {
            await patchData(`/api/portfolio/edit/${params.id}`,data)
            authBox(200, 'Successfull')
        } catch (err) {
            console.log(err)

        }finally{
            setIsSubmiting(false)
        }

    }





    return (!type?(
        <div className="w-full min-h-[50vh] grid place-content-center">
            <select value={type} onChange={(e)=>setType(e.target.value)} className="px-12 py-4 rounded-full text-center">
                <option value="" className="text-center capitalize">Select Portfolio Type</option>
                {devGenre.map((genre,index) =>(
                    <option value={genre} key={index} className="capitalise text-center">{genre}</option>
                ) )}
            </select>
        </div>
      ):
      type === 'web development'
    ?( <div className='flex gap-2 flex-col mt-20 w-full'>
          <Input value = {name} onChange={(e)=>setName(e.target.value)} placeholder = 'Enter the name of Portfolio...'/>
          <TextArea value = {description} onChange={(e)=>setDescription(e.target.value)} placeholder = 'Enter Portfolio description...'/>
            <div className="">
                {
                    link && <IframeLoader link={link}/>
                }
            </div>
          <Input placeholder = 'Enter Portfolio link...' onKeyDown = {enterPortfolio}/>
    
          <button disabled = {isSubmiting} onClick={()=>editPortfolio('web development')}  className="mt-12 disabled_btn px-4 py-2 bg_primary rounded-full text-white hover:shadow-orange-400 hover:shadow-lg">{isSubmiting? 'Submiting':'Submit'}</button>
        </div>
       ):
       type === 'app development'
       &&(
        <div className='flex gap-2 flex-col mt-20 w-full'>
          <Input value = {name} onChange={(e)=>setName(e.target.value)} placeholder = 'Enter the name of Portfolio...'/>
          <TextArea value = {description} onChange={(e)=>setDescription(e.target.value)} placeholder = 'Enter Portfolio description...'/>
            <div className="w-full">
                {
                    <ImagesCollection images={appPics} options={{
                        editable:true,
                        imageProps:{
                            callback:setAppPics
                        }
                    }}/>
                }
            </div>
          <Input placeholder = 'Enter Images of App...' onKeyDown = {(e)=>addSchema(e,setAppPics,{addOnEnterKey:true})}/>
    
          <UploadBox dragText={'Drag and Drop to Upload app to cloud'} name = 'appplication' accept='apk' size={100} setAsset={uploadApp} />
    
          <button disabled = {isSubmiting} onClick={()=>editPortfolio('app development')}  className="mt-12 disabled_btn px-4 py-2 bg_primary rounded-full text-white hover:shadow-orange-400 hover:shadow-lg">{isSubmiting? 'Submiting':'Submit'}</button>
        </div>
       )
      ) 
    
}

export default EditPortfolio
