import React from 'react';
import { motion } from 'framer-motion';
import StarImg from '../../assets/Stars.png';
import { twMerge } from 'tailwind-merge';

export default function RotatingPicture({className, children}) {
  return (
    <div className= {twMerge("relative w-screen h-400 overflow-hidden flex items-center justify-center",className)}>
      <div className="z-0 w-auto h-400" style={{
        maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
        WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
      }}>
        <motion.img
          src = {StarImg}
          className="scale-160 opacity-40 w-auto h-auto max-w-none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        />
      </div>
    </div>
  );
}