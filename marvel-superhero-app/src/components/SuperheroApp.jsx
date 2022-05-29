import React, { useEffect, useState } from 'react';
import SuperherosCard from './SuperherosCard';
// import { Link } from 'react-router-dom';

function SuperheroApp() {

    const [superheros, setSuperheros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const { REACT_APP_API, REACT_APP_HASH } = process.env
    const BASE_URL = `https://gateway.marvel.com:443/`;
    const resourceType = `v1/public/characters`
    const API_KEY = REACT_APP_API;
    const hash = REACT_APP_HASH
    let nameStartsWith = 'Thor';
    const orderBy = 'name';
    const limit = 50;
    const url = `${BASE_URL}${resourceType}?nameStartsWith=${nameStartsWith}&orderBy=${orderBy}&limit=${limit}&ts=1&apikey=${API_KEY}&hash=${hash}`;


    useEffect(() => {
        fetch(url)

            .then(response => response.json())

            .then(
                data => {
                    setSuperheros(data);
                    setIsLoading(false);
                },

                error => {
                    setHasError(true)
                    setIsLoading(false);

                }
            );


    }, [url]);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (hasError) {
        return <p>An error has occurred.  Please try again.</p>
    }
    const heros = superheros.data.results;

    // const thumbPath = heros[id].thumbnail['path']
    // const thumbExt = heros[id].thumbnail['extension']
    // const heroThumbnail = `${thumbPath}.${thumbExt}`

    // console.log(superheros);

    // console.log(heroThumbnail);


    return (
        <main>
            <div className="row" >
                {heros.map((hero, id) =>
                     <SuperherosCard 
                         key = {id}
                         hero = {hero}
                         thumbPath = {hero.thumbnail.path}
                         thumbExt = {hero.thumbnail.extension}
                        
                     />
                )}
            </div>

        </main>
    );
}


export default SuperheroApp