import React, { Children } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Button ({className, children, onClick}) {
  return (
    <button className ={twMerge("w-[15vw] h-auto bg-transparent border-none py-1 cursor-pointer font-poppins font-medium text-tan sm:text-[2vw] md:text-[2vw] lg:text-[1rem] xl:text-[1.25rem] lg:py-3 tracking-[.2em] rounded-3xl antialiased hover:bg-orange hover:text-white active:bg-tan/30 active:ring-orange active:ring-3 active:ring-inset",className)} onClick = {onClick} >
      {children}
    </button>
  );
}

