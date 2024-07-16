

export function ContentItem({text, address=null, action = null}) {
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

    if (address) {
        item.addEventListener('click', () => {
            console.log(address)
            // window.location.href = address
        })
    }
    return item
}