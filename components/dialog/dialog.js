import { Button } from "../button/button.js"

export function Dialog({header, description, buttons = []}) {
    const dialog = document.createElement('dialog')
    dialog.classList.add('dialog')

    const dialogHeader = document.createElement('p')
    dialogHeader.classList.add('dialog-header')
    dialogHeader.textContent = header
    dialog.appendChild(dialogHeader)

    const dialogDescription = document.createElement('p')
    dialogDescription.classList.add ('dialog-description')
    dialogDescription.textContent = description
    dialog.appendChild(dialogDescription)

    const form = document.createElement('form')
    // form.action = 'dialog'
    form.classList.add('dialog-form')
    dialog.appendChild(form)

    buttons.forEach(button => {
        const newBtn = Button({
            type: button.type,
            size: button.size,
            text: button.text,
            action: button.action,
            imgSrc: button.imgSrc
        })

        form.appendChild(newBtn)
    })

    return dialog
}