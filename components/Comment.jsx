'use client'


import React, { useState } from 'react'
import Rating from './Rating'
import { TextArea } from '@app/profile/portfolios/add/page'
import { useSiteData } from '@context/siteData'
import { authBox } from '@vanilla/box/authbox'
import Loader from './Loader'
import { isempty } from '@vanilla/objects_methods/isempty'
import { patchData } from '@vanilla/requests/patch'
import feedBack from '@assets/feedback.gif'
import Image from 'next/image'

const Comment = ({commentsUpdater,Id}) => {
    const [btnClicked,setBtnClecked] = useState(false)
    const {user} = useSiteData()
    const [rating,setRating] = useState(5)
    const ratingProps = {rating,setRating,size:50}
    const [comment, setComment] = useState('')
    const [commentUploading,setCommentUploading] = useState(false)



    const submitComment = async()=>{

        if(isempty({
            rating,
            comment
        },{strict:true}))return authBox(400,'Please enter Rating and Comment.')

        const data = {
            userId : user.id || user._id,
            name: user.name || user.fullName,
            picture: user.picture,
            rating,
            comment
        }

        setCommentUploading(true)

        try {
            console.log('calling')
            const newComment = await patchData(`/api/portfolio/edit/comment/${Id}`,data)
            commentsUpdater(newComment)
            authBox(200,'Comment Added Successfully.')
        } catch (err) {
            authBox(500,'Sorry, an error occured')
        }finally{
            setCommentUploading(false)
            
        }
    }


  return (
    <section className="">
          <div className="wrapper">
            <button onClick={()=>{
                if(!user) return authBox(400,'You must Log in to Continue.')
                setBtnClecked(true)
                }} className="hover:text-blue-600 hover:underline">😎😻👽🤩Drop your Comment and Rating For Portfolio! </button>
          </div>
          {
            btnClicked && (
                <section className="commenter_container">
                    <div className="glassy_look"/>
                
                        <div className="rounded-full">
                        <Image src={feedBack} alt='feedback pics'/>
                        </div>

                    <p className="">
                        Hi, Don't your Like this my portofio website. Common give it a five star Rating.
                    </p>
                    <p className="">{rating}</p>
                    <Rating {...ratingProps}/>
                    <TextArea value={comment} className='w-[40rem] ' onChange = {(e)=>setComment(e.target.value)} placeholder='Write your comment Here.'/>
                    {
                        commentUploading?(
                            <Loader/>
                        ):(
                            <button onClick={submitComment} className="bg_accent px-20 py-4 rounded-full text_white">Submit</button>
                        )
                    }
                </section>
            )
          }
    </section>
  )
}

export default Comment
