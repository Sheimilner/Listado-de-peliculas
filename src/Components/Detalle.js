import {useNavigate, Link, Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import axios from "axios";
import swal from "@sweetalert/with-react";


function Detalle (){
    let token = sessionStorage.getItem("token");
    let query = new URLSearchParams(window.location.search);
    let movieID = query.get("movieID");
    const [movie, setMovie] = useState(null);

    useEffect(()=>{
       const endpoint =`https://api.themoviedb.org/3/movie/${movieID}?api_key=a96ca81a75e377ad6455344faaaf80bf&language=en-US`;    
       axios.get(endpoint)
         .then(response=>{
                const movieData= response.data;
                setMovie(movieData);
            })
            .catch(err=>{
                swal(<h2>Hubo algun error, intentá más tarde!</h2>)
            })
    },[movieID]);

    return(
        <>
        {!token && <Navigate to="/"/>} 
        {movie &&
            <>
                <h2>{movie.title}</h2>
                <Row>
                    <Col xs={4}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt="movie poster"/>
                    </Col>
                    <Col xs={8}>
                        <h5>Release date: {movie.release_date}</h5>
                        <h5>Raiting: {movie.vote_average}</h5>
                        <h5>Overview</h5>
                        <p>{movie.overview}</p>
                        <h5>Genre</h5>
                        <ul>
                            {movie.genres.map(oneGenres =>
                                <li key={oneGenres.id}>{oneGenres.name}</li>)}
                        </ul>
                    </Col>
                </Row>
            </>
        }
       
        </>
        
    )
}

export default Detalle;