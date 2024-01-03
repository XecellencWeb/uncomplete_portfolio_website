'use client'
import CreateForm from '@components/CreateForm'
import UploadBox from '@components/UploadBox'
import { useSiteContent } from '@context/siteContent'
import { isempty } from '@vanilla/objects_methods/isempty'
import { postData } from '@vanilla/requests/post'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { technologies as suggestTool } from '@vanilla/storage/suggestions'
import { ictTechSkills } from '@vanilla/storage/ictsuggestions'
import ToggleBox from '@components/ToggleBox'

function page() {
  const {content:data, setContent:setData} = useSiteContent()
  const skill = [createRef(),createRef()]
  const [skillArray,setSkillArray] = useState(data?.skills || [])
  const [toolsArr, setToolsArr] = useState(data?.tools || [])
  const [skillToEdit, setSkillToEdit] = useState(null)
  const [skilladded, setSkilladded] = useState(false)
  const [assetsL, setAssetL] = useState(data?.assets || [])

  const assetOpt = [{
    name:'logo',
    dispName:'Change Site Logo',
    value:''
  },
  {
    name:'coverPics',
    dispName:'Change Site Cover Picture',
    value:''
  },
  {
    name:'assets',
    dispName:'Add Assets to your Site',
    value:[]
  }
]

const [selectIndex,setSelectedIndex] = useState(0)

  const [rawdata,setRawdata] = useState({
    resume:data?.resume || '',
    logo: data?.logo || '',
    coverPics:data?.coverPics || '',
    bio: data?.bio || '',
    about:data?.about || '',
    assets:data?.assets || [],
    skills:data?.skills || [],
    tools:data?.tools || [],
    available:data?.available || true
  })


  const defineData = (property,value)=>{
      setRawdata(prev => ({...prev,[property]:value}))
  }
  
  const addToALib = (property,value)=>{
        setAssetL(prev => [...prev,value])
        defineData(property,[...assetsL,value])
  }



  useEffect(()=>{
    const storeFunction = async()=>{
        if(isempty(rawdata)) return
        const data = await postData('/api/sitecontent/post',rawdata)
        setData(data)
    }
    storeFunction()
  },[rawdata])

  const submitSkill = ()=>{
    if(!skill[0].current.value || !skill[1].current.value)return
    const newValue = {
      name:skill[0].current.value,
      desc:skill[1].current.value
    }
    if(!skillToEdit){
    setSkillArray(prev => [...prev,newValue])

    defineData('skills',[...skillArray,newValue])
  }

    const newSkill = skillArray.map((skill,index)=>{
      if(index === skillToEdit){
        return newValue
      }
      return skill
    })

    setSkillArray(newSkill)
    defineData(newSkill)
    
    skill[0].current.value = ''
    skill[1].current.value = ''
    
    setSkilladded(false)
    setSkillToEdit(null)
    
  }



  const addTool = (e)=>{
    console.log(e)
    if(e.key !== 'Enter')return
    setToolsArr(prev => [...prev,e.target.value])
    defineData('tools',[...toolsArr,e.target.value])
  }


  const removeSchema = (index,{name,value,callback})=>{
      const newData = value.filter((_,i)=> i !== index)
      callback(newData)
      defineData(name,newData)
  }

  const defineStaticInfo = (e,name)=>{
    if(!e.target.value)return
    defineData(name,e.target.value)
  }


  return (
    <>
    <section className='flex flex-col gap-5 relative'>
        <UploadBox className='my-10' name='resume' setAsset={defineData} dragText='Drag Resume pdf file here to upload' accept='pdf' />
    <textarea defaultValue={data?.bio} onBlur={(e)=>defineStaticInfo(e,'bio')} placeholder='Enter Bio information.......' className='p-8 rounded-lg form_text max-w-full w_sm  resize-none'/>
    <textarea defaultValue={data?.about} onBlur={(e)=>defineStaticInfo(e,'about')} placeholder='Enter About you.......' className="p-8 rounded-lg form_text max-w-full w_sm h-40 resize-none"/>
  
        <div className="w-full mt-10 p-4 overflow-x-hidden grid sm:grid-cols-2 gap-2 md:grid-cols-3">
          {skillArray?.map((skill,index)=>
           <div onClick={()=>{
            setSkillToEdit(index)
            setSkilladded(true)
            }}
             className=" rounded-lg bg-gray-500 p-8 mb-2 relative" key={index}>
                <h3 className="text_1 font-black">{skill.name}</h3>
                <p className="text_1 mt-2">{skill.desc}</p>
                <button onClick={()=>removeSchema(index,{
                  name:'skills',
                  value:skillArray,
                  callback:setSkillArray
                })} className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full flex justify-center items-center h-6 w-6 text_1 bg-slate-100  border-2' ><span className='text-gray-700'>x</span></button>
            </div>
          )}
        </div>
        {
          skilladded?
          <div className='flex flex-col w-full'>
            <input ref={skill[0]} defaultValue={skillArray[skillToEdit]?.name}  list='skills' placeholder='Enter name of Skill here.....' className="w_sm rounded-lg p-4"/>
            <datalist id='skills'>
              {ictTechSkills.map((option,index)=>
                <option key={index} value={option}/>            
              )}
            </datalist>
            <textarea ref={skill[1]} defaultValue={skillArray[skillToEdit]?.desc}  placeholder='Enter the description of Skill here' className="w_sm rounded-lg resize-none my-2 p-2 h-40"/>
            <button onClick={submitSkill} className="h_accent items-end mt-2 w-fit">Submit</button>
          </div>
          :
          <button onClick={()=>setSkilladded(true)} className='h_accent w-fit'>Add Skill</button>
          }
        <div className="flex flex-col rounded-lg p-4 border-2 border-solid w_sm">
          <div className="">
              {
                toolsArr?.map((tool,index)=><div key={index} className='inline-block w-fit px-2 py-1 rounded-sm bg_primary mr-2 mb-2 relative'>
                  <span>{tool}</span>
                <button onClick={()=>removeSchema(index,{
                  name:'tools',
                  value:toolsArr,
                  callback:setToolsArr
                })} className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-full flex justify-center items-center h-6 w-6 text_1 bg-slate-100  border-2' ><span className='text-gray-700'>x</span></button>
                </div>)
              }
          </div>
              <input onKeyDown={addTool} placeholder='Enter one of your professional tools.......'  list='tools' className="" style={{
                appearance:'none',
                MozAppearance: 'none',
                padding:'.5rem',
                background: 'transparent',
                outline:'none'
              }} />
              <datalist id='tools'>
                  {suggestTool?.map((tool,index)=><option key={index} value={tool}/>)}
              </datalist>
        </div>
        
        <select onChange={(e)=>setSelectedIndex(parseInt(e.target.value))} className="w_sm rounded-lg p-4 mt-10">
          {
            assetOpt.map((opt,index)=>(
              <option key={index} value={index} className="">{opt.dispName}</option>
            ))
          }
        </select>
        <UploadBox className='my-2' name={assetOpt[selectIndex].name} setAsset={assetOpt[selectIndex].name === 'assets'?addToALib:defineData}/>
        <div className="flex gap-2 absolute top-2 right-0">
          <p className="opacity-50">Toggle Available Now</p>
        <ToggleBox boolean={rawdata.available} onChange={()=>defineData('available',!rawdata.available)}/>

        </div>
    </section>
    </>
  )
}

export default page
