import React from 'react'

function CreateForm({options}) {

    
  return <form onSubmit={options?.onsubmit} className={options?.className}>
    {
        options?.content.map(item => item.name==='tarea' && <textarea className={item.className}>It works</textarea>)
    }
  </form>
}

export default CreateForm
