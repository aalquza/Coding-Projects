import React, { useState } from "react";
import { motion } from "framer-motion";
import {twMerge} from 'tailwind-merge'

export default function NavBarIcon({isOpen, onClick,className}) {
  return (
      <div
        className={twMerge("flex flex-col gap-3 hover:bg-white/10 rounded-2xl active:bg-white/15 p-3 cursor-pointer scale-75 sm:scale-100 md:scale-125 z-100",className)}
        onClick={onClick}
      >
        {/* Top bar */}
        <motion.div
          className="bg-tan h-1.5 w-15 rounded-full"
          animate={isOpen ? { rotate: 45, y: 17.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Middle bar */}
        <motion.div
          className="bg-tan h-1.5 w-15 rounded-full"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom bar */}
        <motion.div
          className="bg-tan h-1.5 w-15 rounded-full"
          animate={isOpen ? { rotate: -45, y: -17.5} : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
  );
}
