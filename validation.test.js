/**
 * @jest-environment jsdom
 */

const { validateRequired, validateEmail, validatePhone, validateDate, attachEventListeners } = require('./script');

beforeEach(() => {
    document.body.innerHTML = `
        <form id="marsForm">
            <input id="fullName" name="Full Name" value="">
            <div id="fullName-error" class="error-message"></div>
            <input id="email" name="Email" value="">
            <div id="email-error" class="error-message"></div>
            <input id="phone" name="Phone" value="">
            <div id="phone-error" class="error-message"></div>
            <input id="dob" name="Date of Birth" value="">
            <div id="dob-error" class="error-message"></div>
        </form>
    `;
    attachEventListeners();  // Manually attach event listeners for the test
});

// Test validateRequired
test('validateRequired returns false if field is empty', () => {
    expect(validateRequired('fullName')).toBe(false);
});

test('validateRequired returns true if field is not empty', () => {
    document.getElementById('fullName').value = 'John Doe';
    expect(validateRequired('fullName')).toBe(true);
});

// Test validateEmail
test('validateEmail returns false for invalid email', () => {
    document.getElementById('email').value = 'invalid-email';
    expect(validateEmail('email')).toBe(false);
});

test('validateEmail returns true for valid email', () => {
    document.getElementById('email').value = 'test@example.com';
    expect(validateEmail('email')).toBe(true);
});

// Test validatePhone
test('validatePhone returns false for invalid phone number', () => {
    document.getElementById('phone').value = '123';
    expect(validatePhone('phone')).toBe(false);
});

test('validatePhone returns true for valid phone number', () => {
    document.getElementById('phone').value = '1234567890';
    expect(validatePhone('phone')).toBe(true);
});

// Test validateDate
test('validateDate returns false for invalid date format', () => {
    document.getElementById('dob').value = '2024/08/21';
    expect(validateDate('dob')).toBe(false);
});

test('validateDate returns true for valid date format', () => {
    document.getElementById('dob').value = '2024-08-21';
    expect(validateDate('dob')).toBe(true);
});