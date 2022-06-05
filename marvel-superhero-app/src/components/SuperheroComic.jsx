import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function SuperheroComic({ comic, comicThumbPath, comicThumbExt}) {
    const comicThumbNail = `${comicThumbPath}.${comicThumbExt}`

    return (
        // return image for each comic associated with the hero
        
        // clicking on card links to SuperherComicDetail component
        <Link to={`/comic/${comic.id}`}>
            <article className="comic-container" key="id">
                    <img className="comic-image" src={comicThumbNail} alt={comic.name} />
            </article>
        </Link>
    )
}

SuperheroComic.propTypes = {
    comic: PropTypes.object.isRequired,
    comicThumbPath: PropTypes.string.isRequired,
    comicThumbExt: PropTypes.string.isRequired
}

export default SuperheroComic