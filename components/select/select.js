export function Select({title=null, tooltipText = null, options}) {
    
    const selectContainer = document.createElement('div')
    selectContainer.classList.add('select-container')

    if (title) {
        const label = document.createElement('label')
        label.textContent = title
        selectContainer.append(label)
        if (tooltipText) {
            const tooltip = document.createElement('img')
            tooltip.setAttribute('src', '/assets/question.svg' )
            tooltip.setAttribute('alt', 'interrogação')
            tooltip.setAttribute('title', tooltipText)
            label.appendChild(tooltip)
        }
    }


    const select = document.createElement('select')

    // options input format 
    // {
    //     text: 'Avaliação',
    //     value: 'avaliacao'
    // }

    options.forEach(option => {
        const newOption = document.createElement('option')
        newOption.textContent = option.text

        if (option.value === '') {
            newOption.value = ''
        }

        newOption.value = option.value

        select.append(newOption)
    })

    selectContainer.appendChild(select)


    return selectContainer
}