import { Input } from "../input/input.js"
import { Button } from "../button/button.js"

export function AuthCard({theme = null, title, inputs = [], extraAnchor = null, buttonParams}) {
    const card = document.createElement('div')
    card.classList.add('auth-card')

    const p = document.createElement('p')
    p.classList.add('auth-card-title')
    p.textContent = title
    card.appendChild(p)

    const inputDiv = document.createElement('div')
    inputDiv.classList.add('input-div')
    inputs.forEach(input => {
        inputDiv.appendChild(input)
    })
    card.appendChild(inputDiv)

    if (extraAnchor) {
        const a = document.createElement('a')
        a.textContent = extraAnchor.text
        a.setAttribute('href', extraAnchor.href)
        card.appendChild(a)
    }

    card.appendChild(buttonParams)

    return card




}