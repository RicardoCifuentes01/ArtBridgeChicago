const cardArtist = () => {

    class cardArtist extends HTMLElement {
        constructor() {
            super()
        }

        connectedCallback() {
            this.title = this.getAttribute('title')
            this.isArtist = this.getAttribute('isArtist')
            this.birth = this.getAttribute('birth')
            this.death = this.getAttribute('death')
            this.description = this.getAttribute('description')
        }

        getTemplate() {

            const template = document.createElement('template')

            const titleArtist = document.createElement('h1')
            titleArtist.textContent = `${this.title}`

            const isArtistArtist = document.createElement('h2')
            isArtistArtist.textContent = `${this.isArtist}`

            const buttonLike = document.createElement('figure')

            const imgLike = document.createElement('img')
            imgLike.setAttribute('alt', 'buttonLike')
            imgLike.setAttribute('title', 'buttonLike')
            buttonLike.appendChild(imgLike)

            const lifeArtist = document.createElement('h3')
            lifeArtist.textContent = `${this.birth} - ${this.death}`

            const descriptionArtist = document.createElement('p')
            descriptionArtist.innerHTML = `${this.description}`

            template.content.append(titleArtist, isArtistArtist, buttonLike, lifeArtist, descriptionArtist)

            return template
        }

        render() {
            this.appendChild(this.getTemplate().content.cloneNode(true))
        }

        connectedCallback() {
            this.render()
        }
    }
    customElements.define('card-artist', cardArtist)
}

export default cardArtist