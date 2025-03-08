// import React, { useState, useEffect, useRef } from 'react';

// import { motion } from 'framer-motion';

// import RotatingText from '../Components/RotatingText/RotatingText';

// import UserPrompt from '../Components/UserPrompt/UserPrompt';

// import { questionSubmit, questionValidate } from '../utils/gptHandlers';



// const Projects = React.forwardRef((props, ref) => {
//  const [question, setQuestion] = useState('');
//  const [errors, setErrors] = useState({});
//  const [conversation, setConversation] = useState([]);
//  const [firstQuestionSubmitted, setFirstQuestionSubmitted] = useState(false);


//  useEffect(() => {
//    setQuestion('');
//    setErrors({});
//    setConversation([]);
//    setFirstQuestionSubmitted(false);
//  }, []);


//  const quoteMotion = {
//    initial: { opacity: 0, y: "50%" },
//    animate: {
//     opacity: 1, y: 0,
//     transition: { duration: 1, stiffness: 10 },
//    },
//  };


//  const promptMotion = {
//    initial: { opacity: 0, y: "20%" },
//    animate: {
//     opacity: 1, y: 0,
//     transition: { delay: 1.5, duration: 1, stiffness: 10 },
//    },
//  };


//  const handleSubmit = async (e) => {
//    if (e) e.preventDefault();


//    const questionErrors = questionValidate(question);
//    setErrors(questionErrors);


//    if (Object.keys(questionErrors).length === 0) {
//     setConversation(prev => [...prev, { role: 'user', content: question }]);


//     if (!firstQuestionSubmitted) {
//       setFirstQuestionSubmitted(true);
//     }


//     const response = await questionSubmit(question, (answer) => {
//       setQuestion('');
//       setConversation(prev => [...prev, { role: 'assistant', content: answer }]);
//     });


//     setErrors(response);
//    }
//  };


//  return (
//    <div ref={ref} className="flex flex-col w-screen items-center justify-center min-h-screen gap-[15vh] p-5 md:p-10 md:pt-[12vh] z-1">
//     <motion.div variants={quoteMotion} initial="initial" animate="animate" className="font-poppins text-tan border-red-orange border-5 rounded-4xl self-center mx-5 px-5 md:px-10 py-5 text-[1rem] md:text-[2rem]">
//       <span>"The </span>
//       <span className="font-semibold">greater </span>
//       <span>the obstacle, the </span>
//       <span className="font-semibold">more glory </span>
//       <span>in overcoming it."</span>
//       <div className="text-[.66rem] md:text-[1.5rem]">- Moli&eacute;r</div>
//     </motion.div>
//     <motion.div variants={promptMotion} initial="initial" animate="animate" className="flex flex-col items-center gap-3">
//       <div className="flex flex-col items-center gap-[2vh]">
//        <div className="flex flex-col gap-2 w-[80vw] max-w-200">
//          {conversation.map((message, index) => (
//           <div key={index} className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-gray-800 text-white self-end' : 'bg-gray-700 text-tan self-start'}`}>
//             {message.role === 'assistant' ? `${message.content}` : message.content}
//           </div>
//          ))}
//        </div>
//        {!firstQuestionSubmitted && <div className="font-poppins text-tan text-[2rem] md:text-[4rem] font-semibold text-center">Ask Me Anything...</div>}
//        <UserPrompt
//          value={question}
//          onChange={(e) => setQuestion(e.target.value)}
//          showIcon={true}
//          className="max-w-200 w-[80vw]"
//          onClick={handleSubmit}
//        >
//          Ask Anything...
//        </UserPrompt>
//        {errors.question && <div className="text-red">{errors.question}</div>}
//        {errors.server && <div className="text-red">{errors.server}</div>}
//       </div>
//       <RotatingText />
//     </motion.div>
//    </div>
//  );

// });



// export default Projects;
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import RotatingText from '../Components/RotatingText/RotatingText';
import UserPrompt from '../Components/UserPrompt/UserPrompt';
import { questionSubmit, questionValidate } from '../utils/gptHandlers';

const Projects = React.forwardRef((props, ref) => {
    const [question, setQuestion] = useState('');
    const [errors, setErrors] = useState({});
    const [conversation, setConversation] = useState([]);
    const [firstQuestionSubmitted, setFirstQuestionSubmitted] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        setQuestion('');
        setErrors({});
        setConversation([]);
        setFirstQuestionSubmitted(false);
    }, []);

    const quoteMotion = {
        initial: { opacity: 0, y: "50%" },
        animate: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, stiffness: 10 },
        },
    };

    const promptMotion = {
        initial: { opacity: 0, y: "20%" },
        animate: {
            opacity: 1,
            y: 0,
            transition: { delay: 1.5, duration: 1, stiffness: 10 },
        },
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        const questionErrors = questionValidate(question);
        setErrors(questionErrors);

        if (Object.keys(questionErrors).length === 0) {
            setConversation(prev => [...prev, { role: 'user', content: question }]);

            if (!firstQuestionSubmitted) {
                setFirstQuestionSubmitted(true);
            }

            const response = await questionSubmit(question, (answer) => {
                setQuestion('');
                setConversation(prev => [...prev, { role: 'assistant', content: answer }]);
            });

            setErrors(response);
        }
    };

    const sectionRef = useRef(null);

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
        <div ref={ref} className="flex flex-col w-screen items-center justify-center min-h-screen gap-[15vh] p-5 md:p-10 md:pt-[12vh] z-1">
            <div ref={sectionRef}>
                <motion.div
                    variants={quoteMotion}
                    initial="initial"
                    animate={hasAnimated ? "animate" : "initial"}
                    className="font-poppins text-tan border-red-orange border-5 rounded-4xl self-center mx-5 px-5 md:px-10 py-5 text-[1rem] md:text-[2rem]"
                >
                    <span>"The </span>
                    <span className="font-semibold">greater </span>
                    <span>the obstacle, the </span>
                    <span className="font-semibold">more glory </span>
                    <span>in overcoming it."</span>
                    <div className="text-[.66rem] md:text-[1.5rem]">- Moli&eacute;r</div>
                </motion.div>
                <motion.div
                    variants={promptMotion}
                    initial="initial"
                    animate={hasAnimated ? "animate" : "initial"}
                    className="flex flex-col items-center gap-3"
                >
                    <div className="flex flex-col items-center gap-[2vh]">
                        <div className="flex flex-col gap-2 w-[80vw] max-w-200">
                            {conversation.map((message, index) => (
                                <div
                                    key={index}
                                    className={`p-2 rounded-lg ${
                                        message.role === 'user' ? 'bg-gray-800 text-white self-end' : 'bg-gray-700 text-tan self-start'
                                    }`}
                                >
                                    {message.role === 'assistant' ? `${message.content}` : message.content}
                                </div>
                            ))}
                        </div>
                        {!firstQuestionSubmitted && (
                            <div className="font-poppins text-tan text-[2rem] md:text-[4rem] font-semibold text-center">
                                Ask Me Anything...
                            </div>
                        )}
                        <UserPrompt
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            showIcon={true}
                            className="max-w-200 w-[80vw]"
                            onClick={handleSubmit}
                        >
                            Ask Anything...
                        </UserPrompt>
                        {errors.question && <div className="text-red">{errors.question}</div>}
                        {errors.server && <div className="text-red">{errors.server}</div>}
                    </div>
                    <RotatingText />
                </motion.div>
            </div>
        </div>
    );
});

export default Projects;