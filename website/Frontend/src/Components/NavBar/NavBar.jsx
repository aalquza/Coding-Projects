import React, { useState, useEffect } from 'react';
 import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
 import NavButton from './NavButton';
 import NavBarIcon from './NavBarIcon';
 import ScrollIcon from './ScrollIcon';
 import { twMerge } from 'tailwind-merge';
 import myImage from './../../assets/AA.png';
 
 export default function NavBar({ className, onHomeClick, onSkillsClick, onAskClick, onContactClick }) {
   const [isOpen, setIsOpen] = useState(false);
   const { scrollY } = useViewportScroll();
   const [visible, setVisible] = useState(true);
 
   useEffect(() => {
     return scrollY.onChange((latest) => {
       setVisible(latest <= 0 || latest < scrollY.getPrevious());
     });
   }, [scrollY]);
 
   const handleDragEnd = (event, info) => {
     if (info.offset.y < -200) {
       setIsOpen(false);
     }
   };
 
   const handleNavLinkClick = (clickFunction) => {
     setIsOpen(false);
     clickFunction();
   };
 
   const navbarVariants = {
     visible: { opacity: 1, y: 0 },
     hidden: { opacity: 0, y: "-100%" },
   };
 
   return (
     <div className={twMerge("flex flex-col", className)}>
       <motion.div
            className={twMerge(
                "flex gap-[4vw] relative items-center justify-between p-[3vh] bg-blue/90 transition-transform duration-300 max-h-[10vh]",
                isOpen || visible ? "translate-y-0" : "-translate-y-full"
            )}
            variants={navbarVariants}
            animate={isOpen ? "visible" : visible ? "visible" : "hidden"} // Ensures navbar stays visible when menu is open
            transition={{ duration: 0.3 }}
            >
            <div className="flex items-center">
                <img src={myImage} className="h-[5vw]" alt="Logo" />
                <div className="font-poppins font-medium text-tan sm:text-[2rem] md:text-[1.5rem] lg:text-[2rem] -tracking-[.01em]">
                AHMAD ALQUZA
                </div>
            </div>
            <NavBarIcon
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                className="z-50"
            />
        </motion.div>

 
       <AnimatePresence>
         {isOpen && (
           <motion.div
             key="navbar"
             initial={{ y: "-100%" }}
             animate={{ y: 0 }}
             exit={{ y: "-100%" }}
             transition={{ duration: 0.3 }}
             className="flex flex-col h-[90vh] items-center justify-center p-5 bg-blue/90 z-40" // Added z-40
             drag="y"
             dragConstraints={{ top: 0, bottom: 0 }}
             dragElastic={0.5}
             onDragEnd={handleDragEnd}
           >
            <div className ="flex flex-col gap-[3vh] -mt-[10vh]">
             <NavButton onClick={() => handleNavLinkClick(onHomeClick)} className="text-red-orange active:ring-red-orange! hover:bg-red-orange">Home</NavButton>
             <NavButton onClick={() => handleNavLinkClick(onSkillsClick)}>Skills</NavButton>
             <NavButton onClick={() => handleNavLinkClick(onAskClick)}>Ask Me</NavButton>
             <NavButton onClick={() => handleNavLinkClick(onContactClick)}>Contact Me</NavButton>
             </div>  
             <ScrollIcon className="fixed bottom-0" onClick={() => setIsOpen(!isOpen)} />
            
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   );
 }