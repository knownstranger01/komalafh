document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-grid .container');
    const loadingSpinner = document.querySelector('.loading-spinner');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Gallery images array
    const images = [
        { src: 'images/Ramp Front.jpeg', caption: 'Accessible Front Entrance' },
        { src: 'images/Hallway.jpeg', caption: 'Wide Hallway' },
        { src: 'images/Bedroom 1.jpeg', caption: 'Cozy Bedroom 1' },
        { src: 'images/Bedroom 2.jpeg', caption: 'Comfortable Bedroom 2' },
        { src: 'images/Bedroom 3.jpeg', caption: 'Peaceful Bedroom 3' },
        { src: 'images/Attatch bathroom.jpeg', caption: 'Attached Bathroom' },
        { src: 'images/Common bathroom.jpeg', caption: 'Common Bathroom' },
        { src: 'images/Living Room 1.jpeg', caption: 'Spacious Living Room' },
        { src: 'images/Living Room 2.jpeg', caption: 'Comfortable Living Area' },
        { src: 'images/Kitchen.jpeg', caption: 'Modern Kitchen' },
        { src: 'images/Dinning Room.jpeg', caption: 'Elegant Dining Room' },
        { src: 'images/Deck Backyard.jpeg', caption: 'Relaxing Deck & Backyard' }
    ];

    let currentImageIndex = 0;

    // Load gallery images
    function loadGallery() {
        loadingSpinner.style.display = 'none';
        
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}" loading="lazy">
            `;
            
            galleryItem.addEventListener('click', () => openLightbox(index));
            galleryContainer.appendChild(galleryItem);
        });
    }

    // Lightbox functions
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function updateLightboxImage() {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].caption;
        lightboxCaption.textContent = images[currentImageIndex].caption;
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxImage();
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Load the gallery
    loadGallery();
}); 