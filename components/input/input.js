export function Input({placeholder,title, required = false, errorMessage = null, type = 'text', inputClass = null, style = 'default'}) {

    const inputContainer = document.createElement('div')
    inputContainer.classList.add('input-container')

    const p = document.createElement('p')
    p.classList.add('input-label')
    p.textContent = title
    inputContainer.appendChild(p)

    const input = document.createElement('input')
    if (style === 'grey') {
        input.style.backgroundColor = 'var(--secondary-white)'
    }
    if (inputClass) {
        input.classList.add(inputClass)
    }
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

    const errorParagraph = document.createElement('p')
    errorParagraph.classList.add('error-message', 'hidden')

    inputContainer.appendChild(errorParagraph)
    
    return inputContainer
}

function checkIfEmpty(input) {
    const errorMessageParagraph = input.parentNode.querySelector('.error-message')
        if (input.value == "") {
            input.style.border = "1px solid red"
            errorMessageParagraph.textContent = 'este campo deve ser preenchido'
            errorMessageParagraph.classList.remove('hidden')
        } else {
            input.style.border = ""
            errorMessageParagraph.classList.add('hidden')
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