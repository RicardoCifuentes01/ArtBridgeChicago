import saveFavorites from "./saveFavorites.js"
import deleteFavorites from "./deleteFavorites.js"

const like = (page, id, card, button, heart, path) => {
    if (localStorage.getItem(id) != null) {
        setTimeout(() => { heart.classList.add('svgFill') }, 700)
        button.children[0].alt = 'buttonDislike'
        button.children[0].title = 'buttonDislike'
        button.children[0].src = 'https://i.ibb.co/Wc6VLy9/amor-1.png'
        button.addEventListener('click', () => {
            deleteFavorites(id)
            heart.classList.remove('like')
            path.classList.remove('like')
            heart.classList.add('dislike')
            path.classList.add('dislike')
            setTimeout(() => { heart.classList.remove('svgFill') }, 700)
            button.children[0].alt = 'buttonLike'
            button.children[0].title = 'buttonLike'
            like(page, id, card, button, heart, path)
        })
    } else {
        button.addEventListener('click', () => {
            saveFavorites(page, id, card.image, card.title)
            heart.classList.remove('dislike')
            path.classList.remove('dislike')
            heart.classList.add('like')
            path.classList.add('like')
            setTimeout(() => { heart.classList.add('svgFill') }, 700)
            button.children[0].alt = 'buttonDislike'
            button.children[0].title = 'buttonDislike'
            like(page, id, card, button, heart, path)
        })
    }
}

export default like