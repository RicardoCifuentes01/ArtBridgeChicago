const resolveRoutes = (route) => {
    switch (route) {
        case '':
            return ''
            break;
        case '#home':
            return 'home'
            break;
        case '#artwork':
            return 'artwork'
            break;
        case '#artist':
            return 'artist'
            break;
        case '#store':
            return 'store'
            break;
        case '#product':
            return 'product'
            break;
        case '#favorites':
            return 'favorites'
            break;
        case '#search':
            return 'search'
            break;
        default:
            break;
    }
}

export default resolveRoutes