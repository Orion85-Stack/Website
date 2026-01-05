// Simple Scroll Reveal Effect
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Target all sections and cards
document.querySelectorAll('section, .card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});

document.getElementById('analyticsContactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate an API call / form submission
    const btn = this.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    btn.disabled = true;

    setTimeout(() => {
        // Hide form and show success message
        this.classList.add('hidden');
        document.getElementById('formSuccess').classList.remove('hidden');
        
        console.log("Form Data Captured:", {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value
        });
    }, 1500);
});