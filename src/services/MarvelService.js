import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";


class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = '98330486a12daf27d6326d53136d4f98';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json()
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&apikey=${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
    }
}

export default MarvelService;