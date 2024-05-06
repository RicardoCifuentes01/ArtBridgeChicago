const cardArtwork = () => {

    class cardArtwork extends HTMLElement {
        constructor() {
            super()
        }

        connectedCallback() {
            this.image = this.getAttribute('image')
            this.year = this.getAttribute('year')
            this.title = this.getAttribute('title')
            this.description = this.getAttribute('description')
            this.techniques = this.getAttribute('techniques')
            this.materials = this.getAttribute('materials')
            this.sound = this.getAttribute('sound')
            this.author = this.getAttribute('author')
        }

        getTemplate() {

            const template = document.createElement('template')

            const figureArtwork = document.createElement('figure')
            figureArtwork.className = 'figureWork'

            const imgArtwork = document.createElement('img')
            imgArtwork.setAttribute('title', `${this.title}`)
            imgArtwork.setAttribute('alt', `${this.title}`)
            imgArtwork.setAttribute('src', `${this.image}`)
            figureArtwork.appendChild(imgArtwork)

            const ns = 'http://www.w3.org/2000/svg'

            const buttonLike = document.createElement('figure')
            buttonLike.className = 'buttonLike'

            const svgLike = document.createElementNS(ns, 'svg')
            svgLike.setAttribute('viewBox', '0 0 512 512')
            svgLike.setAttribute('width', '24')
            svgLike.setAttribute('height', '24')
            svgLike.setAttribute('title', 'like')
            svgLike.setAttribute('alt', 'like')
            svgLike.setAttribute('id', 'heart')

            const pathLike = document.createElementNS(ns, 'path')
            pathLike.setAttribute('id', 'pathHeart')
            pathLike.setAttribute('d', 'M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z')

            svgLike.appendChild(pathLike)

            buttonLike.appendChild(svgLike)

            const yearArtwork = document.createElement('p')
            yearArtwork.textContent = this.year

            const titleArtwork = document.createElement('h1')
            titleArtwork.innerHTML = this.title
            titleArtwork.className = 'titleArtwork'

            const descriptionArtwork = document.createElement('p')
            descriptionArtwork.innerHTML = `${this.description}`

            const techniquesArtwork = document.createElement('p')
            techniquesArtwork.innerHTML = `<strong>Techniques</strong>: ${this.techniques}`

            const materialsArtwork = document.createElement('p')
            materialsArtwork.innerHTML = `<strong>Materials</strong>: ${this.materials}`

            const divInformationArtwork = document.createElement('div')
            divInformationArtwork.className = 'informationWork'

            divInformationArtwork.append(buttonLike, yearArtwork, titleArtwork, descriptionArtwork, techniquesArtwork, materialsArtwork)

            if (this.sound != null) {
                const soundArtwork = document.createElement('audio')
                soundArtwork.setAttribute('controls', '')
                soundArtwork.setAttribute('src', this.sound)

                divInformationArtwork.append(soundArtwork)
            }

            const authorArtwork = document.createElement('p')
            authorArtwork.className = 'authorArtwork'
            authorArtwork.innerHTML = this.author

            divInformationArtwork.append(authorArtwork)

            template.content.append(figureArtwork, divInformationArtwork)

            return template
        }

        render() {
            this.appendChild(this.getTemplate().content.cloneNode(true))
        }

        connectedCallback() {
            this.render()
        }
    }
    customElements.define('card-artwork', cardArtwork)
}

export default cardArtwork