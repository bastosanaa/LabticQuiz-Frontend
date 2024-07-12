export async function Dialog({headerText, textBeforeContent, confirmBtnText,confirmedAction,textAfterContent= null,object = null}) {
    const dialog = document.createElement('dialog')
    dialog.id = 'dialog-container'

    //header
    const dialogHeader = document.createElement('p')
    dialogHeader.id = 'dialog-header'
    dialogHeader.textContent = headerText
    //description
    const dialogDescription = document.createElement('p')
    dialogDescription.id = 'dialog-description'
    
    const textBefore = document.createTextNode(textBeforeContent);
    const textAfter = document.createTextNode(textAfterContent);
    
    dialogDescription.appendChild(textBefore)
    
    if (object) {
        const span = document.createElement('span')
        span.textContent = object.name
        span.classList.add('object-name-span')
        
        dialogDescription.appendChild(span)
    }

    dialogDescription.appendChild(textAfter)

    //form
    const form = document.createElement('form')
    form.action = 'dialog'
    form.id = 'dialog-form'

    const backButton = document.createElement('button')
    backButton.id = 'back-button'
    backButton.textContent = 'Voltar'

    const confirmButton = document.createElement('button')
    confirmButton.id = 'confirm-button'
    confirmButton.textContent = confirmBtnText

    form.appendChild(backButton)
    form.appendChild(confirmButton)

    //dialog 
    dialog.appendChild(dialogHeader)
    dialog.appendChild(dialogDescription)
    dialog.appendChild(form)

    backButton.addEventListener('click',  (event) => {
        event.preventDefault()
        dialog.close()
    })

    confirmButton.addEventListener('click', async (event) => {
        event.preventDefault()
        await confirmedAction()
    })
    return dialog
}