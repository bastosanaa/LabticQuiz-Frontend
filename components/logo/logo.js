
export function Logo({text = true, mode= 'light'}) {
    const logo = document.createElement('div')
    logo.classList.add('logo')

    const img = document.createElement('img')
    if (mode === 'light'){
        img.src = '/assets/polvo-white.svg'
        logo.style.color = 'var(--logo-light-color)'
    } else {
        img.src = '/assets/polvo.svg'
        logo.style.color = 'var(--logo-dark-color)'
    }
    img.classList.add('logo-img')
    logo.appendChild(img)
    
    if (text) {
        const p = document.createElement('p')
        p.textContent = 'Polvo'
        p.classList.add('logo-text')
    
        logo.appendChild(p)
    }

    return logo

}