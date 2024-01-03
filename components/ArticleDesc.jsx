import React from 'react'
import Link from 'next/link'
import OptimizedImg from './OptimizedImg'





const ArticleDesc = ({article}) => {
  return (
    <div className='flex flex-col gap-2 mb-8'>
      <h1 className="font_wavy_2">{article?.name}</h1>
      <OptimizedImg src={article.articleCoverImage} alt='article cover Image'/>
      <p className="">{article?.description}...</p>
      <Link className="px-8 py-4 text_1 bg_primary text-white hover:scale-110" href={`/articles/${article._id}`}>Read Article</Link>
    </div>
  )
}

export default ArticleDesc
