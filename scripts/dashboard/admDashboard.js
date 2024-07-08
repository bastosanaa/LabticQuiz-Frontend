
const contentItemOption = document.querySelectorAll(".section-content-item")
const url = 'http://127.0.0.1:5501'



console.log(contentItemOption);
contentItemOption.forEach(item => item.addEventListener('click', () => {
    const painelID = item.id
    window.location.href = `${url}/painel${painelID}.html`
}))