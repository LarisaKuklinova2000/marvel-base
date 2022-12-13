import { Component } from 'react';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

class CharInfo extends Component {
    
    state = {
        char: null,
        loading: false,
        error: false
    }

    onCharLoaded = (char) => {
        this.setState({
            char: char, 
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props
        if (!charId) {
            return;
        }

        this.onCharLoading()

        this.marvelService.getCharacter(charId)
            .then(res => this.onCharLoaded(res))
            .catch(this.onError)
    }

    render() {

        const {char, loading, error} = this.state;

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

    return(
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

export default CharInfo;