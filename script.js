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

document.getElementById('leadMagnetForm').addEventListener('submit', function(e) {
    e.preventDefault();

    this.classList.add('hidden');
    document.getElementById('leadSuccess').classList.remove('hidden');

    console.log("Lead magnet captured");
});


document.getElementById('leadMagnetForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = this.querySelector('input[name="name"]').value;
    const email = this.querySelector('input[name="email"]').value;

    const data = {
        name: name,
        email: email,
        source: "Dashboard Checklist"
    };

    try {
        await fetch("https://docs.google.com/spreadsheets/d/19RrGKzQQ6KslgW16tUYpwnAVyI81w8A0Ss4jx36h1Xs/edit?gid=0#gid=0", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Show success message
        this.classList.add('hidden');
        document.getElementById('leadSuccess').classList.remove('hidden');

        // Trigger PDF download
        window.open('assets/dashboard-audit-checklist.pdf', '_blank');

    } catch (error) {
        alert("Something went wrong. Please try again.");
    }
});

MailApp.sendEmail({
  to: "mare.stephen@gmail.com.com",
  subject: "New Lead - Praxis Insights",
  body: `New lead:\nName: ${data.name}\nEmail: ${data.email}`
});
