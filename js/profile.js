document.addEventListener('DOMContentLoaded', function() {
    // Profile form submission
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('profile-name').value;
            const city = document.getElementById('profile-city').value;
            const relationship = document.getElementById('profile-relationship').value;
            const height = document.getElementById('profile-height').value;
            const about = document.getElementById('profile-about').value;
            
            // Get selected interests
            const selectedInterests = [];
            document.querySelectorAll('.interest-tags-select .active').forEach(tag => {
                selectedInterests.push(tag.textContent);
            });
            
            // Get preferences
            const prefGender = document.getElementById('pref-gender').value;
            const prefAgeMin = document.getElementById('pref-age-min').value;
            const prefAgeMax = document.getElementById('pref-age-max').value;
            const prefLocation = document.getElementById('pref-location').value;
            
            // In a real app, you would send this data to the server
            console.log('Profile updated:', {
                name,
                city,
                relationship,
                height,
                about,
                interests: selectedInterests,
                preferences: {
                    gender: prefGender,
                    ageMin: prefAgeMin,
                    ageMax: prefAgeMax,
                    location: prefLocation
                }
            });
            
            alert('Profil erfolgreich aktualisiert!');
        });
    }
    
    // Avatar upload preview
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
    
    // Character counter for about section
    const aboutTextarea = document.getElementById('profile-about');
    const charCounter = document.getElementById('about-chars');
    
    if (aboutTextarea && charCounter) {
        // Set initial count
        charCounter.textContent = 500 - aboutTextarea.value.length;
        
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
});