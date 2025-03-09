import axios from 'axios';

export const questionValidate = (question) => {
    const errors = {};

    if (!question) errors.question = 'Please enter a question!';
    else if (question.length > 200) {
        errors.question = 'Question cannot exceed 200 characters';
    }

    return errors;
};

export const questionSubmit = async (question, setAnswer) => {
    try {
        const response = await axios.post('http://localhost:5000/question', { question }, {
            withCredentials: true, // Add this line
        });

        if (response.status === 200) {
            let generatedText = response.data.answer;
            setAnswer(generatedText);
            return {};
        } else {
            return { server: 'You might have broken the chatbot! Good job.' };
        }
    } catch (error) {
        console.error('Error submitting question:', error);
        return { server: 'An error occurred while submitting your question. Please try again later.' };
    }
};