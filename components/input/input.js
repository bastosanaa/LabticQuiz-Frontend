export function Input({placeholder,title, required = false, errorMessage = null, type = 'text'}) {

    const inputContainer = document.createElement('div')
    inputContainer.classList.add('input-container')

    const p = document.createElement('p')
    p.classList.add('input-label')
    p.textContent = title
    inputContainer.appendChild(p)


    const input = document.createElement('input')
    input.setAttribute('type', type)
    
    if (placeholder) {
        input.setAttribute('placeholder', placeholder)
    }
    if (required) {
        input.required = true
        input.addEventListener('blur', () => {
            checkIfEmpty(input)}
        )
    }

    if (type === 'password') {
        const togglePassword = document.createElement('img')
        togglePassword.classList.add('toggle-password')
        togglePassword.setAttribute('src', 'assets/eye.svg' )

        togglePassword.addEventListener('click', () => {
            togglePasswordStatus(togglePassword)}
        )

        inputContainer.appendChild(togglePassword)
    }
    
    inputContainer.appendChild(input)

    if (errorMessage) {
        const p = document.createElement('p')
        p.classList.add('error-message', 'hidden')


        p.textContent = errorMessage
        inputContainer.appendChild(p)
    }
    return inputContainer
}

function checkIfEmpty(input) {
    const errorMessage = input.parentNode.querySelector('.error-message')
        if (input.value == "") {
            input.style.border = "1px solid red"
            errorMessage.classList.remove('hidden')
        } else {
            input.style.border = ""
            errorMessage.classList.add('hidden')
        }
}

function togglePasswordStatus(togglePassword) {
    let currentSrc = togglePassword.getAttribute('src')
    const input = togglePassword.parentNode.querySelector('input')

    if (currentSrc === "assets/eye.svg") {
        togglePassword.setAttribute('src', 'assets/crossed-eye.svg' )

        input.setAttribute('type', 'text')
        return
    }
    togglePassword.setAttribute('src', 'assets/eye.svg' )
    input.setAttribute('type', 'password')
}