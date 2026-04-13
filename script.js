document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const mobileInput = document.getElementById('mobile');
    const submitBtn = document.getElementById('submitBtn');

    // Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/; // Basic 10-digit validation

    // Real-time validation
    emailInput.addEventListener('input', () => validateField(emailInput, emailRegex));
    mobileInput.addEventListener('input', () => {
        // Only allow numbers
        mobileInput.value = mobileInput.value.replace(/[^0-9]/g, '');
        validateField(mobileInput, mobileRegex);
    });

    function validateField(input, regex) {
        const value = input.value.trim();
        const inputGroup = input.closest('.input-group');

        if (value === '') {
            inputGroup.classList.remove('invalid');
            return false;
        }

        const isValid = regex.test(value);
        if (isValid) {
            inputGroup.classList.remove('invalid');
        } else {
            inputGroup.classList.add('invalid');
        }
        return isValid;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isEmailValid = validateField(emailInput, emailRegex);
        const isMobileValid = validateField(mobileInput, mobileRegex);

        const emailGroup = emailInput.closest('.input-group');
        const mobileGroup = mobileInput.closest('.input-group');

        // Force show errors if empty
        if (emailInput.value.trim() === '') emailGroup.classList.add('invalid');
        if (mobileInput.value.trim() === '') mobileGroup.classList.add('invalid');

        if (isEmailValid && isMobileValid) {
            // Add loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Validating...</span> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';
            submitBtn.disabled = true;

            // Simulate a brief validation delay for premium feel
            setTimeout(() => {
                // Redirect to Google as requested in implementation plan
                window.location.href = "https://adwaithgireesh06.github.io/porfolio/";
            }, 1000);
        } else {
            // Shake animation for error
            const glassPanel = document.querySelector('.glass-panel');
            glassPanel.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 400,
                iterations: 1
            });
        }
    });
});
