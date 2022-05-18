import Login from './Components/Login';
import Listado from './Components/Listado';
import Footer from './Components/Footer';
import Detalle from './Components/Detalle';
import Header from './Components/Header';
import Resultados from './Components/Resultados';
import Favoritos from './Components/Favoritos';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [favourites, setFavourites] = useState([]);
  useEffect(()=>{
      const favsInLocal=localStorage.getItem("favs");
      if (favsInLocal != null){
          const favsArray= JSON.parse(favsInLocal);
          console.log(favsArray);
          setFavourites(favsArray);
      }
  },[])
   
  const addOrRemoveFavorite =e=>{
    const favMovies=localStorage.getItem("favs");
  
  let tempMoviesInFavs;
  if(favMovies === null){
    tempMoviesInFavs=[];

  } else{
    tempMoviesInFavs=JSON.parse(favMovies);
  }
  const btn = e.currentTarget;
  const parent = btn.parentElement;
  const imgURL = parent.querySelector("img").getAttribute("src");
  const title = parent.querySelector("h5").innerText;
  const overview = parent.querySelector('p').innerText;
  
  const movieFavData={
    imgURL,
    title,
    overview,
    id:btn.dataset.movieId
    
  };
  let movieIsInArray=tempMoviesInFavs.find(movie=>{
    return movie.id===movieFavData.id
  });
  if(!movieIsInArray){
  tempMoviesInFavs.push(movieFavData);
  localStorage.setItem("favs",JSON.stringify(tempMoviesInFavs));
  setFavourites(tempMoviesInFavs);
  console.log("Se agregó la peli")
}else{
  let moviesOutOfFavs=tempMoviesInFavs.filter(movie=>{
    return movie.id!==movieFavData.id
  });
  localStorage.setItem("favs",JSON.stringify(moviesOutOfFavs));
  setFavourites(moviesOutOfFavs);
  console.log("Se eliminó la peli")
}
}

  

  
  return (
    <>
      <BrowserRouter>
        <Header />
          <div className="container">  
            <Routes>
              
              <Route 
                  exact path="/" 
                  element={<Login/>} />
              <Route
                    path="/listado"
                    element={<Listado addOrRemoveFavorite={addOrRemoveFavorite}/>}
              />
              <Route
                    path="/detalle"
                    element={<Detalle/>}
              />
              <Route
                    path="/resultados"
                    element={<Resultados addOrRemoveFavorite={addOrRemoveFavorite}/>}
              />
              <Route
                    path="/favoritos"
                    element={<Favoritos favourites={favourites} addOrRemoveFavorite={addOrRemoveFavorite}/>}
              />
            </Routes>
          </div>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
