import { ContentItem } from "../contentItem/contentItem.js"

export function ContentList({title_text, content_items = []}) {

    const content = document.createElement('div')
    content.classList.add('content')

    const title = document.createElement('p')
    title.classList.add('content-title')
    title.textContent = title_text
    content.append(title)

    const ul = document.createElement('ul')
    ul.classList.add('content-list')
    content_items.forEach(item => {
        const new_item = ContentItem({
            text: item.text
        })
        console.log(new_item);
        ul.appendChild(new_item)
    })
    content.appendChild(ul)
    return content
}