import loadingImage from "./loadingImage.js"

const observer = new IntersectionObserver((elements) => {
    elements.forEach((element) => {
        if (element.isIntersecting) {
            const urlImg = element.target.getAttribute('data-img')
            element.target.setAttribute('src', urlImg)
            loadingImage(element.target.parentElement, element.target)
        }

    })
})

export default observer