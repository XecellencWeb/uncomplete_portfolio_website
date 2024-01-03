import React from 'react'
import Link from 'next/link'











const MangePages = () => {





  return (
    <div className=' flex gap-10 flex-col sm:grid grid-cols-2 h-[50vh] mt-20'>
      <Link href='pages/policypage' className="bg-[#e62e2e] hover:bg-[#914c4c] hover:scale-90 rounded-lg flex flex-col items-center justify-center h-full">
      <i className="bi bi-bank text-[10rem]"></i>
      <p className="">Manage Policy Page</p>
      </Link>
      
      <div className="flex gap-5 flex-col h-full">
      <Link href='pages/addarticle' className={`bg-[#232392] hover:bg-[#3f3f6b] hover:scale-90 rounded-lg flex items-center justify-center h-full gap-2 flex-col`}>
      <i className ="bi bi-file-earmark-plus text-[5rem]"></i>
      <p className="">Add A new Article</p>
      </Link>
      <Link href='pages/allarticles' className={`bg-[#232392] hover:bg-[#3f3f6b] hover:scale-90 rounded-lg flex items-center justify-center h-full gap-2 flex-col`}>
      <i className ="bi bi-pen-fill text-[5rem]"></i>
      <p className="">View All Articles</p>
      </Link>
      </div>
    </div>
  )
}

export default MangePages
