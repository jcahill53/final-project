
import React from 'react';
import './App.css';
import SuperheroApp from './components/AnimalApp';
import SuperheroDetail from './components/AnimalDetails';
import {Route, Routes, Link,  useParams} from 'react-router-dom';

const {REACT_APP_API, REACH_APP_HASH} = process.env

function App() {

  const Home = () => { 
    
    return (
    <div className="container ">

      <h1>Sea Creature Search</h1>

      <SuperheroApp

      />
    </div>
  )};

  const SuperHeroDetailPage = () => { 
    const {id} = useParams();
    return (
      <div detail-info>
      <h1>Superhero Details</h1>
      <ul>
          <li className="link" ><Link to="/">Return Home</Link></li>
        </ul>
      <SuperheroDetail
        id={id}
      />
      </div>
   );}


   return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route
      path="/hero/:id"
      element={<SuperHeroDetailPage/>}
      />
      </Routes>
    </div>
  );
}

export default App;
