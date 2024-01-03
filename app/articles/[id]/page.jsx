import Comment from '@components/Comment'
import Loader from '@components/Loader'
import ShowComments from '@components/ShowComments'
import ShowEditorProduce from '@components/ShowEditorProduce'
'use client'

import useFetch from '@hooks/useFetch'
import { useState, useEffect } from 'react'


const Article = ({params}) => {

    const {data:article,loading} = useFetch(`/api/articles/get/${params.id}`)
    const {data} = useFetch(`/api/articles/get/${params.id}/comments`)
    const [comments,setComments] = useState()

  useEffect(()=>{
      setComments(data)
  },[data])




  return (
    <>
    <section>
    <div className='wrapper pt-20 '>
        
        {
        loading?(
            <Loader />
        ):
        
        (<ShowEditorProduce contents={article?.contents} editingMode={false}/>)}
    </div>
    </section>



    <section className="">
    <div className="wrapper">
      <Comment commentsUpdater = {setComments} Id={params.id}/>
      <ShowComments commentsUpdater = {setComments} Id={params.id} comments={comments}/>
    </div>
  </section>
  </>
  )
}

export default Article
