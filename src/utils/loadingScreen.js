const loadingScreen = () => {
    const loadingScreenElement = document.getElementById('loadingScreen')
    loadingScreenElement.innerText = ''
    loadingScreenElement.style.display = 'grid'

    const containerLoader = document.createElement('div')
    containerLoader.setAttribute('class', 'containerLoader')
    loadingScreenElement.appendChild(containerLoader)

    const loader = document.createElement('div')
    loader.setAttribute('class', 'loader')
    containerLoader.appendChild(loader)
}

export default loadingScreen