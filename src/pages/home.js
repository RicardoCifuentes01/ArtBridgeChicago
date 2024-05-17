import { informationArtworkRandom } from "../utils/getArtworkRandom.js"
import { informationArtwork } from "../utils/getArtwork.js"
import artwork from "./artwork.js"
import store from "./store.js"
import styles from "../utils/styles.js"

const home = async (main) => {
    //STYLES
    styles('home')
    main.className = 'mainHome'

    //PRESENTATION
    const presentation = () => {
        const presentationSeciton = document.createElement('section')
        presentationSeciton.setAttribute('class', 'presentationSection')

        const figureABC = document.createElement('figure')
        figureABC.setAttribute('class', 'figureABC')
        const imgABC = document.createElement('img')
        imgABC.title = 'Art Bridge Chicago'
        imgABC.alt = 'Presentation image of Art Bridge Chicago.'
        imgABC.src = 'https://i.ibb.co/SyPjg1q/OIG-removebg-preview.png'
        figureABC.appendChild(imgABC)

        const titleABC = document.createElement('h1')
        titleABC.setAttribute('class', 'titleABC')
        titleABC.innerHTML = `ART<br>BRIDGE<br>CHICAGO`

        const descriptionABC = document.createElement('p')
        descriptionABC.setAttribute('class', 'descriptionABC')
        descriptionABC.textContent = '“Art Bidge Chicago” offers a unique experience for art lovers by consuming data from the API of the “Institute Art Chicago”. You can consult information about artists and their works, as well as explore exclusive products from the store. We invite you to explore everything we have to offer!'

        presentationSeciton.append(figureABC, titleABC, descriptionABC)

        return presentationSeciton
    }

    //RANDOM
    const random = async () => {
        const randomWorkSection = document.createElement('section')
        randomWorkSection.setAttribute('class', 'randomWorkSection')
        const titleRandomWorksSection = document.createElement('h2')
        titleRandomWorksSection.setAttribute('class', 'titleRandomWorksSection')
        titleRandomWorksSection.textContent = 'Random artwork'

        const filterArtwork = async (information) => {

            const artwork = await information

            const filteredArtwork = {}

            filteredArtwork['id'] = artwork.id
            filteredArtwork['image'] = artwork.image_id
            artwork.date_display == '' || artwork.date_display == null ? filteredArtwork['year'] = 'Unknown' : filteredArtwork['year'] = artwork.date_display
            artwork.title == '' || artwork.title == null ? filteredArtwork['title'] = 'Untitled' : filteredArtwork['title'] = artwork.title
            return filteredArtwork
        }

        let filteredInformation = await filterArtwork(informationArtworkRandom())

        const elementsRandomWorksSection = (filteredInformation) => {

            randomWorkSection.innerHTML = ''

            const figureRandomArtwork = document.createElement('figure')
            figureRandomArtwork.setAttribute('class', 'figureRandomArtwork')
            const imgRandomArtwork = document.createElement('img')
            filteredInformation.image != null ? imgRandomArtwork.src = `https://www.artic.edu/iiif/2/${filteredInformation.image}/full/256,/0/default.jpg` : imgRandomArtwork.src = 'https://i.ibb.co/DtyPY1N/Group-24.png'
            imgRandomArtwork.alt = filteredInformation.title
            imgRandomArtwork.title = filteredInformation.title
            figureRandomArtwork.appendChild(imgRandomArtwork)

            figureRandomArtwork.addEventListener('click', () => {
                location.hash = `#artwork=${filteredInformation.id}`
                informationArtwork()
            })

            const dateRandomArtwork = document.createElement('p')
            dateRandomArtwork.setAttribute('class', 'dateRandomArtwork')
            dateRandomArtwork.textContent = filteredInformation.year

            const titleRandomArtwork = document.createElement('h3')
            titleRandomArtwork.setAttribute('class', 'titleRandomArtwork')
            titleRandomArtwork.textContent = filteredInformation.title

            const figureRandomButton = document.createElement('figure')
            figureRandomButton.setAttribute('class', 'figureRandomButton')
            const imgRandomButton = document.createElement('img')
            imgRandomButton.alt = 'Random button'
            imgRandomButton.title = 'Random button'
            imgRandomButton.src = 'https://i.ibb.co/gWbRdtK/flecha-de-carga.png'
            figureRandomButton.appendChild(imgRandomButton)

            figureRandomButton.addEventListener('click', async () => {
                filteredInformation = await filterArtwork(informationArtworkRandom())
                elementsRandomWorksSection(filteredInformation)
            })

            randomWorkSection.append(titleRandomWorksSection, figureRandomArtwork, dateRandomArtwork, titleRandomArtwork, figureRandomButton)
        }

        elementsRandomWorksSection(filteredInformation)

        return randomWorkSection
    }

    //PRESENTATION-RANDOM DIV
    const presentationRandomDiv = document.createElement('div')
    presentationRandomDiv.setAttribute('class', 'presentationRandomDiv')
    presentationRandomDiv.append(presentation(), await random())

    //RECOMMENDED
    const recommended = async () => {

        const recommendedArtworksSection = document.createElement('section')
        recommendedArtworksSection.setAttribute('class', 'recommendedArtworksSection')

        const titleRecommendedArtworksSection = document.createElement('h2')
        titleRecommendedArtworksSection.setAttribute('class', 'titleRecommendedArtworksSection')
        titleRecommendedArtworksSection.textContent = 'Recommended Artworks'

        const descriptionRecommendedArtworksSection = document.createElement('p')
        descriptionRecommendedArtworksSection.setAttribute('class', 'descriptionRecommendedArtworksSection')
        descriptionRecommendedArtworksSection.textContent = 'Listing generated by the Art Institute of Chicago.'

        const recommendedArtworksDiv = document.createElement('div')
        recommendedArtworksDiv.setAttribute('class', 'recommendedArtworksDiv')

        const figuresRecommendedArtworks = document.createElement('ul')
        figuresRecommendedArtworks.setAttribute('class', 'figuresRecommendedArtworks')

        const selectedRecommendedArtwork = document.createElement('div')
        selectedRecommendedArtwork.setAttribute('class', 'selectedRecommendedArtwork')

        const titleMessageSelectArtwork = document.createElement('h3')
        titleMessageSelectArtwork.setAttribute('class', 'titleMessageSelectArtwork')
        titleMessageSelectArtwork.innerText = 'Select an artwork!'

        const figureMessageSelectArtwork = document.createElement('figure')
        figureMessageSelectArtwork.setAttribute('class', 'figureMessageSelectArtwork')
        const imgMessageSelectArtwork = document.createElement('img')
        imgMessageSelectArtwork.setAttribute('alt', 'Artworks')
        imgMessageSelectArtwork.setAttribute('title', 'Artworks')
        imgMessageSelectArtwork.setAttribute('src', 'https://i.ibb.co/FXnvBb0/photo-2023-08-10-15-50-41.png')
        figureMessageSelectArtwork.appendChild(imgMessageSelectArtwork)

        const messageSelectArtwork = document.createElement('p')
        messageSelectArtwork.setAttribute('class', 'messageSelectArtwork')
        messageSelectArtwork.innerHTML = `Welcome to the Art Institute of Chicago’s dynamic list of recommended artworks. This is not just a list, but a constantly evolving journey through the world of art. Each artwork featured here has been carefully selected to offer you a unique insight into its creation, its story, and its significance. As you navigate through this list, you will discover the rich tapestry of thoughts, emotions, and narratives that each piece of art weaves. 
        <br><br> Each selection you make is not just a choice, but a step into an exciting artistic adventure. As you delve deeper into each artwork, you will uncover the layers of creativity, skill, and passion that went into its creation. This is more than just an exploration, it’s a journey through the world of art. So, embark on this adventure and let the world of art unfold before you. Enjoy your journey!`

        selectedRecommendedArtwork.append(titleMessageSelectArtwork, figureMessageSelectArtwork, messageSelectArtwork)

        recommendedArtworksDiv.append(figuresRecommendedArtworks, selectedRecommendedArtwork)

        recommendedArtworksSection.append(titleRecommendedArtworksSection, descriptionRecommendedArtworksSection, recommendedArtworksDiv)

        const recommendedArtworks = async () => {
            try {
                const response = await fetch(`https://api.artic.edu/api/v1/artworks?fields=id,image_id,title`)
                const information = await response.json()
                return information.data
            } catch (error) {
                console.log(error)
            }
        }

        const listArtworks = await recommendedArtworks()

        const cardArtwork = (id) => {
            const information = informationArtwork(id)
            information.id = id
            information.page = '#artwork'
            artwork(selectedRecommendedArtwork, information)
        }

        for (const work of listArtworks) {
            const figureRecommendedArtwork = document.createElement('figure')
            figureRecommendedArtwork.setAttribute('class', 'figureRecommendedArtwork')
            const imgRecommendedArtwork = document.createElement('img')
            imgRecommendedArtwork.setAttribute('alt', work.title)
            imgRecommendedArtwork.setAttribute('title', work.title)
            work.image_id != null ? imgRecommendedArtwork.setAttribute('src', `https://www.artic.edu/iiif/2/${work.image_id}/full/1200,/0/default.jpg`) : imgRecommendedArtwork.setAttribute('src', 'https://i.ibb.co/DtyPY1N/Group-24.png')
            figureRecommendedArtwork.appendChild(imgRecommendedArtwork)
            figuresRecommendedArtworks.appendChild(figureRecommendedArtwork)

            if (work.image_id != null) {
                figureRecommendedArtwork.addEventListener('click', () => {

                    const selecteds = document.getElementsByClassName('selected')

                    for (const element of selecteds) {
                        element.classList.remove('selected')
                    }

                    figureRecommendedArtwork.className = 'figureRecommendedArtwork selected'
                    selectedRecommendedArtwork.innerHTML = ``
                    cardArtwork(work.id)
                })
            }
        }

        return recommendedArtworksSection
    }

    //PRESHOP
    const preShop = async () => {
        const preShopSection = document.createElement('section')

        store(preShopSection, true)

        return preShopSection
    }

    main.append(presentationRandomDiv, await recommended(), await preShop())
}

export default home