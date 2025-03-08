import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function ScrollIcon({className,onClick,...props}) {
  return (
    <div className ={twMerge("flex flex-col gap-2 hover:bg-white/10 rounded-2xl active:bg-white/15 p-5 pt-10 gap-7 cursor-pointer scale-50 sm:scale-75 md:scale-100",className)} onClick = {onClick}>
        <div className = "flex center-items justify-center -space-x-5"> 
          <div className = "bg-tan flex h-2 w-12 rounded-full items-center justify-center -rotate-45"></div>
          <div className = "bg-tan flex h-2 w-12 rounded-full items-center justify-center rotate-45"></div>
        </div>
        <div className = "bg-tan h-2 w-20 rounded-full"></div>
        {/* <div className = "bg-tan h-2 w-20 rounded-full"></div> */}
    </div>
  )
}
