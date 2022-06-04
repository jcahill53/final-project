
import React, { useState } from 'react';
import './App.css';
import SuperheroApp from './components/SuperheroApp';
import SuperheroDetail from './components/SuperheroDetail';
import SuperheroComicDetail from './components/SuperheroComicDetail'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Route, Routes, useParams } from 'react-router-dom';


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
        <main>
          {/* Hero name input */}
          <form className="hero-form" onSubmit={onFormSubmit}>
            <label htmlFor="hero-input">Enter a Hero:</label>
            <input id="hero-input" type="text"  placeholder="Enter at least 1 character" required pattern="[a-zA-Z\-\s]+" minLength="1"
              title="Enter at least one character. Use only upper case, lower case, a space or hyphens"></input>
            <button type="submit" className="submit-btn">Search</button>
          </form>

          <div className="container ">
            {heroInput && <SuperheroApp
              heroInput={heroInput}
            />}
          </div>
        </main>
        <Footer />
      </>
    )
  };

  const SuperHeroDetailPage = () => {
    const { id } = useParams();
    return (
      <>
        <NavBar />
        <main>
          <div >
            <SuperheroDetail
              id={id}
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const SuperHeroComicsDetailPage = () => {
    const { id } = useParams();
    return (
      <>
        <NavBar />
        <main>
        <div >
          <SuperheroComicDetail
            id={id}
          />
        </div>
        </main>
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
        <Route
          path="/comic/:id"
          element={<SuperHeroComicsDetailPage />}
        />
      </Routes>

    </div>
  );
}

export default App;
