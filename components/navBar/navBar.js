import { Dialog } from "../dialog/dialog.js"
import { Logo } from "../logo/logo.js"
import { NavItem } from "./navItem/navItem.js"

//passar se quer ou nao que apareca pra trocar senha
export function NavBar({items = []}) {
    const navBar = document.createElement('div')
    navBar.classList.add('nav-bar')

    const logo = Logo({text: true})
    navBar.appendChild(logo)

    //ul
    if (items.length > 0) {
        const ul = document.createElement('ul')
        ul.classList.add('nav-items')

        items.forEach(item => {
            const navItem = NavItem({
                imgSrc: item.imgSrc,
                title: item.title,
                anchor: item.anchor,
                dropdownItems: item.dropdownItems
            })
            ul.appendChild(navItem)
        })
    
        navBar.appendChild(ul)
    }

    const footer = document.createElement('div')
    footer.classList.add('nav-footer')
    const signOut = NavItem({
        imgSrc: '../assets/password.svg',
        title: 'Trocar senha',

    }) 
    const signOut2 = NavItem({
        imgSrc: '../assets/sign-out.svg',
        title: 'Encerrar sessão',
        action: () => {
            const dialog = Dialog({
                header: 'Tem certeza?',
                description: 'Você irá encerrar sua sessão e precisará realizar login para entrar novamente.',
                buttons: [
                    {
                        type: 'outline',
                        size: 'small',
                        text: 'Cancelar',
                        action: () => {
                            dialog.close()
                        }
                    },
                    {
                        type: 'destructive',
                        size: 'small',
                        text: 'Encerrar',
                        action: () => {
                            localStorage.removeItem('token')
                            window.location.href = 'http://127.0.0.1:5501/login.html'
                        }
                    }
                ]
            })
            const body = document.querySelector('body')
            body.append(dialog)
            dialog.showModal()
        }

        
    }) 
    footer.appendChild(signOut)
    footer.appendChild(signOut2)
    
    console.log(footer);
    navBar.appendChild(footer)
    
    return navBar 
}
