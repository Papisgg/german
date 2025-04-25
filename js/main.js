document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav ul');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Testimonial carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentTestimonial = 0;

    if (testimonials.length > 0) {
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            testimonials[index].classList.add('active');
            currentTestimonial = index;
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                let newIndex = currentTestimonial - 1;
                if (newIndex < 0) newIndex = testimonials.length - 1;
                showTestimonial(newIndex);
            });

            nextBtn.addEventListener('click', function() {
                let newIndex = currentTestimonial + 1;
                if (newIndex >= testimonials.length) newIndex = 0;
                showTestimonial(newIndex);
            });
        }

        // Auto-rotate testimonials
        setInterval(function() {
            let newIndex = currentTestimonial + 1;
            if (newIndex >= testimonials.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 5000);
    }

    // User dropdown
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            this.querySelector('.user-dropdown').classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            const dropdowns = document.querySelectorAll('.user-dropdown');
            dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
        });
    }

    // Logout functionality
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, you would make an API call to logout
            alert('Sie wurden erfolgreich abgemeldet.');
            window.location.href = 'index.html';
        });
    }

    // Like button functionality
    const likeButtons = document.querySelectorAll('.btn-like');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            // In a real app, you would send an API request to save the like
        });
    });

    // Interest tags selection
    const interestTags = document.querySelectorAll('.tag-selectable');
    interestTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // Photo upload preview
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarPreview = document.getElementById('avatar-preview');
    
    if (avatarUpload && avatarPreview) {
        avatarUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatarPreview.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Character counter for profile about
    const aboutTextarea = document.getElementById('profile-about');
    const charCounter = document.getElementById('about-chars');
    
    if (aboutTextarea && charCounter) {
        aboutTextarea.addEventListener('input', function() {
            const remaining = 500 - this.value.length;
            charCounter.textContent = remaining;
            
            if (remaining < 0) {
                charCounter.style.color = 'red';
            } else {
                charCounter.style.color = 'inherit';
            }
        });
    }

    // Photo upload functionality
    const photoUploads = document.querySelectorAll('.photo-upload-input');
    photoUploads.forEach(upload => {
        upload.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const preview = this.closest('.photo-upload').querySelector('.photo-preview');
                if (preview.classList.contains('empty')) {
                    preview.classList.remove('empty');
                    preview.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    preview.appendChild(img);
                    
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'photo-delete';
                    deleteBtn.innerHTML = '×';
                    deleteBtn.addEventListener('click', function(e) {
                        e.stopPropagation();
                        preview.innerHTML = '<span class="icon">+</span><span>Foto hinzufügen</span>';
                        preview.classList.add('empty');
                        upload.value = '';
                    });
                    preview.appendChild(deleteBtn);
                }
            }
        });
    });
});