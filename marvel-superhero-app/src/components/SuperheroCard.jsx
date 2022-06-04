import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

function SuperheroCard({ hero, thumbPath, thumbExt }) {
    const thumbNail = `${thumbPath}.${thumbExt}`

    return (
     
            <article className="hero-container">
                <div className="hero-card" key="id">
                    <img className="hero-image" src={thumbNail} alt={hero.name} />
                    <h2>{hero.name}</h2>
                    <Link to={`/hero/${hero.id}`}><button className="info-btn center" >More Info</button></Link>
                </div>
            </article>


    )
}

SuperheroCard.propTypes = {
    hero: PropTypes.array.isRequired,
    thumbPath: PropTypes.string.isRequired,
    thumbExt: PropTypes.string.isRequired
}

export default SuperheroCard