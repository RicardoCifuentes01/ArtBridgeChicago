import imageWork from "./imageWork.js"

const viewWork = async (id, workCategory) => {

    const image = await imageWork(id, workCategory)

    image.onload = function () {
        if (image.height > image.width && window.innerWidth > 600) {
            const card = document.getElementsByClassName('card')[0]
            const figure = card.children[0]
            const information = card.children[1]
            const like = information.children[0]
            card.classList.add('cardVertical')
            figure.classList.add('figureWorkVertical')
            information.classList.add('informationWorkVertical')
            workCategory == 'product' ? like.classList.add('buttonLikeVerticalProduct') : like.classList.add('buttonLikeVertical')
        }
    }

}

export default viewWork