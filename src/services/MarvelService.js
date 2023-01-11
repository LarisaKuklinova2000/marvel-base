import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp(),
        _apiBase = 'https://gateway.marvel.com:443/v1/public/',
        _apiKey = '98330486a12daf27d6326d53136d4f98',
        _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const result = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`);
        return result.data.results.map(item => _transformCharacter(item))
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const result = await request(`${_apiBase}comics?limit=12&offset=${offset}&apikey=${_apiKey}`);
        return result.data.results;
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: !char.description ? 'description is not found :(':
                         char.description.length > 210 ? char.description.slice(0, 210) + '...':
                         char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getAllComics, clearError}
}

export default useMarvelService;