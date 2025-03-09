import React from 'react';
import myImage from './../assets/Profile.png';
import {motion} from 'framer-motion';

const AboutMe = React.forwardRef((props, ref) => {
    const TitleMotion = {
        initial:{opacity:0, x:"-100vw"},
        animate:{opacity:1, x:0, transition:{duration:1, stiffness:10},},
        
    }
    const ProfileMotion = {
        initial:{opacity:0, x:"100vw"},
        animate:{opacity:1, x:0, transition:{ duration:1, stiffness:10},},
    }
  return (
    <div ref={ref} className="flex flex-col items-center justify-center h-auto w-full px-4 py-8 pt-[6vh] sm:px-6 md:px-10 lg:flex-row lg:min-h-screen lg:px-16 md:gap-2">
        {/*Entire Text Section*/}
      <motion.div variants = {TitleMotion} initial = "initial" animate = "animate" className="flex flex-col items-center text-center lg:items-start lg:text-left lg:z-1">
            {/*Hey, I'm Ahmad Section*/}
        <div className="flex flex-wrap flex-row items-baseline justify-center lg:justify-start lg:flex-nowrap">
          <div className="font-poppins font-bold text-red-orange text-[2rem] sm:text-[3rem] md:text-[3rem] lg:text-[3rem] xl:text-[4rem] tracking-[-.02rem]">
            Hey,&nbsp;
          </div>
          <div className="font-poppins font-bold text-tan text-[3rem] sm:text-[4rem] md:text-[4rem] lg:text-[5rem] xl:text-[7rem] tracking-[-.04rem] lg:whitespace-nowrap">
            <span>I'm A</span>
            <span className="tracking-[0rem]">H</span>
            <span>MAD</span>
          </div>
        </div>
            {/*Engineer/coder/sales rep Section*/}
        <div className="font-poppins text-red-orange text-[1rem] sm:text-[1.5rem] md:text-[1.5rem] lg:text-[1.5rem] xl:text-[2rem] tracking-[.02rem] ">
          Engineer | Coder | Sales Rep.
        </div>
      </motion.div>
      <motion.img
        variants = {ProfileMotion} initial = "initial" animate = "animate"
        src={myImage}
        className="w-[80vw] sm:w-[25rem] md:w-[30rem] lg:w-[40rem] max-h-[70vh] lg:max-h-[60vh] xl:max-h-[80vh] h-auto object-contain lg:mt-[5rem] lg:-ml-[4rem] xl:-ml-[4rem]"
        alt="Profile"
      />
    </div>
  );
});
export default AboutMe;