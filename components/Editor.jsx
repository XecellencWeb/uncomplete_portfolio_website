'use client'


import React, { useEffect, useState } from 'react'
import { BORDERCOLOR, BORDERSIZE, BORDERSTYLE, BOTTOM, CAPTION, EditSchemas, HEADING, HEIGHT, HYPERLINK, IMAGE, ImageOptions, LEFT, PARAGRAPH, RIGHT, ROUNDEDTOPLEFTBOTTOMRIGHT, ROUNDEDTOPRIGHTBOTTOMLEFT, ROUNDING, SOURCE, SPACINGINSIDE, SPACINGOUTSIDE, TOP, WIDTH, Options, editingOptions, elementsForAdd, styles, units } from '@constants/editOptions'
import { convertLcarmelToCapital } from '@vanilla/objects_methods/isempty'
import Image from 'next/image'
import { classNameMeaning } from '@constants/classMeaning'
import Link from 'next/link'
import UploadBox from './UploadBox'
import ShowEditorProduce from './ShowEditorProduce'
import Loader from './Loader'


const selectStyle = "bg-[#ccc] border-2 border-[#333] text-center py-4 rounded-full"
const selectOptStyle = "capitalize bg-[#ccc] border-2 border-[#333] text-center py-4"
const inputStyle = "w-full bg-[#f0efef] border-2 p-4 py-2 rounded-sm border-[#646464] focus:outline-indigo-500"

const activeCssStyle = 'border-2 block rounded-lg'


export const DisplaySelector = ({selector,onchange})=>{
   
    return(
        selector?.map(option=>(
            <select onChange={(e)=>onchange(e.target.value,option.name)} className={selectStyle}>
                <option value="" className={selectOptStyle}>-- Select {convertLcarmelToCapital(option.name)} --</option>
                {

                    option.options.map((value,index)=>(
                        <option key={index} value={value?.className} className={selectOptStyle}>{ value.name}</option>
                    ))
                }
            </select>
        ))
    )
}




export const ImportStyles = ()=>(
    <div className="hidden">
        {
            styles?.map(
                (style,ind)=>(
                    <div key={ind} className={style}>imported Style</div>
                )
            )
        }
    </div>
)








