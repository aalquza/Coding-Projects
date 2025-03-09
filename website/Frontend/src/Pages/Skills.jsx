import React, { useRef, useEffect, useState } from 'react';
import IconSlider from '../Components/IconBar/IconSlider';
import { motion } from 'framer-motion';

const IconSliders = motion(IconSlider);

const Skills = React.forwardRef((props, ref) => {
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    const quoteMotion = {
        initial: { opacity: 0, y: "50%" },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, stiffness: 10 },
        },
    };
    const sliderMotion = {
        initial: { opacity: 0, y: "20%" },
        animate: {
            opacity: 1,
            y: 0,
            transition: { delay: 1.5, duration: 1, stiffness: 10 },
        },
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [hasAnimated]);

    return (
        <div ref={ref} className="flex flex-col w-screen min-h-screen justify-center gap-[8vh] pt-[10vh]">
            <motion.div
                ref={sectionRef} // Apply sectionRef directly to the motion.div
                variants={quoteMotion}
                initial="initial"
                animate={hasAnimated ? "animate" : "initial"}
                className="font-poppins text-tan border-red-orange border-5 rounded-4xl self-center mx-5 px-5 md:px-10 py-5 text-[1rem] md:text-[2rem]"
            >
                <span>"A&nbsp; </span>
                <span className="font-semibold">smooth sea never&nbsp;</span> 
                <span>made a&nbsp;</span>
                <span className="font-semibold">skilled sailor</span>
                <span>."</span>
                <div className="text-[.66rem] md:text-[1.5rem]">- Franklin D. Roosevelt</div>
            </motion.div>
            <IconSliders
                variants={sliderMotion}
                initial="initial"
                animate={hasAnimated ? "animate" : "initial"}
            />
        </div>
    );
});

export default Skills;