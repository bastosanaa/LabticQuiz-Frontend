const contentItemOption = document.querySelectorAll(".section-content-item")

console.log(contentItemOption);
contentItemOption.forEach(item => item.addEventListener('click', () => {
    painelID = item.id
    console.log(item.id)
    window.location.href = `http://127.0.0.1:5500/painel${painelID}.html`
}))