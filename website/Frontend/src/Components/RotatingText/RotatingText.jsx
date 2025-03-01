import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const texts = ["Where are you working right now?", "Where did you graduate college?", "What do you do for fun?"];
const waitTime = 8;

export default function RotatingText() {
  const [index, setIndex] = useState(0);
  const isFirstRender = useRef(true);
  const intervalRef = useRef(null); 

  useEffect(() => {
    if (isFirstRender.current) {
      const timeout = setTimeout(() => {
        isFirstRender.current = false;
        intervalRef.current = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 4000);
      }, waitTime * 1000); 

      
      return () => {
        clearTimeout(timeout); 
        clearInterval(intervalRef.current);
      };
    }
  }, []);

  return (
    <div className="flex justify-center items-center md:text-[2rem] font-semibold font-poppins text-tan text-center min-h-[2.5rem]">
      <AnimatePresence mode="wait">
        <motion.div
          key={texts[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: isFirstRender.current ? waitTime : 0 },
          }}
          exit={{ opacity: 0, y: -10, transition: { duration: 1 } }}
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
