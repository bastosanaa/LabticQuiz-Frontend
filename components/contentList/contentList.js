import { ContentItem } from "../contentItem/contentItem.js"

export function ContentList({title_text, content_items = [], href = null}) {
    const content = document.createElement('div')
    content.classList.add('content')
    
    if (typeof title_text === 'string'){
        const title = document.createElement('p')
        title.classList.add('content-title')
        title.textContent = title_text
        content.append(title)
    } else {
        const listHeader = document.createElement('div')
        listHeader.classList.add('content-titles-container')
        title_text.forEach(title => {
            const titleWrapper = document.createElement('div')
            titleWrapper.classList.add('title-wrapper')
            const listTitle = document.createElement('p')
            listTitle.textContent = title
            titleWrapper.appendChild(listTitle)
            listHeader.append(titleWrapper)
            content.append(listHeader)
        }) 
    }

    const ul = document.createElement('ul')
    ul.classList.add('content-list')
    content_items.forEach(item => {
        
        const item_id = item.id? item.id : item._id
        const new_item = ContentItem({
            text: item.name? item.name : item.title,
            href: item.href? item.href : `${href}?id=${item_id}`,
            action: item.action,
            id: item_id,
            tag: item.type,
            date: item.date_end,
            score: item.score

        })
        ul.appendChild(new_item)
    })
    content.appendChild(ul)
    return content
}