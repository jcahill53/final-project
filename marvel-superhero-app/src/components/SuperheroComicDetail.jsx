import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {  parseJSON, format } from "date-fns";
import pow from '../images/Pow.jpg'

function SuperheroComicDetail() {
    const { id } = useParams();


    const [superHeroComicDetail, setHeroComicDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    // const [isValid, setIsValid] = useState(true);

    // url variables
    const { REACT_APP_API, REACT_APP_HASH } = process.env

    const COMIC_BASE_URL = `https://gateway.marvel.com:443/v1/public/comics/`
    const API_KEY = REACT_APP_API;
    const hash = REACT_APP_HASH
    const comicID = id;

    // comics api
    const comicUrl = `${COMIC_BASE_URL}${comicID}?&ts=1&apikey=${API_KEY}&hash=${hash}`;

    useEffect(() => {
        fetch(comicUrl)
            .then(response => response.json())
            .then(
                // successful callback
                data => {
                    setHeroComicDetail(data);
                    setIsLoading(false);
                },
                // unsuccessful callback
                error => {
                    setHasError(true)
                    setIsLoading(false);
                }
            );


    }, [comicUrl]);

    if (isLoading) {
        return (
            <div className="wait">
                <p className="load">Loading...</p>
                <img className="powImage center" src={pow} alt="Marvel Pow icon" />
            </div>
        )
    }

    if (hasError) {
        return <p>An error has occurred.  Please try again.</p>
    }

    const comic = superHeroComicDetail.data.results;
    const comicDetThumbPath = comic[0].thumbnail.path;
    const comicDetThumbExt = comic[0].thumbnail.extension
    const comicDetThumbNail = `${comicDetThumbPath}.${comicDetThumbExt}`
 
    const pubDate = parseJSON(comic[0].dates[0].date)
    const formattedDate = format(pubDate, "MMMM dd, yyyy");
    // const pubDate2 = parseJSON('0001-11-30T00:00:00-0500')
    // const formattedDate2 = format(pubDate2, "MMMM dd, yyyy");
 
    console.log(pubDate);
    console.log(formattedDate);
    // console.log(pubDate2);
    // console.log(formattedDate2);
    

    return (
        <>
            {/* comic details */}
            <section className="row comic-detail-card" >
                <img className="comic-detail-image center" src={comicDetThumbNail} alt="Comic cover page" />
                <div className="comic-detail-info">
                    <h3 className="comic-detail-hdr">{comic[0].title}</h3>
                    <p className="comic-detail-descr"><span>Published Date:</span> {formattedDate}</p>
                    <p className="comic-detail-descr">{comic[0].description}</p>
                </div>

            </section>

        </>
    );
}




export default SuperheroComicDetail