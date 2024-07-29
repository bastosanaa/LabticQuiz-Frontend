export function Table({columns = [], rows=[]}) {
    const table = document.createElement('table')

    //table head
    const thead = document.createElement('thead')
    table.appendChild(thead)

    const headTr = document.createElement('tr')

    columns.forEach(column => {
        const th = document.createElement('th')
        th.textContent = column
        if (columns.indexOf(column) <= 1) {
            th.classList.add('full-table-space')
        } else {
            th.classList.add('half-table-space')
        }
        headTr.appendChild(th)
    })
    const th = document.createElement('th')
    th.textContent = 'Ações'
    headTr.appendChild(th)

    thead.appendChild(headTr)
    table.appendChild(thead)

    //tbale body
    const tbody = document.createElement('tbody')
    table.appendChild(tbody)

    rows.forEach(row => {
        const bodyTr = document.createElement('tr')
        row.forEach(data => {
            const td = document.createElement('td')
            td.textContent = data
            bodyTr.appendChild(td)

        })
        const tdAnchor = document.createElement('td')

        const aRemoveBtn = document.createElement('a')
        aRemoveBtn.textContent = 'Remover'
        aRemoveBtn.classList.add('crud-anchor')
        tdAnchor.appendChild(aRemoveBtn)

        const aEditBtn = document.createElement('a')
        aEditBtn.textContent = 'Editar'
        aEditBtn.classList.add('crud-anchor')
        tdAnchor.appendChild(aEditBtn)
        bodyTr.appendChild(tdAnchor)
        tbody.appendChild(bodyTr)
    })

    


    table.appendChild(tbody)

    return table


}