export function Multiselect(options, title) {

    //mudar logica de itens iniciais quando puxar os dados do back
    let itemsSelected = []
    let itemsAvailable = options

    // DOM structure

    const multiselect = document.createElement('div')
    multiselect.classList.add('multiselect')

    const p = document.createElement('p')
    p.classList.add('input-label')
    p.textContent = title
    multiselect.appendChild(p)

    const selected = document.createElement('div')
    selected.classList.add('container-selected')

    const caret = document.createElement('img')
    caret.setAttribute('src', '/assets/caret-back.svg')
    caret.style.position = 'absolute'
    caret.style.right = '1rem'
    selected.appendChild(caret)

    const selectedUl = document.createElement('ul')
    selected.appendChild(selectedUl)

    multiselect.appendChild(selected)
    
    const selection = document.createElement('div')
    selection.classList.add("container-selection", "hidden")
    multiselect.appendChild(selection)

    selected.addEventListener('click', () => {
        selection.classList.toggle('hidden')
        if (!selection.classList.contains('hidden')){
            caret.style.transform = 'rotate(-90deg)'
        } else {
            caret.style.transform = 'rotate(0deg)'
        }
    })
    
    const selectionSelectedUl = document.createElement('ul')
    const selectionUnselectedUl = document.createElement('ul')

    selection.appendChild(selectionSelectedUl)
    selection.appendChild(selectionUnselectedUl)

    //logic
    function loadSelection(){
        selectionSelectedUl.innerHTML = ''
        itemsSelected.forEach(option => {
            const li = document.createElement('li')
            li.classList.add('item-selected')
            const p = document.createElement('p')
            p.textContent = option.name
            li.appendChild(p)
            selectionSelectedUl.appendChild(li)

            li.addEventListener('click', () => {
                
                switchLists(option, itemsSelected, itemsAvailable)
                loadSelection()
                loadSelected()
            })
        })
    
        selectionUnselectedUl.innerHTML = ''
        itemsAvailable.forEach(option => {
            const li = document.createElement('li')
            const p = document.createElement('p')
            p.textContent = option.name
            li.appendChild(p)
            selectionUnselectedUl.appendChild(li)
    
            li.addEventListener('click', () => {
                
                switchLists(option, itemsAvailable, itemsSelected)
                loadSelection()
                loadSelected()
            })
        })
    }

    function loadSelected() {
        selectedUl.innerHTML = ''
        itemsSelected.forEach(item => {
            const li = document.createElement('li')
            
            const p = document.createElement('p')
            li.appendChild(p)
            p.textContent = item.name

            selectedUl.appendChild(li)
        })
    }

    loadSelection()

    return {multiselect, itemsSelected}

}

function switchLists(item, fromList, toList) {    
    let itemIndex = fromList.indexOf(item)
    fromList.splice(itemIndex, 1)
    toList.push(item)
}
