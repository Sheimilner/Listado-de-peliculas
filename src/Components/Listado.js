import {useNavigate, Link, Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import swal from "@sweetalert/with-react";

function Listado (props){
        const navigate = useNavigate();
    const addOrRemoveFavs=props.addOrRemoveFavorite;
    let token = sessionStorage.getItem("token");
    const [listadoPeliculas, setListadoPeliculas] = useState([]);

    useEffect(()=>{
        const endpoint ="https://api.themoviedb.org/3/discover/movie?api_key=a96ca81a75e377ad6455344faaaf80bf&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
        axios.get(endpoint)
        .then(res=>{
            const apiData= res.data;
            setListadoPeliculas(apiData.results);
        })
        .catch(err=>{
            swal(<h2>Sorry, something went wrong. Try again later!</h2>)
        });
    },[setListadoPeliculas]);


    return(
        <>
        <h2>Movies</h2>
            {!token && <Navigate to="/"/>}        
            <div className="row">
                {
                listadoPeliculas.map((movie,idx) =>{
                return(        
                <div className="col-md-4" key={idx}> 
                    <div className="card">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..."/>
                        <button className="favorite-btn" 
                        onClick={addOrRemoveFavs}
                        data-movie-id={movie.id}
                        >🖤</button>
                        <div className="card-body">
                            <h5 className="card-title">{movie.title.substring(0,15)}...</h5>
                            <p className="card-text">{movie.overview.substring(0,100)}...</p>
                            <Link to={`/detalle?movieID=${movie.id}`} className="btn btn-primary">See more</Link>
                        </div>
                    </div>    
                </div>
                )
            })}
            </div>
                
        </>
    )
}

export default Listado;