

export const deleteData = async(url,reloader)=>{
  const request = await fetch(url,{
    method:'DELETE'
  })

  if(!request.status){
    throw new Error('An error occured')
  }

  const response = await request.json()

  return response
}