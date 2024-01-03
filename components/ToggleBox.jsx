import React from 'react'

function ToggleBox({boolean,className,onChange}) {
  return (
    <div className={className}>
    <input onChange={onChange} id='toggler' defaultChecked={boolean} type="checkbox" className='toggle_controller' />
    <label htmlFor='toggler' className="toggle_container">
        <div className="toggle_indicator"></div>
    </label>
    </div>
  )
}

export default ToggleBox
