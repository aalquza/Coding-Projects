import React, { useRef } from 'react';
import Home from './Home';
import Skills from './Skills';
import AskMe from './AskMe';
import ContactMe from './ContactMe';
import RotatingPicture from '../Components/RotatingPicture/RotatingPicture';
import HeaderBar from '../Components/HeaderBar/HeaderBar';
import NavBar from '../Components/NavBar/NavBar';

export default function FinalPage() {
    const homeRef = useRef(null);
    const skillsRef = useRef(null);
    const askRef = useRef(null);
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
                    onHomeClick={() => scrollToSection(homeRef)}
                    onSkillsClick={() => scrollToSection(skillsRef)}
                    onAskClick={() => scrollToSection(askRef)}
                    onContactClick={() => scrollToSection(contactRef)}
                    className="fixed top-0 left-0 w-full z-50 hidden lg:flex"
                />
                <NavBar
                    onHomeClick={() => scrollToSection(homeRef)}
                    onSkillsClick={() => scrollToSection(skillsRef)}
                    onAskClick={() => scrollToSection(askRef)}
                    onContactClick={() => scrollToSection(contactRef)}
                    className="fixed top-0 left-0 w-full z-50 lg:hidden"
                />

                <Home ref={homeRef} /> 
                <Skills ref={skillsRef} />    
                <AskMe ref={askRef} />  
                <ContactMe ref={contactRef} />
                <div>
                    <RotatingPicture className="absolute bottom-0" />
                </div>
            </div>
        </div>
    );
}