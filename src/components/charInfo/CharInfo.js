import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

const CharInfo = (props) => {
    
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar()
    }, [])
    
    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props
        if (!charId) {
            return;
        }

        onCharLoading()

        marvelService.getCharacter(charId)
            .then(res => onCharLoaded(res))
            .catch(onError)
    }

    const skeleton = char || loading || error ? null: <Skeleton/>;
    const errorMessage = error? <ErrorMessage/>: null;
    const spinner = loading ? <Spinner />: null
    const content = !(loading || error || !char) ? <View char={char} />: null

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    function comicsList() {
        if (comics.length >= 10) {
            let comicasArr = comics.slice(0, 10).map((item, i) => {
                                return (
                                    <li key={i} className="char__comics-item">
                                        {item.name}
                                    </li>
                                )
                            })
            let endOfArr = <li key={19991} className="char__comics-item" style={{color: '#9F0013'}}>and other {comics.length - 10} comics</li>
            return (
                [...comicasArr, endOfArr]
            )
        }
        if (comics.length === 0) {
            return 'comics is not found'
        }
        return (
            comics.map((item, i) => {
                return (
                    <li key={i} className="char__comics-item">
                        {item.name}
                    </li> 
                )
            })
        )
    }

    function isImgFound() {
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            return 'contain'
        } else {
            return 'cover'
        }
    }

    return (
        <>
                <div className="char__basics">
                    <img src={thumbnail} alt={name} style={{objectFit: isImgFound()}}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                        comicsList()
                    }
                </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;