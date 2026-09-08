const form = document.getElementById('settingsForm');
const successMessage = document.getElementById('successMessage');

// Validation rules
const validationRules = {
    username: {
        validate: (value) => {
            if (!value) return 'Username is required';
            if (value.length < 3) return 'Username must be at least 3 characters';
            if (value.length > 20) return 'Username must not exceed 20 characters';
            if (!/^[a-zA-Z0-9_-]+$/.test(value)) return 'Username can only contain letters, numbers, hyphens, and underscores';
            return '';
        }
    },
    email: {
        validate: (value) => {
            if (!value) return 'Email is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Please enter a valid email address';
            return '';
        }
    },
    password: {
        validate: (value) => {
            if (!value) return 'Password is required';
            if (value.length < 8) return 'Password must be at least 8 characters';
            if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
            if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
            return '';
        }
    },
    theme: {
        validate: (value) => {
            if (!value) return 'Please select a theme';
            return '';
        }
    }
};

// Validate individual field
function validateField(fieldName) {
    const field = form.elements[fieldName];
    const rule = validationRules[fieldName];
    const errorElement = document.getElementById(`${fieldName}Error`);

    if (rule) {
        const error = rule.validate(field.value.trim());
        errorElement.textContent = error;
        return error === '';
    }
    return true;
}

// Validate all fields
function validateForm() {
    let isValid = true;
    Object.keys(validationRules).forEach(fieldName => {
        if (!validateField(fieldName)) {
            isValid = false;
        }
    });
    return isValid;
}

// Real-time validation on blur
Object.keys(validationRules).forEach(fieldName => {
    const field = form.elements[fieldName];
    field.addEventListener('blur', () => validateField(fieldName));
    field.addEventListener('input', () => {
        if (document.getElementById(`${fieldName}Error`).textContent) {
            validateField(fieldName);
        }
    });
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMessage.textContent = '';

    if (validateForm()) {
        // Collect form data
        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            theme: formData.get('theme'),
            notifications: formData.get('notifications') === 'on'
        };

        // Simulate saving
        console.log('Settings saved:', data);
        successMessage.textContent = '✓ Settings saved successfully!';
        
        // Clear success message after 3 seconds
        setTimeout(() => {
            successMessage.textContent = '';
        }, 3000);
    }
});

// Reset success message on form reset
form.addEventListener('reset', () => {
    successMessage.textContent = '';
    Object.keys(validationRules).forEach(fieldName => {
        document.getElementById(`${fieldName}Error`).textContent = '';
    });
});
