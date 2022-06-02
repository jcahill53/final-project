import React, { useEffect, useState } from 'react';
import SuperherosCard from './SuperheroCard';
// import PropTypes from 'prop-types;'

function SuperheroApp({heroInput}) {




    // use states for hero card
    const [superheros, setSuperheros] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // const { heroSearch } = useParams();

    console.log(heroInput);
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
    console.log(url);

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
        return <p>Loading...</p>
    }

    if (hasError) {
        return <p>An error has occurred.  Please try again.</p>
    }
    const heros = superheros.data.results;

    // 
    console.log(heros);




    return (
        <main>
 


            {/* superherp cards */}

            <div className="row" >
            
                {heros.map((hero, id) =>
                    <SuperherosCard
                        key={id}
                        hero={hero}
                        thumbPath={hero.thumbnail.path}
                        thumbExt={hero.thumbnail.extension}
                    />
                )}
            </div>

        </main>
    );
}

// SuperheroApp.propTypes={
//     heroSearch: PropTypes.string.isRequired
// }

export default SuperheroApp