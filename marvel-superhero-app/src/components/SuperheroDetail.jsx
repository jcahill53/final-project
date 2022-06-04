import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import SuperheroComic from "./SuperheroComic";


function SuperheroDetail() {
    const { id } = useParams();
    const [superHeroDetails, setHeroDetails] = useState([]);
    const [superHeroComics, setHeroComics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // url variables
    const { REACT_APP_API, REACT_APP_HASH } = process.env
    const BASE_URL = `https://gateway.marvel.com:443/`;
    const COMIC_BASE_URL = `https://gateway.marvel.com:443/v1/public/comics?noVariants=true&characters=`
    const resourceType = `v1/public/characters/`
    const API_KEY = REACT_APP_API;
    const hash = REACT_APP_HASH
    const charID = id;
    const orderBy = "issueNumber"

    // hero detail api
    const url = `${BASE_URL}${resourceType}${charID}?&ts=1&apikey=${API_KEY}&hash=${hash}`;

    // comics api
    const comicUrl = `${COMIC_BASE_URL}${charID}&orderBy=${orderBy}&ts=1&apikey=${API_KEY}&hash=${hash}`;

    // use axios to fetch data from multiple urls
    const fetchData = () => {
        const getHeroDetail = axios.get(url)
        const getCommics = axios.get(comicUrl)

        axios.all([getHeroDetail, getCommics])
            .then(
                axios.spread((...allData) => {
                    const allHeroDetail = allData[0].data
                    const allComics = allData[1].data

                    setHeroDetails(allHeroDetail)
                    setHeroComics(allComics)
                    setIsLoading(false);
                })

            )
        // .then(
        //     error => {
        //         setHasError(true)
        //         setIsLoading(false);

        //     }
        // );

    }


    useEffect(() => {
        fetchData()

    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (hasError) {
        return <p>An error has occurred.  Please try again.</p>
    }

    // variables to be used in return
    const heroDetails = superHeroDetails.data.results;
    const comics = superHeroComics.data.results;
    const heroThumbPath = heroDetails[0].thumbnail.path;
    const heroThumbExt = heroDetails[0].thumbnail.extension
    const heroThumbNail = `${heroThumbPath}.${heroThumbExt}`
    const heroDescr = heroDetails[0].description

    return (
        <>
            <section>
                <h1 className="detail-hdr">{heroDetails[0].name} - {heroDetails[0].id}</h1>
                <img className="center detail-image" src={heroThumbNail} alt={heroDetails[0].name} />
                <p className="center detail-descr"> {heroDescr}</p>
            </section>
            <section>
                <h2>Comics featuring {heroDetails[0].name}</h2>

                <div className="row comic-card" >
                    {comics.map((comic, id) =>
                        <SuperheroComic
                            key={id}
                            comic={comic}
                            comicThumbPath={comic.thumbnail.path}
                            comicThumbExt={comic.thumbnail.extension}
                        />
                    )}
                </div>
            </section>
        </>
    )
}

export default SuperheroDetail