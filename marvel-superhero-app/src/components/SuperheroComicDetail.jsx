import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { format } from "date-fns";

function SuperheroComicDetail() {
    const { id } = useParams();

    console.log(id);

    const [superHeroComicDetail, setHeroComicDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // url variables
    const { REACT_APP_API, REACT_APP_HASH } = process.env

    const COMIC_BASE_URL = `https://gateway.marvel.com:443/v1/public/comics/`
    const API_KEY = REACT_APP_API;
    const hash = REACT_APP_HASH
    const comicID = id;

    //https://gateway.marvel.com:443/v1/public/comics/70297?&ts=1&apikey=192c597a69f5e5f60181fcd4569e8f79&hash=07dced18d8feafe4974a0029ce3e1003

    // comics api
    const comicUrl = `${COMIC_BASE_URL}${comicID}?&ts=1&apikey=${API_KEY}&hash=${hash}`;
    console.log(comicUrl);
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
        return <p>Loading...</p>
    }

    if (hasError) {
        return <p>An error has occurred.  Please try again.</p>
    }

    console.log(superHeroComicDetail);
    const comic = superHeroComicDetail.data.results;
    console.log(comic);
    const comicDetThumbPath = comic[0].thumbnail.path;
    const comicDetThumbExt = comic[0].thumbnail.extension
    const comicDetThumbNail = `${comicDetThumbPath}.${comicDetThumbExt}`
    const pubDate = new Date(comic[0].dates[0].date)
    const formattedDate = format(pubDate, "MMMM dd, yyyy");

    return (
        <>
            {/* superherp cards */}

            <div   >

                <img src={comicDetThumbNail} alt="Comic cover page" />
                <h3>{comic[0].title} - {comic[0].id}</h3>
                <p><span>Published Date:</span> {formattedDate}</p>
                <p>{comic[0].description}</p>


            </div>

        </>
    );
}




export default SuperheroComicDetail