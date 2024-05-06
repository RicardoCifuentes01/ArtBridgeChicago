const styles = (page) => {
    const mobile = document.createElement('link')
    mobile.setAttribute('rel', 'stylesheet')
    mobile.setAttribute('href', `../public/styles/${page}Mobile.css`)

    const tablet = document.createElement('link')
    tablet.setAttribute('rel', 'stylesheet')
    tablet.setAttribute('href', `../public/styles/${page}Tablet.css`)
    tablet.setAttribute('media', 'screen and (min-width:600px)')

    const desktop = document.createElement('link')
    desktop.setAttribute('rel', 'stylesheet')
    desktop.setAttribute('href', `../public/styles/${page}Desktop.css`)
    desktop.setAttribute('media', 'screen and (min-width:800px)')

    const head = document.querySelector('head')
    head.append(mobile, tablet, desktop)

    return head
}

export default styles