import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    
console.log(superheros);
console.log(heros);

    return (
        <main>
            <div className="column list-items">
                {heros.map((hero, id) =>
                    <section  >

                        <div className="row border" key={id}>
                            <div className="info row">
                                {/* <img src={animal.icon_uri} alt={animal.name} /> */}
                                <h2><span>Name: </span>{hero.name["name-USen"]} - <span>id: </span> {hero.id}</h2>
                            </div>
                            <Link to={`/hero/${hero.id}`}><button >More Info</button></Link>
                        </div>
                    </section>
                )}
            </div>

        </main>
    );
}


export default SuperheroApp