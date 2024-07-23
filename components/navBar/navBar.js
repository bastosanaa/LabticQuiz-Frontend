import { Logo } from "../logo/logo.js"

export function NavBar() {
    const navBar = document.createElement('div')
    navBar.classList.add('nav-bar')

    const logo = Logo({text: true})
    navBar.appendChild(logo)

    

    return navBar 
}