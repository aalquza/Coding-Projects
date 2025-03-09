import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import NavButton from './NavButton';
import NavBarIcon from './NavBarIcon';
import ScrollIcon from './ScrollIcon';
import { twMerge } from 'tailwind-merge';
import myImage from './../../assets/AA.png';

export default function NavBar({ className, onAboutClick, onSkillsClick, onProjectsClick, onContactClick, onToggle }) {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const previousScroll = useRef(0);

    useEffect(() => {
        if (isOpen) {
            setVisible(true); // Always show navbar when menu is open
        } else {
            const handleScroll = () => {
                const currentScroll = window.scrollY;
                setVisible(currentScroll <= 0 || currentScroll < previousScroll.current);
                previousScroll.current = currentScroll;
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isOpen]); // Only react to isOpen changes

    const handleDragEnd = (event, info) => {
        if (info.offset.y < -200) {
            setIsOpen(false);
            onToggle(false);
        }
    };

    const handleNavLinkClick = (clickFunction) => {
        clickFunction(); // Corrected syntax
        setIsOpen(false);
        onToggle(false);
    };

    const handleToggle = () => {
        const newValue = !isOpen;
        setIsOpen(newValue);
        onToggle(newValue);
    };

    const navbarVariants = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: "-100%" },
    };

    return (
        <div className={twMerge("flex flex-col h-screen z-100", className)}>
            <motion.div
                className={twMerge(
                    "flex gap-[4vw] relative items-center justify-between min-h-20 p-[3vh] bg-blue/90 transition-transform duration-300",
                    visible ? "translate-y-0" : "-translate-y-full"
                )}
                variants={navbarVariants}
                animate={visible ? "visible" : "hidden"}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center">
                    <img src={myImage} className="h-[5vw]" alt="Logo" />
                    <div className="font-poppins font-medium text-tan sm:text-[2rem] md:text-[1.5rem] lg:text-[2rem] -tracking-[.01em]">
                        AHMAD ALQUZA
                    </div>
                </div>
            </motion.div>

            <NavBarIcon
                isOpen={isOpen}
                onClick={handleToggle}
                className="fixed top-1 right-1 md:top-3 md:right-3 lg:top-6 lg:right-6 z-50"
            />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="navbar"
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full items-center gap-[5vh] justify-center p-5 bg-blue/90 z-40"
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.5}
                        onDragEnd={handleDragEnd}
                    >
                        <NavButton onClick={() => handleNavLinkClick(onAboutClick)} className="text-red-orange active:ring-red-orange! hover:bg-red-orange">About Me</NavButton>
                        <NavButton onClick={() => handleNavLinkClick(onSkillsClick)}>Skills</NavButton>
                        <NavButton onClick={() => handleNavLinkClick(onProjectsClick)}>Projects</NavButton>
                        <NavButton onClick={() => handleNavLinkClick(onContactClick)}>Contact Me</NavButton>
                        <ScrollIcon className="fixed bottom-0" onClick={handleToggle} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}