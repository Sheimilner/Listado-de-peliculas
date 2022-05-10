import {useEffect, useState} from "react";
import swal from "@sweetalert/with-react";
import axios from "axios";
import {Link} from "react-router-dom";
function Resultados (){
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get("word");
    const [moviesResults, setMoviesResults] = useState([]);

    useEffect(()=>{
        const endpoint =`https://api.themoviedb.org/3/search/movie?api_key=a96ca81a75e377ad6455344faaaf80bf&language=en-US&query=${keyword}`;
        axios.get(endpoint)
        .then (function (response) {
            const moviesArray = response.data.results;
            if(moviesArray.length === 0){
                swal(<h4>No results found</h4>)};

            setMoviesResults(moviesArray);
        })
        .catch(err=>{
            swal(<h2>Sorry, something went wrong. Try again later!</h2>)
        });
    },[keyword]);

    //
    return(
        <>
        <h2>Your results for {keyword}</h2>
        {moviesResults.length === 0 && <h4>Sorry, there are no movies with {keyword}</h4>}
        <div className="row">
                {
                moviesResults.map((movie,idx) =>{
                return(        
                <div className="col-md-3" key={idx}> 
                    <div className="card">
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{movie.title.substring(0,15)}...</h5>
                            
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

export default Resultados;