import deleteFavorites from "../utils/deleteFavorites.js"

const favorites = (main) => {

    const titleFavorites = document.createElement('h1')
    titleFavorites.textContent = 'Your favorites'

    main.appendChild(titleFavorites)

    const artworks = {}
    const artists = {}
    const products = {}

    const categories = { 'Artworks': artworks, 'Artists': artists, 'Products': products }

    const message = document.createElement('p')
    message.textContent = 'You still don’t have any favorites 💔. Visit artworks 🖼️, artists 👩‍🎨 or the store 🛒.'

    if (localStorage.length != 0) {
        for (const key in localStorage) {
            if (Object.hasOwnProperty.call(localStorage, key)) {
                const favorite = JSON.parse(localStorage.getItem(key))
                const nameCategory = favorite.page.slice(1).charAt(0).toUpperCase() + favorite.page.slice(1).slice(1)
                categories[`${nameCategory}s`][key] = favorite
            }
        }
    } else {
        main.appendChild(message)
    }

    const sectionFavorite = (title) => {
        const section = document.createElement('section')
        const sectionTitle = document.createElement('h2')
        sectionTitle.textContent = title
        section.appendChild(sectionTitle)
        section.className = title
        main.append(section)

        return section
    }

    const presentationFavorite = (key, favorite, section, category) => {
        const divFavorite = document.createElement('div')

        if (favorite.image != '') {
            const figureFavorite = document.createElement('figure')
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

        const buttonDislike = document.createElement('figure')

        const imgDislike = document.createElement('img')
        imgDislike.setAttribute('alt', 'buttonDislike')
        imgDislike.setAttribute('title', 'buttonDislike')
        buttonDislike.appendChild(imgDislike)

        buttonDislike.addEventListener('click', () => {
            deleteFavorites(key)
            const deleteDiv = buttonDislike.parentNode
            deleteDiv.parentNode.removeChild(deleteDiv)

            delete category[key]

            if (Object.keys(category).length == 0) {
                main.removeChild(section)
            }

            if (localStorage.length == 0) {
                main.appendChild(message)
            }

        })

        divFavorite.append(titleFavorite, buttonDislike)
        section.appendChild(divFavorite)

    }

    for (const category in categories) {
        if (Object.keys(categories[category]).length != 0) {
            const section = sectionFavorite(category)
            for (const key in categories[category]) {
                presentationFavorite(key, categories[category][key], section, categories[category])
            }
        }
    }


}

export default favorites