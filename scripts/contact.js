// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Replace with your Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbxNl2q5GxIrV-rsS6Dd15xLnNxdhHFQKUlDuCivmrC_q9q7575vS3wYgftHuOFf3d3uFQ/exec';

contactForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    formMessage.style.display = 'none';
    
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(contactForm)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        // Show success message
        formMessage.textContent = 'Thank you! Your message has been sent.';
        formMessage.style.color = 'green';
        formMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
    })
    .catch(error => {
        // Show error message
        formMessage.textContent = 'Error! Please try again later or contact us directly.';
        formMessage.style.color = 'red';
        formMessage.style.display = 'block';
        console.error('Error!', error.message);
    })
    .finally(() => {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    });
});