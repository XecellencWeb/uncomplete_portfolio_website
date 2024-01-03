import { ORDEREDLIST } from '@constants/editOptions'
import React from 'react'

const ShowListContent = ({content,className,name,editing,editContent,newlyMade,afterEditText,parentIndex,activeCss}) => {
  return (
    name === ORDEREDLIST?(
        <ol className={className}>
            {content.map((listItem,index)=>(
                <li key={index} contentEditable={listItem.isEditable} onKeyUp={(e)=>editContent(e,index)} onClick={()=>editing(parentIndex,index)} className={Object.values(listItem.className).join(' ') + ` ${pageContent.isEditable && activeCss}`}>{(newlyMade && newlyMade.id === index)?<span className={newlyMade.style}>{newlyMade.text}</span>:!listItem.isEditable ? listItem.content:afterEditText}</li>
            ))}
        </ol>
    ):(
        <ul className={className}>
            {content.map((listItem,index)=>(
                <li key={index}  contentEditable={listItem.isEditable} onKeyUp={(e)=>editContent(e,index)} onClick={()=>editing(parentIndex,index)} className={Object.values(listItem.className).join(' ') + ` ${pageContent.isEditable && activeCss}`}>{(newlyMade && newlyMade.id === index)?<span className={newlyMade.style}>{newlyMade.text}</span>:!listItem.isEditable ? listItem.content:afterEditText}</li>
            ))}
        </ul>
    )
  )
}

export default ShowListContent
