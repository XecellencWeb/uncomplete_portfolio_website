import { Input, TextArea } from '@app/profile/portfolios/add/page'
import React from 'react'
import UploadBox from './UploadBox'
import OptimizedImg from './OptimizedImg'
import { isempty } from '@vanilla/objects_methods/isempty'

const ArticleHeaderGetter = ({setter}) => {

    const [waiter,setWaiter] = useState({})

    const accepetImage = (name,img)=>{
        setWaiter(prev => (
            {
                ...prev,
                [name]:img
            }
        ))
    }





    const implementSetter = ()=>{

        if(isempty(waiter))return


        setter(waiter)
    }





  return (
    <div className='wrapper flex flex-col gap-10'>


        <div className="h-[30vh] w-full">
            {
                waiter?.articleCoverImage && (
                    <OptimizedImg className='w-full h-full object-cover' src={waiter?.articleCoverImage} alt='article cover Image'/>
                )
            }
        </div>




      <Input onChange = {(e)=>setWaiter(prev => ({
        name:e.target.value,
        ...prev
      }))} placeholder = 'Enter the name of your article here...'/>



      <TextArea onChange = {(e)=>setWaiter(prev => ({
        ...prev,
        description:e.target.value
      }))} placeholder = 'Enter the description of your article here...'/>


      <UploadBox accept='image' dragText={'Drag Cover for here to upload'} setAsset={accepetImage} name='articleCoverImage'/>


      <button onClick={implementSetter} className="h_background">Continue</button>

    </div>
  )
}

export default ArticleHeaderGetter
