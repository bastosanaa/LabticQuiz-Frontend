const SignOutBtn = document.getElementById('sign-out')

//sign out

SignOutBtn.addEventListener('click', () => {
    const dialog =  createDialog()
    const body = document.getElementById('page')
    body.append(dialog)
    dialog.showModal()
})

export function signOut() {
    localStorage.removeItem('token')
    window.location.href = 'http://127.0.0.1:5501/login.html'
}

export function createDialog() {
    
    const dialog = document.createElement('dialog')
    dialog.id = 'dialog-container'

    //header
    const dialogHeader = document.createElement('p')
    dialogHeader.id = 'dialog-header'
    dialogHeader.textContent = 'Tem certeza?'

    //description
    const dialogDescription = document.createElement('p')
    dialogDescription.id = 'dialog-description'
    dialogDescription.textContent = "Você irá encerrar sua sessão e precisará realizar login para entrar novamente."

    //form
    const form = document.createElement('form')
    form.action = 'dialog'
    form.id = 'dialog-form'

    const backButton = document.createElement('button')
    backButton.id = 'back-button'
    backButton.textContent = 'Cancelar'

    const confirmButton = document.createElement('button')
    confirmButton.id = 'confirm-button'
    confirmButton.textContent = 'Encerrar'

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

    confirmButton.addEventListener('click', (event) => {
        event.preventDefault()
        signOut()
    })

    return dialog
}