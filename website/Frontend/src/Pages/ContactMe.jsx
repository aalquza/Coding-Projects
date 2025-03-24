// import React, { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import UserPrompt from '../Components/UserPrompt/UserPrompt';
// import { formSubmit, formValidate } from '../utils/formHandlers';

// const ContactMe = React.forwardRef((props, ref) => {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [question, setQuestion] = useState('');
//     const [errors, setErrors] = useState({});
//     const [hasAnimated, setHasAnimated] = useState(false);
//     const sectionRef = useRef(null);

//     const promptMotion = {
//         initial: { opacity: 0, y: "20%" },
//         animate: { opacity: 1, y: 0, transition: { duration: 1, stiffness: 10 } },
//     };

//     const handleSubmit = async (e) => {
//         if (e) e.preventDefault();
//         const formData = { firstName, lastName, email, question };
//         const formErrors = formValidate(formData);
//         setErrors(formErrors);

//         if (Object.keys(formErrors).length === 0) {
//             const response = await formSubmit(formData, () => {
//                 setFirstName('');
//                 setLastName('');
//                 setEmail('');
//                 setQuestion('');
//             });
//             setErrors(response);
//         }
//     };

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting && !hasAnimated) {
//                     setHasAnimated(true);
//                     observer.disconnect();
//                 }
//             },
//             { threshold: 0.1 }
//         );

//         if (sectionRef.current) {
//             observer.observe(sectionRef.current);
//         }

//         return () => {
//             if (sectionRef.current) {
//                 observer.unobserve(sectionRef.current);
//             }
//         };
//     }, [hasAnimated]);

//     return (
//         <div ref={ref} className = "z-1">
//             <div ref={sectionRef} className="flex flex-col w-screen min-h-screen justify-center items-center p-4 pt-[12vh] md:p-10 gap-8 md:gap-16">
//                 <motion.div
//                     variants={promptMotion}
//                     initial="initial"
//                     animate={hasAnimated ? "animate" : "initial"}
//                     className="flex flex-col items-center gap-10 w-[80vw]"
//                 >
//                     <div className="font-poppins text-tan text-[2rem] md:text-[4rem] font-semibold">Contact Me</div>
//                     <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center w-screen px-3 md:w-full">
//                         <div className="flex flex-col md:flex-row gap-5 md:gap-15 w-full max-w-300">
//                             <div className="flex flex-col gap-1 w-full">
//                                 <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-4">First Name</div>
//                                 <UserPrompt value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border-1">
//                                     {'First Name'}
//                                 </UserPrompt>
//                                 {errors.firstName && <div className="text-red">{errors.firstName}</div>}
//                             </div>
//                             <div className="flex flex-col w-full gap-1">
//                                 <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-4">Last Name</div>
//                                 <UserPrompt value={lastName} onChange={(e) => setLastName(e.target.value)} className="border-1">
//                                     {'Last Name'}
//                                 </UserPrompt>
//                                 {errors.lastName && <div className="text-red">{errors.lastName}</div>}
//                             </div>
//                         </div>
//                         <div className="flex flex-col gap-1 w-full max-w-300">
//                             <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-4">Email or Phone Number</div>
//                             <UserPrompt value={email} onChange={(e) => setEmail(e.target.value)} className="border-1">
//                                 {'Email or Phone Number'}
//                             </UserPrompt>
//                             {errors.email && <div className="text-red">{errors.email}</div>}
//                         </div>
//                         <div className="flex flex-col gap-1 w-full max-w-300">
//                             <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-4">What can I help you with?</div>
//                             <UserPrompt
//                                 value={question}
//                                 onChange={(e) => setQuestion(e.target.value)}
//                                 showIcon={true}
//                                 className="h-[20vh] flex-row border-1 p-5"
//                                 onSubmit={handleSubmit}
//                             >
//                                 {'What can I help you with?'}
//                             </UserPrompt>
//                             {errors.question && <div className="text-red">{errors.question}</div>}
//                         </div>
//                         {errors.server && <div className="text-red">{errors.server}</div>}
//                     </form>
//                 </motion.div>
//             </div>
//         </div>
//     );
// });

// export default ContactMe;
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import UserPrompt from '../Components/UserPrompt/UserPrompt';
import { formSubmit, formValidate } from '../utils/formHandlers';

const ContactMe = React.forwardRef((props, ref) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    const promptMotion = {
        initial: { opacity: 0, y: "20%" },
        animate: { opacity: 1, y: 0, transition: { duration: 1, stiffness: 10 } },
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setSuccessMessage(''); // Clear previous success messages

        const formData = { firstName, lastName, email, question };
        const formErrors = formValidate(formData);
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            const response = await formSubmit(formData, () => {
                setFirstName('');
                setLastName('');
                setEmail('');
                setQuestion('');
                setSuccessMessage('Thank you! Your message has been sent successfully.');
            });

            setErrors(response);
        }
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
        <div ref={ref} className="z-1">
            <div ref={sectionRef} className="flex flex-col w-screen min-h-screen justify-center items-center p-4 pt-[12vh] md:p-10 gap-8 md:gap-16">
                <motion.div
                    variants={promptMotion}
                    initial="initial"
                    animate={hasAnimated ? "animate" : "initial"}
                    className="flex flex-col items-center gap-10 w-[80vw]"
                >
                    <div className="font-poppins text-tan text-[2rem] md:text-[4rem] font-semibold">Contact Me</div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center w-screen px-3 sm:w-full">
                        <div className="flex flex-col md:flex-row gap-5 md:gap-15 w-full max-w-300">
                            <div className="flex flex-col gap-1 w-full">
                                <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-4">First Name</div>
                                <UserPrompt value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border-1">
                                    {'First Name'}
                                </UserPrompt>
                                {errors.firstName && <div className="text-red">{errors.firstName}</div>}
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-4">Last Name</div>
                                <UserPrompt value={lastName} onChange={(e) => setLastName(e.target.value)} className="border-1">
                                    {'Last Name'}
                                </UserPrompt>
                                {errors.lastName && <div className="text-red">{errors.lastName}</div>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full max-w-300">
                            <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-4">Email</div>
                            <UserPrompt value={email} onChange={(e) => setEmail(e.target.value)} className="border-1">
                                {'Email or Phone Number'}
                            </UserPrompt>
                            {errors.email && <div className="text-red">{errors.email}</div>}
                        </div>
                        <div className="flex flex-col gap-1 w-full max-w-300">
                            <div className="font-poppins text-tan text-[1rem] md:text-[1.5rem] font-semibold translate-x-4">What can I help you with?</div>
                            <UserPrompt
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                showIcon={true}
                                className="h-[20vh] flex-row border-1 p-5"
                                onSubmit={handleSubmit}
                            >
                                {'What can I help you with?'}
                            </UserPrompt>
                            {errors.question && <div className="text-red font-poppins">{errors.question}</div>}
                        </div>
                        {errors.server && <div className="text-red font-poppins">{errors.server}</div>}

                        {/* SUCCESS MESSAGE */}
                        {successMessage && <div className="text-teal-700 text-poppins font-poppins">{successMessage}</div>}
                    </form>
                </motion.div>
            </div>
        </div>
    );
});

export default ContactMe;
