'use client'

import ArticleDesc from '@components/ArticleDesc'
import Loader from '@components/Loader'
import useFetch from '@hooks/useFetch'
import React from 'react'

const AllArticles = () => {
    const {data:allArticles,loading} = useFetch(`/api/articles/get/all`)


  return (
    <div className="wrapper">
      {
        loading?(
            <Loader/>
        ):(
            allArticles.map(article=>(

                <ArticleDesc key={article._id} article={article}/>
            ))
        )
      }
    </div>
  )
}

export default AllArticles
