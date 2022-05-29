
import React from 'react';
import './App.css';
import SuperheroApp from './components/SuperheroApp';
import SuperheroDetail from './components/SuperheroDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Route, Routes, Link, useParams } from 'react-router-dom';

// const { REACT_APP_API, REACH_APP_HASH } = process.env

function App() {

  const Home = () => {

    return (
      <>
        <NavBar />
        <div className="container ">
          <SuperheroApp
          />
        </div>
        <Footer/>
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
        <Footer/>
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
