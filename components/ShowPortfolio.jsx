import { spacer } from '@constants/regexp'
import { strToArr } from '@vanilla/string_methods/sting'
import Link from 'next/link'
import IframeLoader from './IframeLoader'
import Rating from './Rating'


const ShowPortfolio = ({portfolio,deletePortfolio,isLoading,setGetting,isGetting,lessView=false}) => {
  return (
    <div className="flex items-start mb-20 flex-col gap-2 w-full">
            <h2 className="font_agbalumo">{portfolio?.name}</h2>
            <IframeLoader link={portfolio?.link}/>
            <Rating size={40} rating={Math.round(portfolio?.totalRating)}/>
            {!lessView?(<div className="">{strToArr(portfolio?.description,spacer)?.map((text,index)=>(
                <p key={index} className="mb-4">{text}</p>
            ))}</div>)
                :(
                <>
                <div className="">{strToArr(portfolio?.description,spacer)?.filter((_,index) => index < 5)?.map((text,index)=>{
                    if(index === 4){
                        return <p key={index} className="mb-4">{text}...</p> 
                    }
                   return <p key={index} className="mb-4">{text}</p>
                })}</div>
                
                <Link href={`portfolio/${portfolio._id}`} className='text_accent underline text-[2rem] font_agbalumo hover:text-red-600'>View Work</Link>
                </>
                )
        
        }

            {deletePortfolio || isLoading || setGetting || isGetting && (<div className="flex self-end gap-2 w-fit">
                <Link href={`edit/${portfolio?._id}`} onClick={()=>setGetting(true)} className="px-8 py-4 text_1 bg_primary text-white hover:scale-110">{isGetting?"Loading...":"Edit Portofolio"}</Link>
                <button disabled={isLoading} onClick={deletePortfolio} className="px-8 py-4 text_1 bg_secondary text-white hover:scale-110">{isLoading?'Deleting...':"Delete Portofolio"}</button>
            </div>)}
        </div>
  )
}

export default ShowPortfolio
