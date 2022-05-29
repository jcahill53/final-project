import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function SuperheroDetail() {
    const { id } = useParams();
    const [superHeroDetails, setHeroDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const { REACT_APP_API, REACT_APP_HASH } = process.env
    const BASE_URL = `https://gateway.marvel.com:443/`;
    const resourceType = `v1/public/characters/`
    const API_KEY = REACT_APP_API;
    const hash = REACT_APP_HASH
    const charID = id;
    const url = `${BASE_URL}${resourceType}${charID}?&ts=1&apikey=${API_KEY}&hash=${hash}`;
    // https://gateway.marvel.com:443/v1/public/characters/1011054?&ts=1&apikey=192c597a69f5e5f60181fcd4569e8f79

    // console.log(url);

    useEffect(() => {
        fetch(url)

            .then(response => response.json())

            .then(
                data => {
                    setHeroDetails(data);
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

    console.log(superHeroDetails);
    const heroDetails = superHeroDetails.data.results;
    // console.log(heroDetails);
//    const heroName = heroDetails[0].name

   const heroThumbPath = heroDetails[0].thumbnail.path;
   const heroThumbExt = heroDetails[0].thumbnail.extension
   const heroThumbNail = `${heroThumbPath}.${heroThumbExt}`
const heroDescr = heroDetails[0].desc
    return (
        <>
             
            <h1 className="detail-hdr">{heroDetails[0].name}</h1>
            <img className="center detail-image" src={heroThumbNail} alt = {heroDetails[0].name}/>
            <p className="center detail-descr"><span>Description:  </span>{heroDescr}</p>
        </>
    )
}

export default SuperheroDetail