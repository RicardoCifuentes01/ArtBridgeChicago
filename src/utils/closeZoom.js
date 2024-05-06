import imageWork from "./imageWork.js"

const closeZoom = async (id, workCategory, card, figureWork) => {

    const image = await imageWork(id, workCategory)

    const header = document.querySelector('header')
    const main = document.querySelector('main')
    const nav = document.querySelector('nav')
    const footer = document.querySelector('footer')
    const information = await card.children[1]

    header.classList.remove('header--hidden')
    main.classList.remove('main--zoom')
    card.classList.remove('card--zoom')
    image.height > image.width ? card.className = 'cardVertical' : card.className = 'card'
    nav.classList.remove('nav--hidden')
    footer.classList.remove('footer--hidden')
    main.removeChild(main.children[1])


    if (image.height > image.width) {
        information.className = 'informationWork informationWorkVertical'
        figureWork.className = 'figureWork figureWorkVertical'
    } else {
        information.className = 'informationWork'
        figureWork.className = 'figureWork'
    }

    const imgWork = figureWork.children[0]
    imgWork.className = ''

    const statusZoom = false
    return statusZoom
}

export default closeZoom