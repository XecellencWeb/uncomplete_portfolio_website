'use client'

import { UploadBox } from '@components'
import IframeLoader from '@components/IframeLoader'
import ImagesCollection from '@components/ImagesCollection'
import { devGenre } from '@constants/contents'
import { authBox } from '@vanilla/box/authbox'
import { isempty } from '@vanilla/objects_methods/isempty'
import { addSchema } from '@vanilla/react_utils/schema'
import { postData } from '@vanilla/requests/post'
import React, { createRef, useState } from 'react'








export const Input = ({className,...rest})=>(
    <input {...rest} className={className + " p-4 h-16 rounded-lg "} />
)
export const TextArea = ({className,...rest})=>(
    <textarea {...rest} className={className + " p-8 h-40 rounded-lg resize-none"}></textarea>
)










const AddPortfolio = () => {



    const [link,setLink] = useState()
    const [isSubmiting,setIsSubmiting] = useState(false)
    const [type,setType] = useState()
    const [appPics,setAppPics] = useState([])
    const [name, setName] = useState()
    const [description,setDescription] = useState()



    const enterPortfolio = (e)=>{
    if(e.key !== 'Enter')return
    const value = e.target.value 
    if(!value || !value.startsWith('http'))return authBox(400,'Not a valid link')
    setLink(value)
    e.target.value = ''
    }







    const uploadApp = (name,file)=>{
        setLink(file)
    }













    const addPortfolio = async(type)=>{
        const data = {
            name,
            description,
            link,
            type,
            appPics:appPics.length > 0? appPics :'App Picture goes here',

        }


        
        if(isempty(data,{strict:true}))return authBox(400,'You must provide name, description and Link for portfolio project')
        setIsSubmiting(true)




        try {
            await postData(`/api/portfolio/new`,data)
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
      <Input value={name} onChange={(e)=>setName(e.target.value)} placeholder = 'Enter the name of Portfolio...'/>
      <TextArea value = {description} onChange = {(e)=>setDescription(e.target.value)} placeholder = 'Enter Portfolio description...'/>
        <div className="">
            {
                link && <IframeLoader link={link}/>
            }
        </div>
      <Input placeholder = 'Enter Portfolio link...' onKeyDown = {enterPortfolio}/>

      <button disabled = {isSubmiting} onClick={()=>addPortfolio('web development')}  className="mt-12 disabled_btn px-4 py-2 bg_primary rounded-full text-white hover:shadow-orange-400 hover:shadow-lg">{isSubmiting? 'Submiting':'Submit'}</button>
    </div>
   ):
   type === 'app development'
   &&(
    <div className='flex gap-2 flex-col mt-20 w-full'>
      <Input ref={name} placeholder = 'Enter the name of Portfolio...'/>
      <TextArea ref={description} placeholder = 'Enter Portfolio description...'/>
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

      <button disabled = {isSubmiting} onClick={()=>addPortfolio('app development')}  className="mt-12 disabled_btn px-4 py-2 bg_primary rounded-full text-white hover:shadow-orange-400 hover:shadow-lg">{isSubmiting? 'Submiting':'Submit'}</button>
    </div>
   )
  ) 
}

export default AddPortfolio
