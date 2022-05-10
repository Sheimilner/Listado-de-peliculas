import Login from './Components/Login';
import Listado from './Components/Listado';
import Footer from './Components/Footer';
import Detalle from './Components/Detalle';
import Header from './Components/Header';
import Resultados from './Components/Resultados';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const favMovies=localStorage.getItem("favs");
 
  const addOrRemoveFavorite =e=>{
  const btn = e.currentTarget;
  const parent = btn.parentElement;
  const imgURL = parent.querySelector('img').getAttribute('src');
  const title = parent.querySelector('h5').innerText;
  const overview = parent.querySelector('p').innerText;
  console.log(btn.dataset)

  const movieFavData={
    imgURL,
    title,
    overview,
    id: btn.dataset.movieId
  };


console.log(movieFavData)}
  

  
  return (
    <>
      <BrowserRouter>
        <Header/>
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
                    element={<Resultados/>}
              />
            </Routes>
          </div>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
