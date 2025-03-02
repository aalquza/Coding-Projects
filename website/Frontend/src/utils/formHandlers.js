import axios from 'axios';

// Validation function
export const formValidate = (formData) => {
    const errors = {};

    // Check if the fields are empty
    if (!formData.firstName) errors.firstName = 'First name is required';
    else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(formData.firstName)) {
        errors.firstName = 'First name must contain only letters';
    }

    if (!formData.lastName) errors.lastName = 'Last name is required';
    else if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(formData.lastName)) {
        errors.lastName = 'Last name must contain only letters';
    }

    // Email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = 'A valid email is required';
    }

    if (!formData.question) errors.question = 'Please enter your question';
    else if (formData.question.length > 300) {
        errors.question = 'Question cannot exceed 300 characters';
    }

    return errors;
};


// Submit function
export const formSubmit = async (formData, setFormData) => {
    try {
        const response = await axios.post('http://localhost:5000/form', formData);

        if (response.status === 201) {
            setFormData({ firstName: '', lastName: '', email: '', question: '' }); // Reset form
            return { success: 'Form submitted successfully!' };  // Return success message
        } else {
            return { server: 'Form submission failed. Please try again later.' };  // Return error
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        return { server: 'An error occurred while submitting the form. Please try again later.' };  // Return error
    }
};