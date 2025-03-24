import React from 'react'
import Icon from './Icon'

export default function IconFrame({children,...props}) {
  return (

    <div className = "transition-all hover:scale-150 hover:mx-20 inline-flex origin-center gap-2 items-center bg-transparent p-3 border-red-orange border-3 lg:border-5 rounded-4xl h-[12vh]">
      <Icon name = {String(children)}/>
      <div className = "text-tan font-poppins font-semibold text-[1.5rem] md:text-[2rem]">{children}</div>
    </div>

  )
}
