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