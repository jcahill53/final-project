import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function SuperheroComic({ comic, comicThumbPath, comicThumbExt }) {
    const comicThumbNail = `${comicThumbPath}.${comicThumbExt}`

    return (
     
            <article className="comic-container">
                <div className="comic-card" key="id">
                    <img className="comic-image" src={comicThumbNail} alt={comic.name} />
                    <h2>{comic.title} - {comic.id}</h2>
                    <Link to={`/comic/${comic.id}`}><button className="info-btn center" >More Info</button></Link>
                </div>
            </article>


    )
}

SuperheroComic.propTypes = {
    comic: PropTypes.object.isRequired,
    comicThumbPath: PropTypes.string.isRequired,
    comicThumbExt: PropTypes.string.isRequired
}

export default SuperheroComic