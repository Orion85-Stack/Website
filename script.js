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

// document.getElementById('analyticsContactForm').addEventListener('submit', function(e) {
//     e.preventDefault();
    
//     // Simulate an API call / form submission
//     const btn = this.querySelector('button');
//     const originalText = btn.innerText;
//     btn.innerText = "Processing...";
//     btn.disabled = true;

//     setTimeout(() => {
//         // Hide form and show success message
//         this.classList.add('hidden');
//         document.getElementById('formSuccess').classList.remove('hidden');
        
//         console.log("Form Data Captured:", {
//             name: document.getElementById('name').value,
//             email: document.getElementById('email').value,
//             service: document.getElementById('service').value
//         });
//     }, 1500);
// });

document.getElementById('analyticsContactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = this;
    const data = new FormData(form);

    const btn = form.querySelector('button');
    const originalText = btn.innerText;
    btn.innerText = "Sending...";
    btn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            form.classList.add('hidden');
            document.getElementById('formSuccess').classList.remove('hidden');
        } else {
            alert("Something went wrong. Please try again.");
            btn.innerText = originalText;
            btn.disabled = false;
        }

    } catch (error) {
        alert("Error submitting form.");
        btn.innerText = originalText;
        btn.disabled = false;
    }
});

document.getElementById('leadMagnetForm').addEventListener('submit', function(e) {
    e.preventDefault();

    this.classList.add('hidden');
    document.getElementById('leadSuccess').classList.remove('hidden');

    console.log("Lead magnet captured");
});

document.getElementById('leadMagnetForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = this;
    const data = new FormData(form);

    try {
        // Send to Formspree
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Show success message
            form.classList.add('hidden');
            document.getElementById('leadSuccess').classList.remove('hidden');

            // Trigger PDF download
            window.open('assets/dashboard-audit-checklist.pdf', '_blank');

        } else {
            alert("Something went wrong. Please try again.");
        }

    } catch (error) {
        alert("Error submitting form.");
    }
});

MailApp.sendEmail({
  to: "mare.stephen@gmail.com.com",
  subject: "New Lead - Praxis Insights",
  body: `New lead:\nName: ${data.name}\nEmail: ${data.email}`
});
