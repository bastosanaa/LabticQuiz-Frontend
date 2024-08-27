import { checkIfEmpty } from "../../pages/utils/api.js"

export function Input({placeholder,title = null, required = false, errorMessage = null, type = 'text', inputClass = null, style = 'default'}) {

    const inputContainer = document.createElement('div')
    inputContainer.classList.add('input-container')

    if (title) {
        const p = document.createElement('p')
        p.classList.add('input-label')
        p.textContent = title
        inputContainer.appendChild(p)
    }

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
        togglePassword.setAttribute('src', '/assets/eye.svg' )

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

function togglePasswordStatus(togglePassword) {
    let currentSrc = togglePassword.getAttribute('src')
    const input = togglePassword.parentNode.querySelector('input')

    if (currentSrc === "/assets/eye.svg") {
        togglePassword.setAttribute('src', '/assets/crossed-eye.svg' )

        input.setAttribute('type', 'text')
        return
    }
    togglePassword.setAttribute('src', '/assets/eye.svg' )
    input.setAttribute('type', 'password')
}