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

            const imgArtwork = document.createElement('img')
            imgArtwork.setAttribute('src', `${this.image}`)
            figureArtwork.appendChild(imgArtwork)

            const buttonLike = document.createElement('figure')

            const imgLike = document.createElement('img')
            imgLike.setAttribute('alt', 'buttonLike')
            imgLike.setAttribute('title', 'buttonLike')
            buttonLike.appendChild(imgLike)

            const yearArtwork = document.createElement('p')
            yearArtwork.textContent = this.year

            const titleArtwork = document.createElement('h3')
            titleArtwork.innerHTML = this.title

            const descriptionArtwork = document.createElement('p')
            descriptionArtwork.innerHTML = `${this.description}`

            const techniquesArtwork = document.createElement('p')
            techniquesArtwork.innerHTML = `<strong>Techniques</strong>: ${this.techniques}`

            const materialsArtwork = document.createElement('p')
            materialsArtwork.innerHTML = `<strong>Materials</strong>: ${this.materials}`

            template.content.append(figureArtwork, buttonLike, yearArtwork, titleArtwork, descriptionArtwork, techniquesArtwork, materialsArtwork)

            if (this.sound != null) {
                const soundArtwork = document.createElement('audio')
                soundArtwork.setAttribute('controls', '')
                soundArtwork.setAttribute('src', this.sound)

                template.content.appendChild(soundArtwork)
            }

            const authorArtwork = document.createElement('p')
            authorArtwork.innerHTML = this.author

            template.content.appendChild(authorArtwork)

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