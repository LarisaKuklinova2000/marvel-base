import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MainPage = () => {

    const [selectedChar, setChar] = useState(null)

    const oneCharSelected = (id) => {
        setChar(id)
    }

    return (
        <>
            <ErrorBoundary><RandomChar/></ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary><CharList onCharSelected={oneCharSelected}/></ErrorBoundary>
                <ErrorBoundary><CharInfo charId={selectedChar}/></ErrorBoundary>
            </div>
        </>
    )
}

export default MainPage;