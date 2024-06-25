import searchTerm from "../utils/searchTerm.js"
import { informationArtist } from "../utils/getArtist.js"
import { informationArtwork } from "../utils/getArtwork.js"
import styles from "../utils/styles.js"
import loadingImage from "../utils/loadingImage.js"

const search = async (main) => {

    //STYLES
    styles('search')
    main.className = 'mainSearch'

    //SECTIONS
    const searchSection = document.createElement('section')
    searchSection.setAttribute('class', 'searchSection')

    const animationSection = document.createElement('section')
    animationSection.setAttribute('class', 'animationSection')

    const responseSection = document.createElement('section')
    responseSection.setAttribute('class', 'responseSection')

    const [ignore, term] = location.hash.split('=')

    //RESPONSE
    const responseSectionContent = async (term) => {
        responseSection.innerHTML = ''

        const data = await searchTerm(term)

        animationSection.innerHTML = ''

        const searchDescription = document.createElement('p')
        searchDescription.setAttribute('class', 'messageSearch')
        location.hash.includes('=') ? searchDescription.innerHTML = `Results related to <span class="termSearch">${decodeURI(term)}<span>` : searchDescription.textContent = `Results related to ${term}...`

        //ARTISTS
        const responseArtists = document.createElement('div')
        responseArtists.setAttribute('class', 'responseArtists')

        const titleResponseArtists = document.createElement('h2')
        titleResponseArtists.setAttribute('class', 'titleResponse')
        titleResponseArtists.textContent = 'Artists'

        const artistsCards = document.createElement('ul')
        artistsCards.setAttribute('class', 'artistsCards')

        responseArtists.append(titleResponseArtists, artistsCards)

        if (data.artists.length != 0) {
            for (const artistInformation of data.artists) {

                const responseArtworksArtist = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${artistInformation.title}&fields=title&page=1`)
                const informationArtworksArtist = await responseArtworksArtist.json()


                const artistCard = document.createElement('li')
                artistCard.setAttribute('class', 'artistCard')
                const artistTitle = document.createElement('h2')
                artistTitle.setAttribute('class', 'artistTitleResponse')
                const titleArtworksArtistCard = document.createElement('h3')
                titleArtworksArtistCard.setAttribute('class', 'titleArtworksArtistCard')
                titleArtworksArtistCard.innerText = 'Artworks'
                const artistArtworksDiv = document.createElement('div')
                artistTitle.textContent = artistInformation.title
                artistCard.append(artistTitle, titleArtworksArtistCard, artistArtworksDiv)
                artistsCards.appendChild(artistCard)


                for (const titles of informationArtworksArtist.data) {
                    const titleArtworkArtist = document.createElement('p')
                    titleArtworkArtist.setAttribute('class', 'titleArtworkArtist')
                    titleArtworkArtist.innerText = `${titles.title}`
                    artistArtworksDiv.appendChild(titleArtworkArtist)
                }

                artistCard.addEventListener('click', () => {
                    location.hash = `#artist=${artistInformation.id}`
                    informationArtist()
                })
            }
        } else {
            const noArtistResults = document.createElement('p')
            noArtistResults.setAttribute('class', 'noResults')
            noArtistResults.textContent = `There are not results related to ${term}`
            responseArtists.appendChild(noArtistResults)
        }


        //ARTWORKS
        const responseArtworks = document.createElement('div')
        responseArtworks.setAttribute('class', 'responseArtworks')

        const titleResponseArtworks = document.createElement('h2')
        titleResponseArtworks.setAttribute('class', 'titleResponse')
        titleResponseArtworks.textContent = 'Artwoks'

        const artworksCards = document.createElement('ul')
        artworksCards.setAttribute('class', 'artworksCards')

        responseArtworks.append(titleResponseArtworks, artworksCards)

        if (data.artworks.length != 0) {

            for (const artworkInformation of data.artworks) {
                const artworkCard = document.createElement('li')
                artworkCard.setAttribute('class', 'artworkCard')
                const artworkDate = document.createElement('p')
                artworkDate.setAttribute('class', 'artworkDate')
                artworkInformation.date_display == null || artworkInformation.date_display == '' ? artworkDate.textContent = 'Unknown' : artworkDate.textContent = artworkInformation.date_display
                const artworkTitle = document.createElement('h2')
                artworkTitle.setAttribute('class', 'artworkTitle')
                artworkInformation.title == null || artworkInformation.title == '' ? artworkInformation.title = 'Untitle' : artworkInformation.title.length > 30 ? artworkTitle.textContent = `${artworkInformation.title.slice(0, 30)}...` : artworkTitle.textContent = artworkInformation.title
                const artworkFigure = document.createElement('figure')
                const artworkImg = document.createElement('img')
                artworkImg.setAttribute('class', 'artworkImg')
                artworkFigure.setAttribute('class', 'artworkFigure')
                if (artworkInformation.image_id != null || artworkInformation.image_id != undefined) { artworkImg.setAttribute('src', `https://www.artic.edu/iiif/2/${artworkInformation.image_id}/full/256,/0/default.jpg`) } else { artworkImg.setAttribute('src', '../src/assets/error/imageError.png') }
                artworkFigure.appendChild(artworkImg)
                artworkCard.append(artworkFigure, artworkDate, artworkTitle)
                artworksCards.appendChild(artworkCard)

                loadingImage(artworkFigure, artworkImg)

                artworkCard.addEventListener('click', () => {
                    location.hash = `#artwork=${artworkInformation.id}`
                    informationArtwork()
                })
            }
        } else {
            const noArtworksResults = document.createElement('p')
            noArtworksResults.setAttribute('class', 'noResults')
            noArtworksResults.textContent = `There are not results related to ${term}`
            responseArtworks.appendChild(noArtworksResults)
        }

        responseSection.append(searchDescription, responseArtists, responseArtworks)

        const searchLoadingScreen = document.getElementById('searchLoadingScreen')
        searchLoadingScreen.remove()
    }

    //SEARCH
    const searchSectionContent = () => {

        const searchField = document.createElement('input')
        searchField.setAttribute('type', 'text')
        searchField.setAttribute('placeholder', 'Search...')

        const searchButton = document.createElement('button')
        const searchFigure = document.createElement('figure')
        const searchImg = document.createElement('img')
        searchImg.setAttribute('alt', 'search')
        searchImg.setAttribute('title', 'search')
        searchImg.setAttribute('src', '../src/assets/search/searchSearch.png')
        searchFigure.appendChild(searchImg)
        searchButton.appendChild(searchFigure)

        searchButton.addEventListener('click', async (event) => {
            searchField.value != '' && searchField.value != ' ' && searchField.value != '%20' ? location.hash = `#search=${searchField.value}` : event.preventDefault()
        })

        searchSection.append(searchField, searchButton)
    }

    searchSectionContent()

    main.appendChild(searchSection)

    //LOADER
    if (location.hash.includes('=')) {

        const searchLoadingScreen = document.createElement('div')
        searchLoadingScreen.setAttribute('class', 'searchLoadingScreen')
        searchLoadingScreen.setAttribute('id', 'searchLoadingScreen')

        const containerLoader = document.createElement('div')
        containerLoader.setAttribute('class', 'containerLoader')
        searchLoadingScreen.appendChild(containerLoader)

        const loader = document.createElement('div')
        loader.setAttribute('class', 'loader')
        containerLoader.appendChild(loader)

        const searchingMessage = document.createElement('p')
        searchingMessage.innerHTML = `<p>Searching for <span class="searchingTerm">"${decodeURI(term)}"</span>...</p>`
        searchLoadingScreen.appendChild(searchingMessage)

        main.appendChild(searchLoadingScreen)

        responseSectionContent(term)
    }

    //ANIMATION SECTION
    const animationSectionContent = () => {

        let animationState = 1

        const searches = { artist: ['artist', 'url'], artwork: ['artwork', 'url'] }

        const figure = document.createElement('figure')
        figure.setAttribute('class', 'figureAnimation')
        const img = document.createElement('img')
        figure.appendChild(img)
        img.setAttribute('alt', 'artwork')
        img.setAttribute('title', 'artwork')
        img.setAttribute('src', 'https://i.ibb.co/FXnvBb0/photo-2023-08-10-15-50-41.png')

        const description = document.createElement('p')
        description.textContent = 'Search by artwork...'

        animationSection.append(figure, description)

        const animation = (word, urlImage) => {

            animationSection.innerHTML = ''
            figure.appendChild(img)
            img.setAttribute('alt', `${word}`)
            img.setAttribute('title', `${word}`)
            img.setAttribute('src', urlImage)

            const description = document.createElement('p')
            description.innerHTML = `Search by <span class="CategoryWordAnimation">${word}</span>...`

            animationSection.append(figure, description)
        }

        setInterval(() => {

            switch (animationState) {
                case 1:
                    animation(searches['artist'][0], '../src/assets/search/artist.png')
                    animationState = 0
                    break;
                case 0:
                    animation(searches['artwork'][0], '../src/assets/search/artwork.png')
                    animationState = 1
                    break;

                default:
                    break;
            }
        }, 3000)

    }

    if (!location.hash.includes('=')) {
        animationSectionContent()
    }

    main.append(animationSection, responseSection)

}

export default search