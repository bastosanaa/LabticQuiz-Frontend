

export function ContentItem({text, href=null, action = null}) {
    const item = document.createElement('li')
    item.id = 'content-item'
    const p = document.createElement('p')
    p.id = 'content-item-text'
    p.textContent = text
    

    item.appendChild(p)

    if (action) {
        const a = document.createElement('a')
        a.textContent = action
        item.appendChild(a)
        a.id = 'content-item-anchor'

        a.addEventListener('click', () => {
            console.log('endereco da ancora');
        })
    }

    if (href) {
        item.addEventListener('click', () => {
            window.location.href = href
        })
    }
    return item
}