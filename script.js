// Function to attach event listeners
function attachEventListeners() {
    const form = document.getElementById('marsForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateStage(3)) {
                alert('Application submitted successfully!');
                form.reset();
                nextStage(1);
            }
        });
    }
}

// Only attach event listeners if running in the browser environment
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', attachEventListeners);
}

// Function to move to the next stage
function nextStage(stage) {
    if (validateStage(stage - 1)) {
        document.querySelectorAll('.form-stage').forEach(el => el.style.display = 'none');
        document.getElementById(`stage-${stage}`).style.display = 'block';
    }
}

// Function to go back to the previous stage
function previousStage(stage) {
    document.querySelectorAll('.form-stage').forEach(el => el.style.display = 'none');
    document.getElementById(`stage-${stage}`).style.display = 'block';
}

// Function to review and submit the form
function reviewAndSubmit() {
    if (validateStage(3)) {
        const reviewContainer = document.getElementById('review');
        const form = document.getElementById('marsForm');
        let reviewHTML = '';

        // Collect data from the form and build review section
        new FormData(form).forEach((value, key) => {
            reviewHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        });

        reviewContainer.innerHTML = reviewHTML;
        nextStage(4);
    }
}

// Function to validate the fields in the current stage
function validateStage(stage) {
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    switch (stage) {
        case 1:
            // Validate Stage 1: Personal Information
            isValid &= validateRequired('fullName');
            isValid &= validateRequired('dob') && validateDate('dob');
            isValid &= validateRequired('nationality');
            isValid &= validateEmail('email');
            isValid &= validatePhone('phone');
            break;
        case 2:
            // Validate Stage 2: Travel Preferences
            isValid &= validateRequired('departureDate') && validateDate('departureDate');
            isValid &= validateRequired('returnDate') && validateDate('returnDate');
            isValid &= validateRequired('accommodation');
            break;
        case 3:
            // Validate Stage 3: Health and Safety
            isValid &= validateRequired('healthDeclaration');
            isValid &= validateRequired('emergencyName');
            isValid &= validatePhone('emergencyContact'); // Validate as phone number
            if (document.getElementById('healthDeclaration').value === "Yes") {
                isValid &= validateRequired('medicalConditions');
            }
            break;
    }

    return isValid;
}

// Utility functions for validation
function validateRequired(fieldId) {
    const field = document.getElementById(fieldId);
    const errorField = document.getElementById(`${fieldId}-error`);
    if (!field.value.trim()) {
        errorField.textContent = `${field.name} is required.`;
        return false;
    }
    return true;
}

function validateEmail(fieldId) {
    const email = document.getElementById(fieldId).value.trim();
    const errorField = document.getElementById(`${fieldId}-error`);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorField.textContent = 'Please enter a valid email address.';
        return false;
    }
    return true;
}

function validatePhone(fieldId) {
    const phone = document.getElementById(fieldId).value.trim();
    const errorField = document.getElementById(`${fieldId}-error`);
    const phoneRegex = /^\d{10}$/; // Adjust the regex according to your requirements
    if (!phoneRegex.test(phone)) {
        errorField.textContent = 'Please enter a valid 10-digit phone number.';
        return false;
    }
    return true;
}

function validateDate(fieldId) {
    const date = document.getElementById(fieldId).value.trim();
    const errorField = document.getElementById(`${fieldId}-error`);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    if (!dateRegex.test(date)) {
        errorField.textContent = 'Please enter a valid date in YYYY-MM-DD format.';
        return false;
    }
    return true;
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { validateRequired, validateEmail, validatePhone, validateDate, attachEventListeners };
}