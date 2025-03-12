// Form Handling
const contactForm = document.getElementById('contactForm');
const formGroups = document.querySelectorAll('.form-group');

// Phone number formatting
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});

// Form validation
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    // Add error message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    group.appendChild(errorMessage);

    // Input validation
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        showError(input);
    });

    input.addEventListener('input', () => {
        if (input.validity.valid) {
            hideError(input);
        }
    });
});

function showError(input) {
    const group = input.closest('.form-group');
    const errorMessage = group.querySelector('.error-message');
    
    switch(input.id) {
        case 'name':
            errorMessage.textContent = 'Please enter your name';
            break;
        case 'email':
            errorMessage.textContent = 'Please enter a valid email address';
            break;
        case 'phone':
            errorMessage.textContent = 'Please enter a valid phone number';
            break;
        case 'message':
            errorMessage.textContent = 'Please enter your message';
            break;
    }
}

function hideError(input) {
    const group = input.closest('.form-group');
    const errorMessage = group.querySelector('.error-message');
    errorMessage.textContent = '';
}

// Form submission
function handleSubmit(event) {
    // Basic validation
    let isValid = true;
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input.validity.valid) {
            isValid = false;
            showError(input);
            event.preventDefault();
        }
    });

    if (!isValid) return false;

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Create email body
    const emailBody = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Subject: ${data.subject}
Message: ${data.message}
    `;
    
    // Update form action with email body
    contactForm.action = `mailto:sunil.paudel13@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Show success message
    const successMessage = document.querySelector('.success-message');
    successMessage.style.display = 'block';
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

// Add form submit event listener
contactForm.addEventListener('submit', handleSubmit);

// Add smooth scrolling to map section when clicking on address
const addressElement = document.querySelector('.info-item:last-child');
const mapSection = document.querySelector('.map-section');

if (addressElement && mapSection) {
    addressElement.style.cursor = 'pointer';
    addressElement.addEventListener('click', () => {
        mapSection.scrollIntoView({ behavior: 'smooth' });
    });
} 