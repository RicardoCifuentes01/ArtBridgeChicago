import deleteFavorites from "../utils/deleteFavorites.js"
import styles from "../utils/styles.js"

const favorites = (main) => {

    //STYLES
    styles('favorites')
    main.className = 'mainFavorites'

    //PRESENTATION
    const titleFavorites = document.createElement('h1')
    titleFavorites.textContent = 'Your favorites'

    main.appendChild(titleFavorites)

    const artworks = {}
    const artists = {}
    const products = {}

    const categories = { 'Artworks': artworks, 'Artists': artists, 'Products': products }

    //MESSAGE
    const messageFavorites = document.createElement('p')
    messageFavorites.setAttribute('class', 'messageFavorites')
    messageFavorites.textContent = 'You still don’t have any favorites 💔. Visit artworks 🖼️, artists 👩‍🎨 or the store 🛒.'

    if (localStorage.length != 0) {
        for (const key in localStorage) {
            if (Object.hasOwnProperty.call(localStorage, key)) {
                const favorite = JSON.parse(localStorage.getItem(key))
                const nameCategory = favorite.page.slice(1).charAt(0).toUpperCase() + favorite.page.slice(1).slice(1)
                categories[`${nameCategory}s`][key] = favorite
            }
        }
    } else {
        main.appendChild(messageFavorites)
    }

    //SECTION FAVORITE
    const sectionFavorite = (title) => {
        const section = document.createElement('section')
        const sectionTitle = document.createElement('h2')
        sectionTitle.textContent = title
        section.appendChild(sectionTitle)
        section.className = title
        main.append(section)

        return section
    }

    //FAVORITES
    const presentationFavorite = (key, favorite, section, category) => {
        const divFavorite = document.createElement('div')

        if (favorite.image != '' && favorite.image != undefined) {
            const figureFavorite = document.createElement('figure')
            figureFavorite.className = 'figureFavorite'
            const imgFavorite = document.createElement('img')
            imgFavorite.setAttribute('alt', favorite.title)
            imgFavorite.setAttribute('title', favorite.title)
            imgFavorite.setAttribute('src', favorite.image)
            figureFavorite.appendChild(imgFavorite)

            divFavorite.append(figureFavorite)

            figureFavorite.addEventListener('click', () => {
                location.hash = `${favorite.page}=${key}`
            })
        }

        const titleFavorite = document.createElement('h3')
        titleFavorite.textContent = favorite.title

        titleFavorite.addEventListener('click', () => {
            location.hash = `${favorite.page}=${key}`
        })

        //BUTTON DISLIKE
        const ns = 'http://www.w3.org/2000/svg'

        const buttonDislike = document.createElement('figure')
        category[key].page == '#product' ? buttonDislike.classList.add('svgFillProduct') : buttonDislike.classList.add('svgFill')
        buttonDislike.classList.add('buttonDislikeFavorites')

        const svgDislike = document.createElementNS(ns, 'svg')
        svgDislike.setAttribute('viewBox', '0 0 512 512')
        svgDislike.setAttribute('width', '24')
        svgDislike.setAttribute('height', '24')
        svgDislike.setAttribute('title', 'Dislike')
        svgDislike.setAttribute('alt', 'Dislike')
        svgDislike.setAttribute('id', 'heart')

        const pathDislike = document.createElementNS(ns, 'path')
        pathDislike.setAttribute('id', 'pathHeart')
        pathDislike.setAttribute('d', 'M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z')

        svgDislike.appendChild(pathDislike)

        buttonDislike.appendChild(svgDislike)

        buttonDislike.addEventListener('click', () => {
            category[key].page == '#product' ? buttonDislike.classList.add('dislikeProduct') : buttonDislike.classList.add('dislike')

            setTimeout(() => {
                category[key].page == '#product' ? buttonDislike.classList.remove('svgFillProduct') : buttonDislike.classList.remove('svgFill')
                deleteFavorites(key)
                const deleteDiv = buttonDislike.parentNode
                deleteDiv.parentNode.removeChild(deleteDiv)

                delete category[key]

                if (Object.keys(category).length == 0) {
                    main.removeChild(section.parentNode)
                }

                if (localStorage.length == 0) {
                    main.appendChild(messageFavorites)
                }
            }, 800)
        })

        divFavorite.append(titleFavorite, buttonDislike)
        section.appendChild(divFavorite)

    }

    //SECTIONS
    for (const category in categories) {
        if (Object.keys(categories[category]).length != 0) {
            const section = sectionFavorite(category)
            const divCategory = document.createElement('div')
            divCategory.className = 'divCategory'
            section.appendChild(divCategory)
            for (const key in categories[category]) {
                presentationFavorite(key, categories[category][key], divCategory, categories[category])
            }
        }
    }


}

export default favorites