'use client'

import React, { useState } from 'react'
import Rating from '@components/Rating'
import profilePics from '@assets/profile_pics.jpg'
import Image from 'next/image'
import { patchData } from '@vanilla/requests/patch'
import { popup } from '@vanilla/box/popupbox'
import { authBox } from '@vanilla/box/authbox'
import { useSiteData } from '@context/siteData'


const commentReturned = [
    {
      name:'reply',
      emoji:"bi bi-reply-fill",
      active: false
    },
    {
      name:'thumbsup',
      emoji:"bi bi-hand-thumbs-up-fill",
      active: false
    },
    {
      name:'love',
      emoji:"bi bi-suit-heart-fill",
      active: false
    },
  ]




const ShowComments = ({commentsUpdater,comments,Id}) => {
    const [viewedComment,setViewedComment] = useState(null)
    const {user} = useSiteData()










    const implement = async(e,name,commentId)=>{
      e.stopPropagation()


      const data = {
          type: name,
      }
        let reply
        if(name === 'reply'){
          if(!user) return authBox(400,'You must login to reply comment')
          reply = await popup({heading:'Enter your Reply below',text:'Please insert Reply',type:'prompt'})
          if(!reply) return authBox(400,'You must Enter Reply to reply')
          data.reply={
            userId:user.id || user._id,
            name:user.name || user.fullName,
            picture:user.picture,
            reply
        }
        }

        
        try {
            const newComments = await patchData(`/api/portfolio/edit/comment/returned/${Id}/${commentId}`,data)
            commentsUpdater(newComments)
            authBox(200, `${name} sent Successfully`)
        } catch (err) {
            authBox(500, 'An error Occured')
        }

    }









  return (
    <>
    <div className="">
            {
              comments?.map((comment)=>(
                <div key={comment._id} className="mb-20">
                <div onClick={()=>setViewedComment(comment)}  className="mb-8 cursor-pointer border-2 border-solid p-8 border-[#707070] rounded-lg sm:rounded-full px-4 sm:px-20 w-fit flex flex-col gap-2">
                  <div className="flex max-sm:flex-col gap-5 items-center">
                    <div className="flex gap-2">
                    <div className="">
                      <Image src={profilePics} alt="commenter" width={25} height={25} className='rounded-full'/>
                    </div>
                    <h3 className="">{comment.name}</h3>
                    </div>
                    <Rating rating={comment.rating}/>
                  </div>
                  <div className="">
                    <p className="t_view_less">{comment.comment}</p>
                  </div>
                  <div className="flex gap-5">
                      {
                        commentReturned.map(returned => (
                          <div onClick={(e)=>implement(e,returned.name,comment._id)} key={returned.name} className='flex gap-2 hover:scale-110'>
                            <p className="">{
                              returned.name !== 'reply'
                              ? comment[returned.name]
                              : comment[returned.name].length
                            }</p>
                            <i className={returned.emoji + ' '}/>
                            <p className="">{returned.name}</p>
                          </div>
                        ))
                      }
                  </div>
                </div>
                 <div className="">

                 {
                   comment?.reply?.map(reply=>(
                     <div onClick={()=>setViewedComment(reply)} key={reply._id} className=" text_1 mb-8 cursor-pointer border-2 border-solid p-8 border-[#747373] rounded-lg sm:rounded-full px-4 sm:px-20 w-fit flex flex-col gap-2">
                     <div className="flex max-sm:flex-col gap-5 items-center">
                       <div className="flex gap-2">
                       <div className="">
                         <Image src={profilePics} alt="replyer" width={25} height={25} className='rounded-full'/>
                       </div>
                       <h3 className="">{reply.name}</h3>
                       </div>
                     </div>
                     <div className="">
                       <p className="t_view_less">{reply.reply}</p>
                     </div>
                     <div className="flex gap-2">
                         <i onClick={(e)=>implement(e,'reply',comment._id)} className="bi bi-reply-fill hover:scale-110"></i><p className="">reply</p>
                     </div>
                     </div>
                   ))
                 }
               </div>

              
              

              </div>))
            }
          </div>





            {
                viewedComment && (
                    <section className="commenter_container justify-center items-center">
                        <div className="glassy_look"/>
                        <button onClick={()=>setViewedComment(null)} className="absolute top-0 left-0 text-3xl text-[#858484] m-8">
                            x
                        </button>
                        <div className="flex flex-col wrapper gap-5">
                        <div className="flex max-sm:flex-col gap-5 items-center">
                    <div className="flex gap-2">
                    <div className="">
                      <Image src={profilePics} alt="commenter" width={30} height={30} className='rounded-full'/>
                    </div>
                    <h3 className="">{viewedComment.name}</h3>
                    </div>
                    <Rating rating={viewedComment.rating}/>
                  </div>
                  <div className="">
                    <p className="">{viewedComment.comment}</p>
                  </div>
                  <div className="flex gap-5">
                      {
                        Array.isArray(viewedComment['reply'])?
                        commentReturned.map(returned => (
                          <div onClick={(e)=>implement(e,returned.name,viewedComment._id)} key={returned.name} className='flex gap-2 hover:scale-110 cursor-pointer'>
                            {viewedComment[returned.name] && <p className="">{
                              returned.name !== 'reply'
                              ?viewedComment[returned.name]
                              : viewedComment[returned.name].length
                            }</p>}
                            
                            <i className={returned.emoji + ' '}/>
                            <p className="">{returned.name}</p>
                          </div>
                        ))
                        :(
                          <div onClick={(e)=>implement(e,'reply',viewedComment._id)}  className='flex gap-2 hover:scale-110 cursor-pointer'>
                            
                            <i className='bi bi-reply-fill'/>
                            <p className="">reply</p>
                          </div>
                        )

                      }
                  </div>
                      </div>
                    </section>
                )
            }
       </>   
  )
}

export default ShowComments
