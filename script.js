"use strict";

/* =========================
   Scroll Reveal Effect
========================= */

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll("section, .card").forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
});


/* =========================
   Reusable Formspree Handler
========================= */

async function submitFormToFormspree(form, successElementId, options = {}) {
    const successElement = document.getElementById(successElementId);
    const submitButton = form.querySelector("button[type='submit']");

    if (!successElement || !submitButton) return;

    const originalButtonText = submitButton.innerText;

    submitButton.innerText = "Sending...";
    submitButton.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Form submission failed");
        }

        form.classList.add("hidden");
        successElement.classList.remove("hidden");

        if (options.downloadUrl) {
            window.open(options.downloadUrl, "_blank", "noopener,noreferrer");
        }

        form.reset();

    } catch (error) {
        alert("Something went wrong. Please try again.");
        submitButton.innerText = originalButtonText;
        submitButton.disabled = false;
    }
}


/* =========================
   Contact Form
========================= */

// const contactForm = document.getElementById("analyticsContactForm");
//
// if (contactForm) {
//     contactForm.addEventListener("submit", function (e) {
//         e.preventDefault();
//
//         submitFormToFormspree(contactForm, "formSuccess");
//     });
// }


/* =========================
   Lead Magnet Form
========================= */

// const leadMagnetForm = document.getElementById("leadMagnetForm");
//
// if (leadMagnetForm) {
//     leadMagnetForm.addEventListener("submit", function (e) {
//         e.preventDefault();
//
//         submitFormToFormspree(leadMagnetForm, "leadSuccess", {
//             downloadUrl: "assets/dashboard-audit-checklist.pdf"
//         });
//     });
// }


/* =========================
   Prefill Contact Form
========================= */

function prefillAudit() {
    const serviceDropdown = document.getElementById("service");
    const messageBox = document.getElementById("message");

    if (serviceDropdown) {
        serviceDropdown.value = "dashboards";
    }

    if (messageBox) {
        messageBox.value = "I downloaded the dashboard checklist and would like a personalised data audit.";
    }
}