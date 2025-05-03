// Digital Business Card Script
// Add any desired interactivity here.

document.addEventListener('DOMContentLoaded', () => {
    console.log('Digital Business Card Loaded');

    // --- tsParticles Configuration --- 
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60, // Limit FPS for performance
            particles: {
                number: {
                    value: 50, // Number of particles
                    density: {
                        enable: true,
                        value_area: 800 // Area where particles density is calculated
                    }
                },
                color: {
                    value: ["#444444", "#666666", "#ffd700"] // Dark Grey, Med Grey, and yellow particles
                },
                shape: {
                    type: "circle" // Shape of particles
                },
                opacity: {
                    value: 0.3, // Base opacity
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 1,
                        sync: false
                    }
                },
                size: {
                    value: 3, // Base size
                    random: true,
                    anim: {
                        enable: false, // Disable size animation for subtlety
                        speed: 4,
                        size_min: 0.3,
                        sync: false
                    }
                },
                move: {
                    enable: true,
                    speed: 0.6, // Slow movement speed
                    direction: "none", // Random movement
                    random: true,
                    straight: false,
                    out_mode: "out", // Particles leave the canvas
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                },
                // Disable links between particles for a cleaner look
                line_linked: {
                    enable: false,
                },
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: false, // Disable hover effects
                    },
                    onclick: {
                        enable: false, // Disable click effects
                    },
                    resize: true
                },
            },
            detectRetina: true, // Better rendering on high-density displays
            // background: { 
            //     color: "transparent", // Ensure canvas itself is transparent
            // }
        });
    } else {
        console.error('tsParticles library not loaded.');
    }
    // --- End tsParticles Configuration ---

    // --- Modal Logic ---
    const modal = document.getElementById('imageModal');
    const profileButton = document.getElementById('profileButton');
    const modalImage = document.getElementById('modalImage');
    const closeModalButton = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');

    const openModal = () => {
        // Use the URL from the button's data attribute
        const largeImageUrl = profileButton.getAttribute('data-large-image'); 
        if (largeImageUrl) {
            modalImage.src = largeImageUrl; // Set the large image source
            modal.classList.add('modal-open'); // Show the modal
        } else {
            console.error("Large image URL not found on button data-large-image attribute.");
        }
    };

    const closeModal = () => {
        modal.classList.remove('modal-open'); // Hide the modal
        modalImage.src = ""; // Clear src to prevent showing old image briefly
    };

    if (profileButton && modal && modalImage && closeModalButton && modalOverlay) {
        profileButton.addEventListener('click', openModal);
        closeModalButton.addEventListener('click', closeModal);
        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', closeModal);

        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('modal-open')) {
                closeModal();
            }
        });
    } else {
        console.error('Modal elements not found. Check IDs and classes.');
    }
    // --- End Modal Logic ---

    // --- VCF Generation Logic ---
    const addContactButton = document.getElementById('addContactBtn');
    if (addContactButton) {
        // --- Get contact details from the page (use placeholders for now) ---
        const contactName = document.querySelector('.name')?.textContent.trim() || 'Your Name';
        const contactTitle = document.querySelector('.title')?.textContent.trim() || 'Your Job Title';
        const contactEmail = document.querySelector('.email-text-link')?.textContent.trim() || 'your.email@example.com';
        const whatsappLink = document.querySelector('.whatsapp.icon-button')?.href;
        let contactPhone = '';
        if (whatsappLink) {
            const phoneMatch = whatsappLink.match(/wa.me\/(\d+)/);
            if (phoneMatch && phoneMatch[1]) {
                contactPhone = phoneMatch[1];
            }
        }
        const contactLinkedIn = document.querySelector('.linkedin.icon-button')?.href || '';
        const contactPortfolio = document.querySelector('.portfolio.icon-button')?.href || '';
        // --- End Get contact details ---

        const vcfData = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `N:${contactName.split(' ').pop()};${contactName.split(' ').slice(0,-1).join(' ')}`, // Simple split for Last;First
            `FN:${contactName}`,
            `TITLE:${contactTitle}`,
            `EMAIL;type=INTERNET;type=WORK;type=pref:${contactEmail}`,
            contactPhone ? `TEL;type=CELL;type=VOICE;type=pref:${contactPhone}` : '',
            contactLinkedIn ? `URL;type=LinkedIn:${contactLinkedIn}` : '',
            contactPortfolio ? `URL;type=Portfolio:${contactPortfolio}` : '',
            'END:VCARD'
        ].filter(Boolean).join('\n');

        const vcfUrl = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcfData)}`;
        addContactButton.href = vcfUrl;

        const filename = `${contactName.replace(/\s+/g, '_') || 'contact'}.vcf`;
        addContactButton.setAttribute('download', filename);
    }
    // --- End VCF Generation Logic ---
});

// Function to open image in a popup window
function openImagePopup(url, event) {
    // Prevent the default link behavior (navigating away)
    if (event) {
        event.preventDefault();
    }

    // Define popup window features (size, position)
    const popupWidth = 600;
    const popupHeight = 600;
    const left = (window.screen.width / 2) - (popupWidth / 2);
    const top = (window.screen.height / 2) - (popupHeight / 2);

    // Define window features string
    const features = `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`;

    // Open the popup window
    window.open(url, 'imagePopup', features);
} 