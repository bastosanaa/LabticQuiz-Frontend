export function NavItem({imgSrc, title, anchor = null, dropdownItems = [], action= null, selected = false}) {

    const img = document.createElement('img')
    img.setAttribute('src', imgSrc)

    const p = document.createElement('p')
    p.textContent = title
    
    if (dropdownItems.length > 0) {
        const navItem = document.createElement('button')
        navItem.classList.add('nav-item')
        
        const caret = document.createElement('img')
        caret.setAttribute('src', '/assets/caret-down.svg')

        const dropdown = createDropDown(dropdownItems)
        dropdown.classList.add('hidden')
        dropdown.classList.add('fade')

        navItem.appendChild(img)
        navItem.appendChild(p)
        if (selected) {
            const div = document.createElement('div')
            div.classList.add('selected')
            navItem.appendChild(div)
        }
        navItem.appendChild(caret)
        navItem.appendChild(dropdown)

        navItem.addEventListener('click', () => {
            if (dropdown.classList.contains('hidden')){
                caret.style.transform = 'rotate(-90deg)'
            } else {
                caret.style.transform = 'rotate(0deg)'
            }
            dropdown.classList.toggle('hidden')
        })

        return navItem
    } else if (anchor) {
        const navItem = document.createElement('a')
        navItem.setAttribute('href', anchor)
        navItem.classList.add('nav-item')
        navItem.appendChild(img)
        navItem.appendChild(p)
        if (selected) {
            const div = document.createElement('div')
            div.classList.add('selected')
            navItem.appendChild(div)
        }
        return navItem
    } else {
        const navItem = document.createElement('button')
        navItem.classList.add('nav-item')
        navItem.addEventListener('click', action)
        navItem.appendChild(img)
        navItem.appendChild(p)
        return navItem
    }
    
}

function createDropDown(items) {
    const div = document.createElement('div')
    div.classList.add('dropdown')
    const ul = document.createElement('ul')
    items.forEach(item => {
        const a = document.createElement('a')
        a.setAttribute('href', item.href )
        a.textContent = item.text
        ul.appendChild(a)
        if (item.selected) {
            a.style.color = '#FEF08A'
        }
    })
    div.appendChild(ul)

    return div
}
