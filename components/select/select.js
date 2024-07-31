export function Select({title, tooltipText = null, options}) {
    
    const selectContainer = document.createElement('div')
    selectContainer.classList.add('select-container')

    const label = document.createElement('label')
    label.textContent = title

    if (tooltipText) {
        const tooltip = document.createElement('img')
        tooltip.setAttribute('src', './assets/question.svg' )
        tooltip.setAttribute('alt', 'interrogação')
        tooltip.setAttribute('title', tooltipText)
        label.appendChild(tooltip)
    }
    selectContainer.append(label)

    const select = document.createElement('select')

    options.forEach(option => {
        const newOption = document.createElement('option')
        newOption.textContent = option.text

        if (option.value === '') {
            newOption.value = ''
            newOption.disabled = 'true'
        }

        select.append(newOption)
    })

    selectContainer.appendChild(select)


    return selectContainer
}