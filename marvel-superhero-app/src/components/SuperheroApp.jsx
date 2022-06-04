import React, { useEffect, useState } from 'react';
import SuperherosCard from './SuperheroCard';
import PropTypes from 'prop-types'
import pow from '../images/Pow.jpg'

function SuperheroApp({ heroInput }) {

    // use states for hero card
    const [superheros, setSuperheros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // variables to create url
    const { REACT_APP_API, REACT_APP_HASH } = process.env
    const BASE_URL = `https://gateway.marvel.com:443/`;
    const resourceType = `v1/public/characters`
    const API_KEY = REACT_APP_API;
    const hash = REACT_APP_HASH
    let nameStartsWith = heroInput;
    const orderBy = 'name';
    const limit = 50;
    const url = `${BASE_URL}${resourceType}?nameStartsWith=${nameStartsWith}&orderBy=${orderBy}&limit=${limit}&ts=1&apikey=${API_KEY}&hash=${hash}`;


    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(
                // successful callback
                data => {
                    setSuperheros(data);
                    setIsLoading(false);
                },
                // unsuccessful callback
                error => {
                    setHasError(true)
                    setIsLoading(false);
                }
            );


    }, [url]);

    if (isLoading) {
        return (
            <div className="wait">
                <p className="load">Loading...</p>
                <img className="powImage center" src ={pow} alt = "Marvel Pow icon"/>
            </div>
        )
    }

    if (hasError) {
        return <p>An error has occurred.  Please try again.</p>
    }
    const heros = superheros.data.results;

    return (
        <>
            {/* superherp cards */}

            <section className="row" >

                {heros.map((hero, id) =>
                    <SuperherosCard
                        key={id}
                        hero={hero}
                        thumbPath={hero.thumbnail.path}
                        thumbExt={hero.thumbnail.extension}
                    />
                )}
            </section>

        </>
    );
}

SuperheroApp.propTypes = {
    heroInput: PropTypes.string.isRequired
}

export default SuperheroApp