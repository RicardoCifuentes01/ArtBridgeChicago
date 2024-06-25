const loadingImage = async (figure, image) => {
    figure.class = ''
    figure.classList.add('loadingImage')
    image.classList.add('img--loadingImage')

    image.addEventListener('load', function () {
        figure.classList.remove('loadingImage')
        image.classList.remove('img--loadingImage')
    })
}

export default loadingImage