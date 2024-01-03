'use client'

import { authBox } from '@vanilla/box/authbox'
import { store } from '@components/firebase'
import {getDownloadURL, ref,uploadBytes} from 'firebase/storage'
import React, { useState } from 'react'
import { v4 } from 'uuid'

function UploadBox({name,dragText,inpText,accept,setAsset,className,setUploaded,size,shrink}) {

  const [uploading, setUploading] = useState(false)
  const [uploaded, setuploaded] = useState(false)

  const uploadFile = async(file)=>{
    const accepted = file.type.includes(accept)
    const okaysize = JSON.parse(file.size) <= (size * 1048576) || 5242880
    if(!file)return authBox(404,'No fioe provided')
    if(!accepted) return authBox(401, 'This file is not accepted')
    if(!okaysize) return authBox(400, 'This file is too big for an upload')
    setUploading(true)
    const toUpload = ref(store, `${accept}/${file.name}${v4()}`)
    uploadBytes(toUpload,file).then((res)=>{
      getDownloadURL(res.ref).then((res)=>{
        setUploading(false)
       if(setUploaded)setuploaded(true)
        setAsset(name,res)
      })
    })

  }
    
    const addHighlight = (e)=>{
      e.preventDefault()
        e.target.classList.add('highlight')
    }

    const removeHighlight = (e)=>{
      e.preventDefault()
      e.target.classList.remove('highlight')
  }

  const dropEvent = (e)=>{
    
    removeHighlight(e)
    const file = e.dataTransfer.files[0]
    uploadFile(file)
  }

  const changeEvent = (e)=>{
    const file = e.target.files[0]
    uploadFile(file)
  }

      
  return (
    !shrink
    ?
    (<div onDragOver={addHighlight} onDragLeave={removeHighlight} onDrop={dropEvent} className={`${className && className} upload_box ${uploaded&&'hidden'}`}>{
      uploading?<p className='upload_box_text'>Uploading files to cloud.........</p>
      :<>
      <p className="upload_box_text">{dragText || 'Drag and Drop File here to Upload File' } or</p>
      <label className="">
         <input onChange={changeEvent} type="file" name="" className="upload_input" />
        <p className="upload_input_text">{inpText || 'Click to Select file from directory'}</p>
      </label>
        </>
        }
    </div>):
    (
      <label className="">
        <input type='file' onChange={changeEvent} className='upload_input' />
        <p className="px-8 py-2 bg-[#ccc] rounded-full shadow-lg shadow-[#333]">Set Image Source</p>
      </label>
    )
  )
}

export default UploadBox