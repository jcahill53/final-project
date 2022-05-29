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

    const heroDetails = superHeroDetails.data.results;
    const heroThumbPath = heroDetails[0].thumbnail.path;
    const heroThumbExt = heroDetails[0].thumbnail.extension
    const heroThumbNail = `${heroThumbPath}.${heroThumbExt}`
    // const heroDescr = () => {
    //     if (heroDetails[0].description === "")   {

    //         console.log("No additional information is available.") 
    //     }
    //     else {
    //         console.log(heroDetails[0].description)
    //     }
    // }

    const heroDescr = heroDetails[0].description

    // console.log(heroDetails[0].description);

    return (
        <>

            <h1 className="detail-hdr">{heroDetails[0].name}</h1>
            <img className="center detail-image" src={heroThumbNail} alt={heroDetails[0].name} />
            <p className="center detail-descr"> {heroDescr}</p>
        </>
    )
}

export default SuperheroDetail