// import React from 'react'
// import {motion} from 'framer-motion';
// import UserPrompt from '../Components/UserPrompt/UserPrompt';

// const ContactMe = React.forwardRef((props, ref) => {
//     const quoteMotion = {
//     initial:{opacity:0,y:"50%"},
//     animate:{opacity:1,y:0, 
//       transition:{duration:1, stiffness:10},
//     },
//   }
//   const promptMotion = {
//     initial:{opacity:0,y:"20%"},
//     animate:{opacity:1,y:0, 
//       transition:{delay:1.5, duration:1, stiffness:10},
//     },
//   }
//   return (
//     <div ref={ref} className = "flex flex-col w-screen min-h-screen justify-center items-center p-4 pt-[12vh] md:p-10 gap-8 md:gap-16 border-5 z-1">
//       <motion.div variants = {quoteMotion} initial = "initial" animate = "animate" className ="font-poppins text-tan border-red-orange border-5 rounded-4xl self-center px-5 md:px-10 py-5 md:text-[2rem]"> 
//         <span>"</span>
//         <span className = "font-semibold">In </span> 
//         <span>the middle of </span>
//         <span className = "font-semibold">every difficulty </span> 
//         <span>lies </span>
//         <span className = "font-semibold">oportunity</span>
//         <span>."</span>
//         <div className = "text-[.66rem] md:text-[1.5rem]">- Albert Einstein</div>
//       </motion.div>
//       <motion.div variants = {promptMotion} initial = "initial" animate = "animate" className = "flex flex-col items-center gap-10 w-[80vw]"> 
//         <div className = "font-poppins text-tan text-[2rem] md:text-[4rem] font-semibold">Contact Me
//         </div>
//         {/*user prompts*/}
//         <div className = "flex w-full flex-col gap-5 items-center">
//           {/*firstname and lastName*/}
//           <div className = "flex flex-col md:flex-row gap-5 md:gap-15 w-full max-w-300"> 
//               <div className = "flex flex-col gap-1 w-full">
//                   <div className = "font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-3" >First Name
//                   </div>
//                   <UserPrompt className = "border-1">User Prompt...</UserPrompt>
//               </div>
//               <div className = "flex flex-col w-full gap-1">
//                   <div className = "font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-3">Last Name
//                   </div>
//                   <UserPrompt className = "border-1">User Prompt...</UserPrompt>
//               </div>
//           </div>
//           {/*email*/}
//           <div className = "flex flex-col gap-1 w-full max-w-300">
//               <div className = "font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-3">Email or Phone Number
//               </div>
//               <UserPrompt className = "border-1">User Prompt...</UserPrompt>
//           </div>
//           {/*what can I help with*/}
//           <div className = "flex flex-col gap-1 w-full max-w-300">
//               <div className = "font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-3">What can I help you with?
//               </div>
//               <UserPrompt showIcon={true} className = "h-[20vh] rounded-4xl flex-row border-1">User Prompt...</UserPrompt>
//           </div>
//         </div>
//       </motion.div>
      
//     </div>
//   )
// });
// export default ContactMe;
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import UserPrompt from '../Components/UserPrompt/UserPrompt';

const ContactMe = React.forwardRef((props, ref) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');

    const quoteMotion = {
        initial: { opacity: 0, y: "50%" },
        animate: { opacity: 1, y: 0, transition: { duration: 1, stiffness: 10 } },
    };
    const promptMotion = {
        initial: { opacity: 0, y: "20%" },
        animate: { opacity: 1, y: 0, transition: { delay: 1.5, duration: 1, stiffness: 10 } },
    };

    const handleSubmit = async (e) => {
        if(e.target.parentElement.parentElement.children[0].placeholder !== "What can I help you with?"){
            return;
        }
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, question }),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                setFirstName('');
                setLastName('');
                setEmail('');
                setQuestion('');
            } else {
                alert('Form submission failed.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while submitting the form.');
        }
    };

    return (
        <div ref={ref} className="flex flex-col w-screen min-h-screen justify-center items-center p-4 pt-[12vh] md:p-10 gap-8 md:gap-16 border-5 z-1">
            <motion.div variants={promptMotion} initial="initial" animate="animate" className="flex flex-col items-center gap-10 w-[80vw]">
                <div className="font-poppins text-tan text-[2rem] md:text-[4rem] font-semibold">Contact Me</div>
                <form onSubmit={(e)=>e.preventDefault()} className="flex w-full flex-col gap-5 items-center">
                    <div className="flex flex-col md:flex-row gap-5 md:gap-15 w-full max-w-300">
                        <div className="flex flex-col gap-1 w-full">
                            <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-3">First Name</div>
                            <UserPrompt value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border-1">{firstName}</UserPrompt>
                        </div>
                        <div className="flex flex-col w-full gap-1">
                            <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-3">Last Name</div>
                            <UserPrompt value={lastName} onChange={(e) => setLastName(e.target.value)} className="border-1">{lastName}</UserPrompt>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 w-full max-w-300">
                        <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-3">Email or Phone Number</div>
                        <UserPrompt value={email} onChange={(e) => setEmail(e.target.value)} className="border-1">{email}</UserPrompt>
                    </div>
                    <div className="flex flex-col gap-1 w-full max-w-300">
                        <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-3">What can I help you with?</div>
                        <UserPrompt value={question} onChange={(e) => setQuestion(e.target.value)} showIcon={true} className="h-[20vh] rounded-4xl flex-row border-1" onSubmit={handleSubmit}>{question}</UserPrompt>
                    </div>
                </form>
            </motion.div>
        </div>
    );
});

export default ContactMe;