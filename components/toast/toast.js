

export function Toast({type= 'success', message, reloadPage=false}) {

    const toast = document.createElement('div')
    toast.classList.add('toast', 'show')

    const toastText = document.createElement('div')

    const img = document.createElement('img')
    const h1 = document.createElement('h1')
    if (type === 'success') {
        img.setAttribute('src', '/assets/success.svg')
        h1.innerHTML = 'Sucesso!'
    }
    
    const closeIcon = document.createElement('img')
    closeIcon.classList.add('close-icon')
    closeIcon.setAttribute('src', '/assets/close.svg')
    
    const p = document.createElement('p')
    p.innerHTML = message

    toastText.append(h1)
    toastText.append(p)

    toast.append(img)
    toast.append(toastText)
    toast.append(closeIcon)
    
    const toastTimeOut = setTimeout(hideToast, 3000);
    
    closeIcon.addEventListener('click', () => {
        clearTimeout(toastTimeOut);
        hideToast()
    });

    function hideToast() {
        toast.classList.remove("show");
        if (reloadPage) {
            window.location.reload(true)
        }
    }
    
    return toast
}
