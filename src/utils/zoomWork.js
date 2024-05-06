import imageWork from "./imageWork.js"

const zoomWork = async (id, workCategory, card, figureWork) => {

    const image = await imageWork(id, workCategory)

    const header = document.querySelector('header')
    const main = document.querySelector('main')
    const nav = document.querySelector('nav')
    const footer = document.querySelector('footer')
    const information = await card.children[1]

    header.className = 'header--hidden'
    main.className = 'main--zoom'
    card.className = 'card--zoom'
    nav.className = 'nav--hidden'
    footer.className = 'footer--hidden'
    information.className = 'informationWork--hidden'

    figureWork.className = 'figure--zoom'

    const imgWork = figureWork.children[0]

    if (image.height > image.width) {
        imgWork.className = 'img--zoom--vertical'
    } else {
        window.innerHeight >= window.innerWidth ? imgWork.className = 'img--zoom--mobile' : imgWork.className = 'img--zoom'
    }

    const figureCloseZoom = document.createElement('figure')
    const imgClose = document.createElement('img')
    figureCloseZoom.appendChild(imgClose)
    workCategory == 'product' ? imgClose.setAttribute('src', 'https://i.ibb.co/f1rmbsp/Group-22.png') : imgClose.setAttribute('src', 'https://i.ibb.co/kHR4yX1/Group-33.png')
    imgClose.setAttribute('alt', 'close')
    imgClose.setAttribute('title', 'close')
    figureCloseZoom.className = 'figureClose'
    main.appendChild(figureCloseZoom)

    return figureCloseZoom
}

export default zoomWork