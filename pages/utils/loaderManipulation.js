export function hideLoader() {
    const loader = document.querySelector('.loader-wrapper')
    loader.style.display = 'none'
}

export function showLoader() {
    const loader = document.querySelector('.loader-wrapper')
    loader.style.display = 'block'

}