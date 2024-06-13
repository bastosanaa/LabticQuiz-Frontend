const togglePasswordIcon = document.getElementById('toggle-password-icon')
const passwordInput = document.getElementById('login-password-input')

togglePasswordIcon.addEventListener('click', togglePasswordStatus)

function togglePasswordStatus() {
    
    let currentSrc = togglePasswordIcon.getAttribute('src')

    if (currentSrc === "assets/eye.png") {
        togglePasswordIcon.setAttribute('src', 'assets/crossed-eye.svg' )

        passwordInput.setAttribute('type', 'text')
        return
    }
    togglePasswordIcon.setAttribute('src', 'assets/eye.png' )
    passwordInput.setAttribute('type', 'password')
}