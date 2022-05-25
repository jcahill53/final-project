
import React from 'react';
import './App.css';
import SuperheroApp from './components/SuperheroApp';
import SuperheroDetail from './components/SuperheroDetail';
import NavBar from './components/NavBar';
import { Route, Routes, Link, useParams } from 'react-router-dom';

// const { REACT_APP_API, REACH_APP_HASH } = process.env

function App() {

  const Home = () => {

    return (
      <>
        <NavBar />
        <div className="container ">

          <h1>Super Heros</h1>

          <SuperheroApp

          />
        </div>
      </>
    )
  };

  const SuperHeroDetailPage = () => {
    const { id } = useParams();
    return (
      <>
        <NavBar />
        <div detail-info>
          <h1>Superhero Details</h1>
          <ul>
            <li className="link" ><Link to="/">Return Home</Link></li>
          </ul>
          <SuperheroDetail
            id={id}
          />
        </div>
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
