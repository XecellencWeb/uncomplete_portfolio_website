import React from 'react'
import ShowEditorProduce from './ShowEditorProduce'

const ShowContainerContent = ({contents,className,editing,editContent,newlyMade,afterEditText,activeCss,onClick,contentEditable,editingMode}) => {

    const theProps = {
        contents,
        editing,
        editContent,
        newlyMade,
        afterEditText,
        remark:true,
        activeCss,
        editingMode
    }





    
  return (
    <div className={className} onClick={onClick} contentEditable={contentEditable}>
      <ShowEditorProduce {...theProps} />
    </div>
  )
}

export default ShowContainerContent
