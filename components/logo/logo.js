/* 
<div id="side-bar-header">
    <div id="side-bar-polvo-img">
        <img src="./assets/polvo-white.png" alt="icone do app" id="side-bar-polvo-icon">
    </div>
    <p id="side-bar-polvo-title">Polvo</p>
</div>
 */

export function Logo({text = true}) {
    const logo = document.createElement('div')
    logo.classList.add('logo')

    const img = document.createElement('img')
    img.src = '../assets/polvo-white.svg'
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