const Editor = ({contents,setContents,onComplete,onSave,loading}) => {

   //states
    const [selectedOption,setSelectedOption] = useState(0)
    const [selectedOptionValues,setSelectedOptionValues] = useState(Options.map(opt=>(
        opt.for.includes(HEADING) && {
            name:opt.name,
            options:opt.styles
        }
    )))
    const [currentlyEditing,setCurrentlyEditing] = useState(0)
    const [afterEditText,setAfterText] = useState()
    const [activeCss,setActiveCss] = useState(activeCssStyle)
    const [EditOpt,setEditOpt] = useState(0)
    const [EditSelected, setEditSelected] = useState({
        type:editingOptions[EditOpt][0],
        postion:editingOptions[EditOpt][1][0],
        unit:units[0]
    })
    const [cssStyles,setCssStyles] = useState([])
    const [imgOpt,setImgOpt] = useState()
    const [newlyMade,setNewlyMade] = useState({
        text:'Enter Your Text Here',
        style:'text-gray-500 opacity-60',
        id:0
    })
    const [currentChildEditing,setCurentChildEditing] = useState(0)


    //apply Css Style



    const setElementStyle = (cssStyle)=>{
        const element = Array.from(document?.getElementsByClassName(cssStyle))
        const classname = cssStyle?.split('-')

        const value = classname && classname[classname.length-1]?.match(/\[([^[\]]*)\]/)[1]

        
        
        if(classname){
            let stylename = classNameMeaning[classname[0]]

            
            if(classname.length === 3){
                stylename = classNameMeaning[classname[0]]+classNameMeaning[classname[1]]
            }

            element.forEach(elem=>elem.style[stylename] = value)
        }

    }








//Image setter

    // const setImgSrc = (name,src)=>{
    //     changeProperty('source',src)
    // }









    //edit

    //functions


    const editBorderStyle = (opt)=>{
            addStyle(opt.style.className,opt.style.name)
    }


    const editBorderColor = (opt)=>{
            addStyle(opt.style.className,opt.style.name)
    }


    const editRounding = (e)=>{
        let utilClass = 'rounded'
        let utilClass2 = 'rounded'

        
        if(EditSelected.type === TOP){
            utilClass += '-t'
        }


        if(EditSelected.type === BOTTOM){
            utilClass += '-b'
        }


        if(EditSelected.type === LEFT){
            utilClass += '-l'
        }


        if(EditSelected.type === RIGHT){
            utilClass += '-r'
        }


        if(EditSelected.type === ROUNDEDTOPLEFTBOTTOMRIGHT){
            utilClass += '-tl'
            utilClass2 += '-br'
        }


        if(EditSelected.type === ROUNDEDTOPRIGHTBOTTOMLEFT){
            utilClass += '-tr'
            utilClass2 += '-bl'
        }

        utilClass += `-[${e.target.value}${EditSelected.unit}]`
        addStyle(utilClass,EditSelected.type)
        if(EditSelected.type === ROUNDEDTOPLEFTBOTTOMRIGHT || EditSelected.type === ROUNDEDTOPRIGHTBOTTOMLEFT){
            addStyle(utilClass2,EditSelected.type + EditSelected.postion.replace(/ /,''))
        }
    }














    //initializer
    const initEditing = (e,name)=>{

        if(name){
            if(name !== ROUNDING){
            setEditSelected(prev => ({
                ...prev,
                type:name,
                style:{
                    name,
                    className: e.target.value
                }
            }))

            return
        }
        }


        setEditSelected(prev => ({
            ...prev,
            type:editingOptions[EditOpt][0],
            postion:e.target.value
        }))
    }

    const setUnit = (e)=>{
        setEditSelected(prev => ({...prev,unit:e.target.value}))
    }


    //set edit option selected

    const startEditing = (e)=>{


        //deciders
        let type = 'm'

        if(EditSelected.type === SPACINGINSIDE){
            type = 'p'
        }
        if(EditSelected.type === SPACINGOUTSIDE){
            type = 'm'
        }
        if(EditSelected.type === BORDERSIZE){
            type = 'border'
        }
        if(EditSelected.type === BORDERSTYLE ){
            editBorderStyle(EditSelected)
            return
        }


        if(EditSelected.type === BORDERCOLOR ){
            editBorderColor(EditSelected)
            return
        }


        if(EditSelected.type === ROUNDING ){
            editRounding(e)
            return
        }



        //setters

        if(EditSelected.postion === TOP){
            type += 't'
        }

        if(EditSelected.postion === LEFT){
            type += 'l'
        }

        if(EditSelected.postion === RIGHT){
            type += 'r'
        }
        if(EditSelected.postion === BOTTOM){
            type += 'b'
        }


        type += `-[${e.target.value}${EditSelected.unit}]`

        console.log(type)
        addStyle(type,EditSelected.type)
    }







 
    
    //content edit











    const removeEditable = (child)=>{
        if(child){
            
            setContents(prev => prev.map(con=>({
                ...con,isEditable:false,content:con.content.map(childCon=>(
                    {...childCon,isEditable:false}
                ))
            })))
        }


        setContents(prev => prev.map(con=>({
            ...con,isEditable:false
        })))
    }






    const addEdit = (name,optionIndex,childName)=>{
        
        setSelectedOption(optionIndex)
        setNewlyMade(prev => ({
            ...prev,
            text:`Enter your ${name} here...`,
            id:currentlyEditing + 1
        }))
        setActive()
        setCurrentlyEditing(prev => prev + 1 )
        updateOptions(name)
        
        if(childName){
            removeEditable(true)
            
            setContents(prev => prev.map(
              (nodes,index) => {
                if(index === optionIndex){
               return {
                    ...nodes,
                    content:[...nodes.content.slice(0,currentChildEditing + 1), {...EditSchemas[name],optionIndex},   ...nodes.content.slice(currentChildEditing + 1)]
                }
                }
              }))


              return
        }
        
        removeEditable()


        setContents(prev => [...prev.slice(0,currentlyEditing + 1), {...EditSchemas[name],optionIndex},   ...prev.slice(currentlyEditing + 1)])



    }


    const updateOptions = (nam)=>{
        
        

      const option =  Options.map(options => {
        if(options.for.includes(nam)){
            return {
                name:options.name,
                options:options.styles
            }
        }
        })


        setSelectedOptionValues(option)
    }





    const editing = (index,remark)=>{
        setCurrentlyEditing(index)


        if(remark){
            
            setCurentChildEditing(remark)
            updateOptions(contents[index].content[remark].name)
            setActive()
            setNewlyMade(null)
            if(contents[index].content[remark].name === IMAGE){
                return
            }
            setAfterText(contents[index].content[remark].content)
        }




        updateOptions(contents[index].name)
        setActive()
        setNewlyMade(null)
        if(contents[index].name === IMAGE){
            return
        }
        setAfterText(contents[index].content)
        
        
        
        removeEditable()
        setContents(prev => prev.map((con,ind) => {
            if(ind === index ){
                setSelectedOption(con.optionIndex)
                return {
                    ...con,isEditable:true
                }
            }

            return con
        }))
    }



    const addStyle = (utilClassName,name)=>{

            if(!utilClassName)return

        setContents(prev => prev.map((con,index) =>{
            if(index === currentlyEditing){
                return {
                    ...con,
                    className:{...con.className,[name]:utilClassName}
                }
            }

            return con
        }))


        if(/\[.*?\]/.test(utilClassName)){
            setCssStyles(prev => [...prev,utilClassName])
           const updater = [...cssStyles,utilClassName]
           updater.forEach(setElementStyle)
        }
    }


    const changeProperty = (property,value,remark)=>{

        if(remark){
            setContents(prev => prev.map(
                (content,index)=>{
                    
                    if(index === currentlyEditing){
                        return {
                            ...content,
                            content:content.content.map(
                                (child,index)=>{
                                    if(index === remark){
                                        return {
                                            ...child,
                                            [property]:value
                                        }
                                    }

                                    return child
                                }
                            )
                        }
                    }
        
        
                    return content
                }
               ))

               return
        }

        setContents(prev => prev.map(
            (content,index)=>{
                
                if(index === currentlyEditing){
                    return {
                        ...content,
                        [property]:value
                    }
                }
    
    
                return content
            }
           ))
    }




    const editContent = (e,remark)=>{
          changeProperty('content',e.target.textContent,remark)
    }


const setActive = ()=>{
    setActiveCss(activeCssStyle)
}


const ShowEditorProduceProps = {
    editContent,
    editing,
    editingMode:true,
    contents,
    newlyMade,
    afterEditText,
    activeCss
}

  return (
    <div className='flex h-screen '>
    <div className='w-full h-full '>
        <ImportStyles/>
        <div className="wrapper py-8" onClick={()=>setActiveCss('')}>
        <ShowEditorProduce  {...ShowEditorProduceProps}/>
        </div>
        <div className="wrapper py-8 flex justify-end gap-10">
            {
            loading?(
                <Loader/>
            ):

            (
                <>
            
            <button onClick={onSave} className={`bg-blue-700 hover:bg-blue-800 transition-all text_white px-8 py-2`}>Save Article</button>
            <button onClick={onComplete} className='bg-orange-700 hover:bg-orange-800 transition-all text_white px-8 py-2'>Submit Article</button>

                </>
            
            )
            }
        </div>
    </div>



    <div className="w-[20%] h-full flex flex-col gap-20 text_black text_1 bg-white border-l-2 border-solid border-gray-200 p-8">
       <div className="flex flex-col gap-10">
        <div className="grid grid-cols-3 row-gap-10 col-gap-2">
            {
                elementsForAdd?.map((option,index) =>(
                    <div key={index} onClick={()=>addEdit(option[0],index)} className={`flex flex-col items-center cursor-pointer  ${selectedOption === index && 'border-[1px] border-[#333] rounded-lg'} hover:border-[1px] hover:border-[#333] hover:rounded-lg`}>

                    
                    <i className={option[1]}/>

                    <p className="">{option[0]}</p>
                    </div>
                ))
            }
        </div>


            {
                elementsForAdd[selectedOption][2] && (
                    <div onClick={()=>addEdit(elementsForAdd[selectedOption][0],selectedOption,elementsForAdd[selectedOption][2][0])}  className="flex flex-col items-center hover:border-[1px] hover:border-[#333] hover:rounded-lg">
                        <i className={elementsForAdd[selectedOption][2][2]}/>
                        <p className="">{elementsForAdd[selectedOption][2][1] + elementsForAdd[selectedOption][2][0]}</p>
                    </div>
                )
            }




            <div className="flex flex-col gap-2">
                <DisplaySelector selector={selectedOptionValues} onchange={addStyle}/>
            </div>

    </div>


    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
        <h1 className="text-center font-black">Elements Options</h1>
        <div className="grid grid-cols-2 col-gap-2 row-gap-10">
            {
                editingOptions?.map((option,index) => (
                    <div key={index} onClick={()=>setEditOpt(index)} className={`flex items-center flex-col cursor-pointer  ${EditOpt === index && 'border-[1px] border-[#333] rounded-lg'} hover:border-[1px] hover:border-[#333] hover:rounded-lg`}>

                        {
                            option[0] === SPACINGINSIDE?(
                                <i className="bi bi-basket3"/>
                            ):(
                                <i className="bi bi-box-arrow-left"/>
                            )
                        }


                        <p className="">{option[0]}</p>
                    </div>
                ) )
            }
        </div>
        </div>

        <div className="flex flex-col gap-5">
            {

            (editingOptions[EditOpt][0] !== BORDERCOLOR || editingOptions[EditOpt][0] !== ROUNDING || editingOptions[EditOpt][0] !== BORDERSTYLE)&&


            (<div className="flex gap-2">
                <input onChange={startEditing} type="number" className={inputStyle}  />
                <select onChange={setUnit} className="w-[40%] bg-[#ccc] rounded-sm p-2">
                    {
                        units.map(
                            (unit,ind)=>(
                                <option key={ind} value={unit} className="bg-[#ccc] rounded-sm p-2">{unit}</option>
                            )
                        )
                    }
                </select>
            </div>)}

            {

            (editingOptions[EditOpt][0] !== BORDERCOLOR || editingOptions[EditOpt][0] !== ROUNDING || editingOptions[EditOpt][0] !== BORDERSTYLE)?

            (<select onChange={initEditing} className={selectStyle}>
                <option className={selectOptStyle}>-- Select {convertLcarmelToCapital(editingOptions[EditOpt][0])} position --</option>
                {
                    editingOptions[EditOpt][1]?.map((opt,ind)=>(
                        <option key={ind} value={opt} className={selectOptStyle}>{opt}</option>
                    ))
                }
            </select>):



            (editingOptions[EditOpt][0] === BORDERCOLOR || editingOptions[EditOpt][0] === BORDERSTYLE)?

            (<select onChange={(e)=>initEditing(e,editingOptions[EditOpt][0])} className={selectStyle}>
                <option className={selectOptStyle}>-- Select {convertLcarmelToCapital(editingOptions[EditOpt][0])}  --</option>
                {
                    editingOptions[EditOpt][1]?.map((opt,ind)=>(
                        <option key={ind} value={opt[1]} className={selectOptStyle}>{opt[0]}</option>
                    ))

            
                }
            </select>):



            (<select onChange={(e)=>initEditing(e,editingOptions[EditOpt][0])} className={selectStyle}>
            <option className={selectOptStyle}>-- Select {convertLcarmelToCapital(editingOptions[EditOpt][0])} position --</option>
            {
                editingOptions[EditOpt][1]?.map((opt,ind)=>(
                    <option key={ind} value={opt} className={selectOptStyle}>{opt}</option>
                ))

        
            }
        </select>)
            
            }

            {contents[currentlyEditing]?.name === HYPERLINK && <div className="flex flex-col gap-2">
                 <input onChange={(e)=>changeProperty('href',e.target.value)} type="text" placeholder='Enter link address here' className={inputStyle} />
                 <Link href={contents[currentlyEditing]?.href} className='text-blue underline '>Visit Link</Link>
            </div>}
            

            {
                contents[currentlyEditing]?.name === IMAGE && (
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold">Image Options</h1>
                        <div className="grid grid-cols-3 col-gap-2 row-gap-10 ">
                                {
                                    ImageOptions?.map(
                                        (opt,ind)=>(
                                            <div key={ind} onClick={()=>setImgOpt(opt)} className=" flex flex-col items-center cursor-pointer hover:border-[1px] hover:border-[#333] hover:rounded-lg">
                                                {
                                                    opt === SOURCE?(
                                                        <i className="bi bi-file-earmark-binary-fill"></i>
                                                    ):(
                                                        opt === WIDTH?(
                                                            <i className="bi bi-border-width"></i>
                                                        ):
                                                        opt === HEIGHT?(
                                                            <i className="bi bi-filetype-heic"></i>
                                                        ):
                                                        <i className="bi bi-badge-cc-fill"></i>
                                                    )
                                                }

                                                <p className="">{opt}</p>
                                            </div>
                                        )
                                    )
                                }
                        </div>

                        {
                            (imgOpt === WIDTH || imgOpt === HEIGHT) ? (
                                
                                    <input onChange={(e)=>changeProperty(imgOpt,parseInt(e.target.value))} type="number" className={inputStyle} />
                                
                            ):

                            (imgOpt === CAPTION) ? (
                            
                                    <input onChange={(e)=>changeProperty(imgOpt,e.target.value)} type="text" className={inputStyle} />
                            
                            ):

                            (imgOpt === SOURCE) && (
                                <UploadBox name='source' accept='image' shrink={true} setAsset={changeProperty}/>
                            )
                            
                        }
                    </div>
                )
            }

        </div>
    </div>

    </div>
    </div>
  )
}

export default Editor
