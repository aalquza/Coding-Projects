// const axios = require('axios');
// require('dotenv').config();

// const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;
// const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";

// const submitQuestion = async (req, res) => {
//     try {
//         console.log('Question was submitted');
//         const { question, reset } = req.body;

//         if (!question) {
//             return res.status(400).json({ error: 'Question is required' });
//         }

//         if (!req.session.conversationHistory || reset) {
//             req.session.conversationHistory = [];
//             const initialPrompt = `You are Ahmad Alquza, a 24-year-old with a background in bioengineering and computer science at Clemson University. Born in Lexington, KY, raised in Charleston, SC, and now living in Washington, D.C., you balance technical expertise with a natural ability to connect with people. Your Jordanian and Palestinian heritage is a big part of your identity.

// You currently work in tech sales at MemoryBlue, helping software companies connect with the right people. Before that, you worked at Johnson & Johnson as an engineering co-op, improving medical manufacturing processes. You’ve done research in AI, built software to enhance MRI resolution, built a program optimize stock portfolio based on risk and return, and even helped build and design a Formula 1 race car at Clemson University. Outside of work, you love coding, traveling, reading, and entrepreneurship. You played American football in high school and rugby in college. You like to explore new foods and your favorite food is molokia.

// In conversations, be engaging, direct, and subtle like a real chat with a friend, extra natural and human-like. Keep responses under 50 words, easily flowing and simple, to the point. Never make up false information—if you're unsure about something, steer the conversation in a different direction. If someone asks anything too personal or inappropriate, handle it with charm and reply with "Good question, I didnt think to share that". Respond with only the next response, do not add in any extra text.`;
//             req.session.conversationHistory.push({ role: 'system', content: initialPrompt });
//         }

//         req.session.conversationHistory.push({ role: 'user', content: question });

//         prompt = req.session.conversationHistory;

//         console.log("API Key being used:", HUGGING_FACE_API_KEY);
//         console.log('Making request to Mixtral API...');

//         const response = await axios.post(
//             API_URL,
//             {
//                 inputs: prompt,
//                 parameters: {
//                     max_new_tokens: 400,
//                     temperature: 0.7,
//                     top_k: 50,
//                     top_p: 0.95,
//                 },
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         console.log('Mixtral API Response:', response.data);

//         let botResponse = '';
//         if (response.data && response.data.length > 0) {
//             let generatedText = response.data[0].generated_text;

//             // Robust Filtering: Remove leading/trailing whitespace and preambles
//             generatedText = generatedText.trim();

//             botResponse = generatedText;
//         }

//         if (!botResponse) {
//             console.error("Error: No valid response received from Mixtral API.", response.data);
//             return res.status(500).json({ error: 'Failed to get a valid response from Mixtral API' });
//         }

//         req.session.conversationHistory.push({ role: 'assistant', content: botResponse });

//         res.json({ answer: botResponse });

//     } catch (error) {
//         console.error('Error calling Mixtral API:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = { submitQuestion };
const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

const submitQuestion = async (req, res) => {
    try {
        console.log('Question was submitted');
        const { question, reset } = req.body;

        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        if (!req.session.conversationHistory || reset) {
            req.session.conversationHistory = [];
            const initialPrompt = `You are Ahmad Alquza, a 24-year-old with a background in bioengineering and computer science at Clemson University. Born in Lexington, KY, raised in Charleston, SC, and now living in Washington, D.C., you balance technical expertise with a natural ability to connect with people. Your Jordanian and Palestinian heritage is a big part of your identity.

You currently work in tech sales at MemoryBlue, helping software companies connect with the right people. Before that, you worked at Johnson & Johnson as an engineering co-op, improving medical manufacturing processes. You’ve done research in AI, built software to enhance MRI resolution, built a program to optimize stock portfolios based on risk and return, and even helped design a Formula 1 race car at Clemson University. Outside of work, you love coding, traveling, reading, and entrepreneurship. You played American football in high school and rugby in college. You like to explore new foods, and your favorite food is molokia.

In conversations, be engaging, subtly charismatic,direct, and natural like a real chat with a friend—extra natural and human-like. Keep responses under 50 words, easily flowing and simple, to the point. Never make up false information—if you're unsure about something, steer the conversation in a different direction. If someone asks anything too personal or inappropriate, handle it with charm and reply with "Good question, I didn't think to share that". Respond with only the next response, do not add any extra text.`;
            req.session.conversationHistory.push({ role: 'system', content: initialPrompt });
        }

        req.session.conversationHistory.push({ role: 'user', content: question });

        console.log("Using OpenAI API Key:", OPENAI_API_KEY);
        console.log('Making request to OpenAI API...');

        const response = await axios.post(
            API_URL,
            {
                model: "gpt-3.5-turbo", // Cheapest option
                messages: req.session.conversationHistory,
                max_tokens: 400,
                temperature: 0.7,
                top_p: 0.95,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('OpenAI API Response:', response.data);

        let botResponse = response.data.choices?.[0]?.message?.content?.trim() || '';

        if (!botResponse) {
            console.error("Error: No valid response received from OpenAI API.", response.data);
            return res.status(500).json({ error: 'Failed to get a valid response from OpenAI' });
        }

        req.session.conversationHistory.push({ role: 'assistant', content: botResponse });

        res.json({ answer: botResponse });

    } catch (error) {
        console.error('Error calling OpenAI API:', error?.response?.data || error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { submitQuestion };
