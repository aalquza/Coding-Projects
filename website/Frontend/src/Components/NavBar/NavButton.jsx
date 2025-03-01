import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function NavButton({className, children, onClick}) {
  return (
    <button className ={twMerge(" bg-transparent border-none w-[80vw]  p-2 cursor-pointer font-poppins font-medium text-tan text-[2rem] sm:text-[2rem] md:text-[2rem] tracking-[.1em] rounded-3xl antialiased hover:bg-orange/80 hover:text-white active:text-white active:bg-tan/40 active:ring-red-orange active:ring-3 active:ring-inset",className)} onClick = {onClick} >
      {children}
    </button>
  )
}
