import React, { forwardRef } from 'react'
import IconFrame from './IconFrame'

const IconBar = forwardRef(({ IconList = [] }, ref) => {
  return (
    <div ref={ref} className="flex items-center py-4 px-2 space-x-5">
      {IconList.map((iconName, index) => (
        <IconFrame key={index} children={iconName}/>
      ))}
    </div>
  )
})

export default IconBar;