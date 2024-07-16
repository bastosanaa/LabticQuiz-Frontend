export function PageHeader({title_text, subtitle_text = null, subtitle_size = 'normal', back_btn = false, back_btn_address = null }) {

    const header = document.createElement('div')
    header.classList.add('header')
    
    const title_div = document.createElement('div')
    title_div.classList.add('title-div')

    if (back_btn) {
        const img = document.createElement('img')
        img.classList.add('back-btn')
        img.src = '../assets/caret-back.svg'
        title_div.appendChild(img)
    }

    const title = document.createElement('p')
    title.textContent = title_text
    title.classList.add('title')
    title_div.appendChild(title)

    header.appendChild(title_div)
    

    if (subtitle_text) {
        const subtitle = document.createElement('p')
        subtitle.textContent = subtitle_text
        subtitle.classList.add('subtitle')
        const subtitleSizes = {
            'normal': 'size-normal',
            'small': 'size-small'
        }
    
        const subtitleSizeClass = subtitleSizes[subtitle_size]
        subtitle.classList.add(subtitleSizeClass)

        header.appendChild(subtitle)
    }
    
    return header
}