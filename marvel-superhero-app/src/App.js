
import React, { useState } from 'react';
import './App.css';
import SuperheroApp from './components/SuperheroApp';
import SuperheroDetail from './components/SuperheroDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Route, Routes, Link, useParams } from 'react-router-dom';

// const { REACT_APP_API, REACH_APP_HASH } = process.env




function App() {
  // use state for form submission of hero name
  const [heroInput, setHeroInput] = useState('');
  const onFormSubmit = (event) => {
    event.preventDefault();
    setHeroInput(event.target[0].value);
  };

  const Home = () => {


    return (
      <>

        <NavBar />
        {/* Hero name input */}
        <form onSubmit={onFormSubmit}>
          <label htmlFor="hero-input">Hero:</label>
          <input id="hero-input"></input>
          <button type="submit" className="submit-btn">Search</button>
        </form>
        {/* favorite default */}
        {/* <div className="row">
                <p>Save as default?</p>
                <form className='radio'>
                    <input type="radio" id="favorite" name="fav_hero" value="Yes" />
                    <label htmlFor="favorite">Yes</label>
                    <input type="radio" id="notFavorite" name="fav_hero" value="No" checked />
                    <label htmlFor="notFavorite">Clear default</label>
                </form>
            </div> */}


        <div className="container ">
          {heroInput && <SuperheroApp
            heroInput={heroInput}
          />}
        </div>
        <Footer />
      </>
    )
  };

  const SuperHeroDetailPage = () => {
    const { id } = useParams();
    return (
      <>
        <NavBar />
        <div detail-info>
          <ul>
            <li  ><Link to="/">Return Home</Link></li>
          </ul>
          <SuperheroDetail
            id={id}
          />
        </div>

        <Footer />
      </>
    );
  }



  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/hero/:id"
          element={<SuperHeroDetailPage />}
        />
      </Routes>


    </div>
  );
}

export default App;
