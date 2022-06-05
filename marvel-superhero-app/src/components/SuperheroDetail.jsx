import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import SuperheroComic from "./SuperheroComic";
import pow from '../images/Pow.jpg'


function SuperheroDetail() {
    const { id } = useParams();

    // use states for data fetch
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

    //    fetch data for both hero and comics for the hero
    useEffect(() => {

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

                ).catch(err => {
                    setHasError(true)
                    setIsLoading(false);
                });

        }
        fetchData()

    }, [comicUrl, url]);

    // during load show Pow image and Loading...
    if (isLoading) {
        return (
            <div className="wait">
                <p className="load">Loading...</p>
                <img className="powImage center" src={pow} alt="Marvel Pow icon" />
            </div>
        )
    }
    // return message if fetch results in error
    if (hasError) {
        return <p>An error has occurred.  Please try again.</p>
    }

    // variables to be used in return

    // use only results from data fetch
    const heroDetails = superHeroDetails.data.results;
    const comics = superHeroComics.data.results;

    // variables for hero image
    const heroThumbPath = heroDetails[0].thumbnail.path;
    const heroThumbExt = heroDetails[0].thumbnail.extension
    const heroThumbNail = `${heroThumbPath}.${heroThumbExt}`

    // variable for hero description
    const heroDescr = heroDetails[0].description


    return (
        <section>
            <section>
                <h1 className="detail-hdr">{heroDetails[0].name}</h1>
                <img className="center detail-image" src={heroThumbNail} alt={heroDetails[0].name} />
                <p className="center detail-descr"> {heroDescr}</p>
                <p className="marvel-link"><span></span>Learn more about this hero in the <span></span> <a href={heroDetails[0].urls[1].url} target="_blank" rel="noreferrer">Marvel Universe</a></p>
            </section>
            <section>
                <h2 className="detail-hero-comics">Comics featuring {heroDetails[0].name}</h2>
                <p className="detail-comic-click">Click on a comic to learn more</p>

                <article className="row comic-card" >
                    {comics.map((comic, id) =>
                        <SuperheroComic
                            key={id}
                            comic={comic}
                            comicThumbPath={comic.thumbnail.path}
                            comicThumbExt={comic.thumbnail.extension}

                        />
                    )}
                </article>
            </section>
        </section>
    )
}

export default SuperheroDetail