import { CODESNIPPET, CONTAINER, HEADING, HYPERLINK, ORDEREDLIST, PARAGRAPH, UNORDEREDLIST } from '@constants/editOptions'
import React from 'react'
import ShowCodeSnippet from './ShowCodeSnippet'
import ShowContainerContent from './ShowContainerContent'
import ShowListContent from './ShowListContent'
import Image from 'next/image'

const ShowEditorProduce = ({contents,editingMode,editing,editContent,newlyMade,afterEditText,remark,activeCss}) => {

    const neededProps = {
        editing,
        editContent,
        newlyMade,
        afterEditText,
        activeCss,
        editingMode
    }



  return (





        !editingMode?(
            contents?.map((pageContent,index) => (
                pageContent.name === HEADING ? (
                    <h1 key={index}   className={Object.values(pageContent.className).join(' ')}  >{pageContent.content}</h1>
                ):(
                    pageContent.name === PARAGRAPH ? (
                        <p key={index}   className={Object.values(pageContent.className).join(' ')}>{pageContent.content}</p>
                    ):(
                        pageContent.name === HYPERLINK ? (
                        <Link href={''} key={index}   className={Object.values(pageContent.className).join(' ')   }   >{pageContent.content}</Link>
                    ):
    
                    pageContent.name === CODESNIPPET ? (
                        <ShowCodeSnippet className={Object.values(pageContent.className).join(' ')} content={pageContent.content}/>
                    ):
                    pageContent.name === CONTAINER ? (
                        <ShowContainerContent {...neededProps}  className={Object.values(pageContent.className).join(' ')   } contents={pageContent.content}/>
                    ):
                    (pageContent.name === ORDEREDLIST || pageContent.name === UNORDEREDLIST) ? (
                        <ShowListContent {...neededProps} name={pageContent.name} parentIndex={index} className={Object.values(pageContent.className).join(' ')  } content={pageContent.content}/>
                    ):
                        <Image key={index} src={pageContent.source} alt={pageContent.caption || 'editor-text'} width={pageContent.width || 480} height={pageContent.height || 640} className={Object.values(pageContent.className).join(' ') }/>
                    )
                )
            ))
        )   




    
        :(contents?.map((pageContent,index) => (
            pageContent.name === HEADING ? (
                <h1 key={index}  onKeyUp ={(e)=>editContent(e,remark && index)}   onClick={()=>editing(index,remark && index)} contentEditable={pageContent.isEditable} className={Object.values(pageContent.className).join(' ') + ` ${pageContent.isEditable && activeCss}` }  >{(newlyMade && newlyMade.id === index)?<span className={newlyMade.style}>{newlyMade.text}</span>:!pageContent.isEditable ? pageContent.content:afterEditText}</h1>
            ):(
                pageContent.name === PARAGRAPH ? (
                    <p key={index} onKeyUp ={(e)=>editContent(e,remark && index)} onClick={()=>editing(index,remark && index)} contentEditable={pageContent.isEditable} className={Object.values(pageContent.className).join(' ')  + ` ${pageContent.isEditable && activeCss}` }   >{(newlyMade && newlyMade.id === index)?<span className={newlyMade.style}>{newlyMade.text}</span>:!pageContent.isEditable ? pageContent.content: afterEditText}</p>
                ):(
                    pageContent.name === HYPERLINK ? (
                    <Link href={''} key={index} onKeyUp ={(e)=>editContent(e,remark && index)} onClick={()=>editing(index,remark && index)} contentEditable={pageContent.isEditable} className={Object.values(pageContent.className).join(' ')  + ` ${pageContent.isEditable && activeCss}` }   >{(newlyMade && newlyMade.id === index)?<span className={newlyMade.style}>{newlyMade.text}</span>:!pageContent.isEditable ? pageContent.content:afterEditText}</Link>
                ):

                pageContent.name === CODESNIPPET ? (
                    <ShowCodeSnippet onClick={()=>editing(index,remark && index)} contentEditable={pageContent.isEditable} className={Object.values(pageContent.className).join(' ')  + ` ${pageContent.isEditable && activeCss}` } content={(newlyMade && newlyMade.id === index)?<span className={newlyMade.style}>{newlyMade.text}</span>:!pageContent.isEditable ? pageContent.content:afterEditText}/>
                ):
                pageContent.name === CONTAINER ? (
                    <ShowContainerContent onClick={()=>editing(index,remark && index)} contentEditable={pageContent.isEditable} {...neededProps}  className={Object.values(pageContent.className).join(' ')  + ` ${pageContent.isEditable && activeCss}` } contents={pageContent.content}/>
                ):
                (pageContent.name === ORDEREDLIST || pageContent.name === UNORDEREDLIST) ? (
                    <ShowListContent onClick={()=>editing(index,remark && index)} contentEditable={pageContent.isEditable} {...neededProps} name={pageContent.name} parentIndex={index} className={Object.values(pageContent.className).join(' ')  + ` ${pageContent.isEditable && activeCss}` } content={pageContent.content}/>
                ):
                    <Image key={index} onClick={()=>editing(index)} src={pageContent.source} alt={pageContent.caption || 'editor-text'} width={pageContent.width || 480} height={pageContent.height || 640} className={Object.values(pageContent.className).join(' ')  + ` ${pageContent.isEditable && activeCss}`}/>
                )
            )
        )))
    
  )
}

export default ShowEditorProduce
