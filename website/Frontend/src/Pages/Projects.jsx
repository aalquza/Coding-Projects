import React from 'react'
import {motion} from 'framer-motion';
import RotatingText from '../Components/RotatingText/RotatingText';
import UserPrompt from '../Components/UserPrompt/UserPrompt';

const Projects = React.forwardRef((props, ref) =>  {
  const quoteMotion = {
    initial:{opacity:0,y:"50%"},
    animate:{opacity:1,y:0, 
      transition:{duration:1, stiffness:10},
    },
  }
  const promptMotion = {
    initial:{opacity:0,y:"20%"},
    animate:{opacity:1,y:0, 
      transition:{delay:1.5, duration:1, stiffness:10},
    },
  }
  return (
    <div ref={ref}  className = "flex flex-col w-screen items-center justify-center min-h-screen gap-[15vh] p-5 md:p-10 md:pt-[12vh] border-5 z-1">
      <motion.div variants = {quoteMotion} initial = "initial" animate = "animate" className ="font-poppins text-tan border-red-orange border-5 rounded-4xl self-center mx-5 px-5 md:px-10 py-5 text-[1rem] md:text-[2rem]"> 
        <span>"The </span>
        <span className = "font-semibold">greater </span> 
        <span>the obstacle, the </span>
        <span className = "font-semibold">more glory </span>
        <span>in overcoming it."</span>
        <div className = "text-[.66rem] md:text-[1.5rem]">- Moli&eacute;r</div>
      </motion.div>
      <motion.div variants = {promptMotion} initial = "initial" animate = "animate" className = "flex flex-col items-center gap-3"> 
        <div className = "flex flex-col items-center gap-[10vh]">
            <div className = "font-poppins text-tan text-[2rem] md:text-[4rem] font-semibold text-center">Ask Me Anything...</div>
            <UserPrompt showIcon={true} className = "max-w-200 w-[80vw]">Ask Anything... </UserPrompt>
        </div>
        <RotatingText/>
      </motion.div>
      
    </div>
  )
});

export default Projects;
