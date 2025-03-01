import React from 'react'
import icons from '../../utils/iconLoader'

export default function Icon({name,...props}) {
  const iconSrc = icons[name]
  
  if (!iconSrc) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <div className = "flex h-full aspect-square bg-tan items-center justify-center rounded-full">
        <img src = {iconSrc} className="object-contain w-full h-full p-[15%]" {...props}/>
    </div>
  )
}
