import searchTerm from "../utils/searchTerm.js"
import { informationArtist } from "../utils/getArtist.js"
import { informationArtwork } from "../utils/getArtwork.js"

const search = (main) => {

    const searchSection = document.createElement('section')

    const animationSection = document.createElement('section')

    const responseSection = document.createElement('section')

    let animationState = 1

    const [ignore, term] = location.hash.split('=')

    const responseSectionContent = async (term) => {
        responseSection.innerHTML = ''

        const data = await searchTerm(term)

        animationState = false
        animationSection.innerHTML = ''

        const searchDescription = document.createElement('p')
        location.hash.includes('=') ? searchDescription.textContent = `Results related to ${term.replace('%20', ' ')}...` : searchDescription.textContent = `Results related to ${term}...`

        const artistsDiv = document.createElement('div')

        const titleArtistsDiv = document.createElement('h2')
        titleArtistsDiv.textContent = 'Artists'

        artistsDiv.appendChild(titleArtistsDiv)

        if (data.artists.length != 0) {
            for (const artistInformation of data.artists) {
                const artistDiv = document.createElement('div')
                const artistTitle = document.createElement('h2')
                artistTitle.textContent = artistInformation.title
                artistDiv.appendChild(artistTitle)
                artistsDiv.appendChild(artistDiv)

                artistDiv.addEventListener('click', () => {
                    location.hash = `#artist=${artistInformation.id}`
                    informationArtist()
                })
            }
        } else {
            const noArtistResults = document.createElement('p')
            noArtistResults.textContent = 'No artist results'
            artistsDiv.appendChild(noArtistResults)
        }



        const artworksDiv = document.createElement('div')

        const titleArtworksDiv = document.createElement('h2')
        titleArtworksDiv.textContent = 'Artwoks'

        artworksDiv.appendChild(titleArtworksDiv)

        if (data.artworks.length != 0) {

            for (const artworkInformation of data.artworks) {
                const artworkDiv = document.createElement('div')
                const artworkDate = document.createElement('p')
                artworkInformation.date_display == null || artworkInformation.date_display == '' ? artworkDate.textContent = 'Unknown' : artworkDate.textContent = artworkInformation.date_display
                const artworkTitle = document.createElement('h2')
                artworkInformation.title == null || artworkInformation.title == '' ? artworkInformation.title = 'Untitle' : artworkTitle.textContent = artworkInformation.title
                const artworkFigure = document.createElement('figure')
                const artworkImg = document.createElement('img')
                if (artworkInformation.image_id != null || artworkInformation.image_id != undefined) { artworkImg.setAttribute('src', `https://www.artic.edu/iiif/2/${artworkInformation.image_id}/full/256,/0/default.jpg`) }
                artworkFigure.appendChild(artworkImg)
                artworkDiv.append(artworkFigure, artworkDate, artworkTitle)
                artworksDiv.appendChild(artworkDiv)

                artworkDiv.addEventListener('click', () => {
                    location.hash = `#artwork=${artworkInformation.id}`
                    informationArtwork()
                })
            }
        } else {
            const noArtworksResults = document.createElement('p')
            noArtworksResults.textContent = 'No artworks results'
            artworksDiv.appendChild(noArtworksResults)
        }



        responseSection.append(searchDescription, artistsDiv, artworksDiv)
    }

    if (location.hash.includes('=')) {
        responseSectionContent(term)
    }



    const animationSectionContent = () => {

        const searches = { artist: ['artist', 'url'], artwork: ['artwork', 'url'] }

        const figure = document.createElement('figure')
        const img = document.createElement('img')
        figure.appendChild(img)
        img.setAttribute('alt', 'artwork')
        img.setAttribute('title', 'artwork')

        const description = document.createElement('p')
        description.textContent = 'Search by artwork...'

        animationSection.append(figure, description)

        const animation = (word) => {

            animationSection.innerHTML = ''
            figure.appendChild(img)
            img.setAttribute('alt', `${word}`)
            img.setAttribute('title', `${word}`)

            const description = document.createElement('p')
            description.textContent = `Search by ${word}...`

            animationSection.append(figure, description)
        }

        setInterval(() => {

            switch (animationState) {
                case 1:
                    animation(searches['artist'][0])
                    animationState = 0
                    break;
                case 0:
                    animation(searches['artwork'][0])
                    animationState = 1
                    break;

                default:
                    break;
            }
        }, 3000)

    }

    animationSectionContent()

    const searchSectionContent = () => {

        const searchField = document.createElement('input')
        searchField.setAttribute('type', 'text')
        searchField.setAttribute('placeholder', 'Search...')

        const searchButton = document.createElement('button')
        const searchFigure = document.createElement('figure')
        const searchImg = document.createElement('img')
        searchImg.setAttribute('alt', 'search')
        searchImg.setAttribute('title', 'search')
        searchFigure.appendChild(searchImg)
        searchButton.appendChild(searchFigure)

        searchButton.addEventListener('click', async (event) => {
            searchField.value != '' && searchField.value != ' ' && searchField.value != '%20' ? location.hash = `#search=${searchField.value}` : event.preventDefault()
        })

        searchSection.append(searchField, searchButton)
    }

    searchSectionContent()



    main.append(searchSection, animationSection, responseSection)


}

export default search