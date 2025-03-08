import React, { useState, useEffect } from 'react';
import MenuOptions from './MenuOptions';
import myImage from './../../assets/AA.png';
import { twMerge } from 'tailwind-merge';
import { motion, useViewportScroll } from 'framer-motion';

export default function HeaderBar({ className, onAboutClick, onSkillsClick, onProjectsClick, onContactClick, children }) {
  const { scrollY } = useViewportScroll();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setVisible(latest <= 0 || latest < scrollY.getPrevious()); // Show at top or on scroll up
    });
  }, [scrollY]);

  const headerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "-100%" }, // Slide up
  };

  return (
    <motion.div
      className={twMerge(
        "fixed top-0 left-0 w-full z-50",
        "flex gap-[3vw] relative items-center justify-between p-5 bg-blue/90",
        className
      )}
      variants={headerVariants}
      animate={visible ? "visible" : "hidden"}
      transition={{ duration: 0.3 }} // Adjust duration as needed
    >
      <div className="flex items-center bg-transparent">
        <img src={myImage} className="h-[5vw]" alt="Logo" />
        <div className="font-poppins font-medium text-tan sm:text-[2vw] md:text-[3vw] lg:text-[2vw] -tracking-[.01em]">
          AHMAD ALQUZA
        </div>
      </div>
      <MenuOptions
        onAboutClick={onAboutClick}
        onSkillsClick={onSkillsClick}
        onProjectsClick={onProjectsClick}
        onContactClick={onContactClick}
      />
    </motion.div>
  );
}
