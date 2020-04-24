// Lightbox elements
const lightbox = document.querySelector('.lightbox');
const lightboxCloseButton = document.querySelector('.lightbox-close');
const lightboxsubmitButton = document.querySelector('.lightbox-confirm');
const lightboxError = document.querySelector('.lightbox-error');
const lightboxOverlay = document.querySelector('.overlay');
let lightboxInput = document.querySelector('.lightbox-input');

function init() {
    lightboxCloseButton.addEventListener('click', closeLightbox);
    lightboxsubmitButton.addEventListener('click', submitLightbox);
}

// Open Lightbox
function openLightbox() {
    lightboxError.style.opacity = '0';
    lightboxOverlay.style.height = '100vh';
    lightbox.style.transform = "translateX(-50%) translateY(-50%)"
}

// Close Lightbox
function closeLightbox() {
    lightboxOverlay.style.height = '0';
    lightbox.style.transform = "translateX(99999px) translateY(-50%)"
}

// Confirm changes and close Lightbox
function submitLightbox() {
    sanitizer(lightboxInput);
    
    if (sanitizedText) {
        lightboxError.style.opacity = '0';
        taskToChange.textContent = sanitizedText;
        saveTask();
        closeLightbox();
    } else {
        lightboxError.style.opacity = '1';
    }
}

init();
