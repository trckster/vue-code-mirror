function multipleSearch(text, word) {
    let match
    const re = RegExp(word, 'g')
    const result = []

    text.split('\n').forEach((line, i) => {
        do {
            match = re.exec(line)

            if (match)
                result.push({
                    line: i,
                    ch: match.index
                })
        } while (match)
    })

    return result
}

export default multipleSearch;