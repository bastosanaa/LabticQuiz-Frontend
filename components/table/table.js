
import { Dialog } from "../dialog/dialog.js"
import { Toast } from "../toast/toast.js"

export function Table({columns = [], rows=[], parser, removeAction}) {
    const body = document.querySelector('body')
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

    console.log(rows);
    

    rows.forEach(row => {
        const parsedRowObj = parser(row)
        // console.log(parsedRowObj)
        
        const bodyTr = document.createElement('tr')
        columns.forEach(column  => {
            const data = parsedRowObj[removeAccentsAndCapitalLetters(column)]
            const td = document.createElement('td')
            td.textContent = data
            bodyTr.appendChild(td)
        })

        const tdAnchor = document.createElement('td')

        const aRemoveBtn = document.createElement('a')
        aRemoveBtn.textContent = 'Remover'
        aRemoveBtn.classList.add('crud-anchor')
        aRemoveBtn.addEventListener('click', () => {
            const token = localStorage.getItem('token')
            const dialog = Dialog({
                header: 'Tem certeza?',
                description: 'um texto qualquer que vou ter que arrumar depois',
                buttons: [
                    {
                        type: 'outline',
                        size: 'small',
                        text: 'Cancelar',
                        action: () => {
                            dialog.close()
                        }
                    },
                    {
                        type: 'destructive',
                        size: 'small',
                        text: 'Excluir',
                        action: () => {
                            removeAction(token,row._id)
                            dialog.close()
                            const toast = Toast({
                                message: 'Disciplina removida com sucesso',
                                reloadPage: true
                            })
                            body.append(toast)
                                
                        }
                    }
                ]
                
            })
            
            body.append(dialog)
            dialog.showModal()
        })
        tdAnchor.appendChild(aRemoveBtn)


        const aEditBtn = document.createElement('a')
        const id = row._id
        aEditBtn.textContent = 'Editar'
        aEditBtn.setAttribute('href', `http://127.0.0.1:5501/pages/adm/painel/subject/edit/editSubject.html?id=${id}`)
        aEditBtn.classList.add('crud-anchor')
        tdAnchor.appendChild(aEditBtn)
        bodyTr.appendChild(tdAnchor)
        tbody.appendChild(bodyTr)
    })

    function removeAccentsAndCapitalLetters(str) {
        const lowerCasedStr = str.toLowerCase()
        return lowerCasedStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    


    table.appendChild(tbody)

    return table


}