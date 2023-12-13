const useGenres = (selectGenres) => {
    if (selectGenres.length < 1) return ""
    const GenreId = selectGenres.map((el) => el.id)
    return GenreId.reduce((acc, curr) => acc + "," + curr)
}

export default useGenres;