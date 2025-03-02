import React, { useRef } from 'react';
import AboutMe from './AboutMe';
import Skills from './Skills';
import Projects from './Projects';
import ContactMe from './ContactMe';
import RotatingPicture from '../Components/RotatingPicture/RotatingPicture';
import HeaderBar from '../Components/HeaderBar/HeaderBar';
import NavBar from '../Components/NavBar/NavBar';

export default function FinalPage() {
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className="flex relative flex-col bg-gradient-to-b from-blue to-black gap-20 md:gap-30 h-auto w-screen overflow-hidden py-10">
                <HeaderBar
                    onAboutClick={() => scrollToSection(aboutRef)}
                    onSkillsClick={() => scrollToSection(skillsRef)}
                    onProjectsClick={() => scrollToSection(projectsRef)}
                    onContactClick={() => scrollToSection(contactRef)}
                    className="fixed top-0 left-0 w-full z-50 hidden lg:flex"
                />
                <NavBar
                    onAboutClick={() => scrollToSection(aboutRef)}
                    onSkillsClick={() => scrollToSection(skillsRef)}
                    onProjectsClick={() => scrollToSection(projectsRef)}
                    onContactClick={() => scrollToSection(contactRef)}
                    className="fixed top-0 left-0 w-full z-50 lg:hidden"
                />

                <AboutMe ref={aboutRef} /> 
                <Skills ref={skillsRef} />    
                <Projects ref={projectsRef} />  
                <ContactMe ref={contactRef} />
                <div>
                    <RotatingPicture className="absolute bottom-0" />
                </div>
            </div>
        </div>
    );
}