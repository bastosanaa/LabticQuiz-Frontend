export function NavItem({imgSrc, title, anchor = null, dropdownItems = [], selected = false}) {

    const img = document.createElement('img')
    img.setAttribute('src', imgSrc)

    const p = document.createElement('p')
    p.textContent = title
    
    if (dropdownItems.length > 0) {
        const navItem = document.createElement('button')
        navItem.classList.add('nav-item')
        
        
        //alternar icones ao clicar
        const caretDown = document.createElement('img')
        caretDown.setAttribute('src', '../assets/caret-down.svg')
        const caretUp = document.createElement('img')
        
        const dropdownUl = document.createElement('ul')
        
        //fazer dropdown funcionar
        dropdownItems.forEach(item => {
            const li = document.createElement('li')
            dropdownUl.appendChild(li)
        })
        navItem.appendChild(img)
        navItem.appendChild(p)
        navItem.appendChild(caretDown)
        return navItem
    } else {
        const navItem = document.createElement('a')
        navItem.setAttribute('href', anchor)
        navItem.classList.add('nav-item')
        navItem.appendChild(img)
        navItem.appendChild(p)
        return navItem
    }

    }
