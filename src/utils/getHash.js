const getHash = () => {
    const [hash, term] = location.hash.split('=')
    return hash
}

export default getHash