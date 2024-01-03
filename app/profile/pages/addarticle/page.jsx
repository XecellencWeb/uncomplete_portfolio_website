'use client'


import ArticleHeaderGetter from '@components/ArticleHeaderGetter'
import Editor from '@components/Editor'
import { EditSchemas } from '@constants/editOptions'
import { authBox } from '@vanilla/box/authbox'
import { postData } from '@vanilla/requests/post'
import { getSessionData, storeSession } from '@vanilla/session'
import React, { useState } from 'react'









const AddArticle = () => {
    const [articleHeader,setArticleHeaders] = useState()
    const [contents,setContents] = useState(getSessionData(null,'edit-data') || [{
        ...EditSchemas['heading'],
        optionIndex:0
    }])
    const [loading,setLoading] = useState(false)


const onComplete = async()=>{
    setLoading(true)
    try {
        await postData(`/api/articles/new`,{
            ...articleHeader,
            contents
        })
        authBox(200,'Successfull added a new article')
    } catch (err) {
        console.log(err)
    }finally{
        setLoading(false)
    }
}



const onSave = ()=>{
    storeSession(contents,'edit-data')
}






const editorProps = {
    contents,
    setContents,
    onComplete,
    loading,
    onSave
}







  return (
    !articleHeader?(
        <ArticleHeaderGetter setter={setArticleHeaders}/>
    ):(
   <Editor {...editorProps}  />
    )
  )
}

export default AddArticle
