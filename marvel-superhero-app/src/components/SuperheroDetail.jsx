import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function SuperheroDetail() {
    const { id } = useParams();
    const [superHeroDetails, setHeroDetails] = useState([]);
    const [superHeroComics, setHeroComics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
// hero detail api
    const { REACT_APP_API, REACT_APP_HASH } = process.env
    const BASE_URL = `https://gateway.marvel.com:443/`;
    const resourceType = `v1/public/characters/`
    const API_KEY = REACT_APP_API;
    const hash = REACT_APP_HASH
    const charID = id;
    const orderBy= "issueNumber"
    const url = `${BASE_URL}${resourceType}${charID}?&ts=1&apikey=${API_KEY}&hash=${hash}`;
 
    const COMIC_BASE_URL= `https://gateway.marvel.com:443/v1/public/comics?noVariants=true`
    // &characters=1009351
    // &orderBy=issueNumber`
    // `${BASE_URL}${resourceType}${charID}?&ts=1&apikey=${API_KEY}&hash=${hash}`;
    const comicUrl = `${COMIC_BASE_URL}${charID}&orderBy=${orderBy}&ts=1&apikey=${API_KEY}&hash=${hash}`;

    console.log(comicUrl);

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
  //  const heroComicsSeries = heroDetails[0].series.collectionURI
   // const heroComics=
  //  console.log(heroComics);
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
            <section>
                <h1 className="detail-hdr">{heroDetails[0].name} - {heroDetails[0].id}</h1>
                <img className="center detail-image" src={heroThumbNail} alt={heroDetails[0].name} />
                <p className="center detail-descr"> {heroDescr}</p>
            </section>
            <section>
                <h2>Comics featuring {heroDetails[0].name}</h2>

            </section>
        </>
    )
}

export default SuperheroDetail