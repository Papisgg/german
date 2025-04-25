document.addEventListener('DOMContentLoaded', function() {
    // Check if we should show register form by default
    const urlParams = new URLSearchParams(window.location.search);
    const registerParam = urlParams.get('register');
    
    // Tab switching
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const switchToLogin = document.getElementById('switch-to-login');
    
    function showLogin() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    }
    
    function showRegister() {
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    }
    
    if (registerParam === 'true') {
        showRegister();
    } else {
        showLogin();
    }
    
    if (loginTab && registerTab) {
        loginTab.addEventListener('click', showLogin);
        registerTab.addEventListener('click', showRegister);
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            showLogin();
        });
    }
    
    // Form validation
    const loginFormEl = document.getElementById('login-form');
    if (loginFormEl) {
        loginFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                alert('Bitte füllen Sie alle Felder aus.');
                return;
            }
            
            // In a real app, you would make an API call to login
            alert('Anmeldung erfolgreich!');
            window.location.href = 'dashboard.html';
        });
    }
    
    const registerFormEl = document.getElementById('register-form');
    if (registerFormEl) {
        registerFormEl.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const birthdate = document.getElementById('register-birthdate').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const location = document.getElementById('register-location').value;
            const terms = document.getElementById('register-terms').checked;
            
            if (!name || !birthdate || !email || !password || !location) {
                alert('Bitte füllen Sie alle Felder aus.');
                return;
            }
            
            if (!terms) {
                alert('Bitte akzeptieren Sie die AGB und Datenschutzbestimmungen.');
                return;
            }
            
            if (password.length < 8) {
                alert('Das Passwort muss mindestens 8 Zeichen lang sein.');
                return;
            }
            
            // Calculate age from birthdate
            const birthDate = new Date(birthdate);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 45) {
                alert('Sie müssen mindestens 45 Jahre alt sein, um sich zu registrieren.');
                return;
            }
            
            // In a real app, you would make an API call to register
            alert('Registrierung erfolgreich! Sie werden angemeldet.');
            window.location.href = 'dashboard.html';
        });
    }
    
    // Social login buttons
    const facebookBtn = document.querySelector('.btn-facebook');
    const googleBtn = document.querySelector('.btn-google');
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            alert('Facebook Login würde hier implementiert werden.');
        });
    }
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            alert('Google Login würde hier implementiert werden.');
        });
    }
});