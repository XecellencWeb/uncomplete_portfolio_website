'use client'


import Loader from '@components/Loader'
import useFetch from '@hooks/useFetch'
import ShowPortfolio from '@components/showPortfolio'
import Comment from '@components/Comment'
import ShowComments from '@components/ShowComments'
import { useEffect, useState } from 'react'

const currentPortfolio = ({params}) => {
    const {data:work,loading} = useFetch(`/api/portfolio/get/${params.id}`)
    const {data} = useFetch(`/api/portfolio/get/${params.id}/comments`)
    const [comments,setComments] = useState()

  useEffect(()=>{
      setComments(data)
  },[data])



  return (
    <>
    <section>

   <div className="wrapper pt-40">

   { loading?(
     <Loader/>
     ):(
       <ShowPortfolio portfolio={work}/>   
       )}

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

export default currentPortfolio
