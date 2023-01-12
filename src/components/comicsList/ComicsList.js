import { useState } from 'react';
import { useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial? setNewItemLoading(false): setNewItemLoading(true);
        getAllComics(offset)
            .then(res => onComicsListLoaded(res))
    }

    const onComicsListLoaded = (newComicsList) => {

        let ended = false;
        if (newComicsList.length < 12) {
            ended = true;
        }

        setComicsList([...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 12);
        setComicsEnded(charEnded => ended);
    }

    const renderComicsItems = (arr) => {
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item" key={item.id + i}>
                    <a href="#">
                        <img src={`${item.images[0].path}.${item.images[0].extension}`} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices[0].price === 0? 'NOT AVALIBLE': item.prices[0].price + '$'}</div>
                    </a>
                </li>  
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const comics = renderComicsItems(comicsList);

    return (
        <div className="comics__list">
                {errorMessage}
                {spinner}
                {comics}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none': 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;