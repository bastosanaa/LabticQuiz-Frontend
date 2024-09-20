import { formatDate } from "../../pages/utils/api.js";


export function ContentItem({text, date= null, tag= null , score= null, crud= null, extraAnchor = null, href=null, action = null, id=null}) {    
    const item = document.createElement('li')
    
    item.id = id
    item.classList.add('content-item')
    const p = document.createElement('p')
    p.classList.add('content-item-text')
    p.textContent = text
    
    item.appendChild(p)
    
    if (date) {
        const p = document.createElement('p')
        const formattedDate = formatDate(date)
        p.textContent = formattedDate
        item.appendChild(p)
    }

    if (tag) {
        const span = document.createElement('span')
        span.textContent = tag
        item.appendChild(span)
    }
    console.log(href);
    
    console.log(score);
    console.log(crud);
    
    
    if (crud  || score !== null ) {
        
        const div = document.createElement('div')
        div.classList.add('item-actions')
        
        if (crud) { 
            href = null
            const aRemoveBtn = document.createElement('a')
            aRemoveBtn.textContent = 'Remover'
            aRemoveBtn.addEventListener('click', (event) => {
                // event.preventDefault()
                (crud.remove)()
                })
            div.appendChild(aRemoveBtn)

            const aEditBtn = document.createElement('a')
            aEditBtn.textContent = 'Editar'
            aEditBtn.href = crud.edit
            div.appendChild(aEditBtn)
        }

        if (score >= 0) {
            
            const seeAnswers = document.createElement('a')
            seeAnswers.textContent = 'Ver Respostas'
            seeAnswers.href = href
            div.appendChild(seeAnswers)

            const grade = document.createElement('p')
            grade.textContent = `${score}/10`
            div.appendChild(grade)

        }
        item.appendChild(div)
    }
    

    if (action) {
        const a = document.createElement('a')
        a.textContent = action
        item.appendChild(a)
        a.id = 'content-item-anchor'

    }

    if (href) {
        item.addEventListener('click', () => {
            window.location.href = href
        })
        item.style.cursor = 'pointer'
        }
    return item
}