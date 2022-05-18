import{useEffect, useState} from "react";
import {useNavigate, Link, Navigate} from "react-router-dom";

function Favoritos (props){
    const addOrRemoveFavs=props.addOrRemoveFavorite;
    let token = sessionStorage.getItem("token");
    return (
        <>
        <h2>Your 🖤 movies </h2>
        {!token && <Navigate to="/"/>}   
        <div className="row">
            {!props.favourites.length && <div className="col-12 text-danger">No favourites yet</div>}
                {
                props.favourites.map((movie,idx) =>{
                return(        
                <div className="col-md-4" key={idx}> 
                    <div className="card">
                        <img src={movie.imgURL} className="card-img-top" alt="..."/>
                       { <button className="favorite-btn" 
                        onClick={addOrRemoveFavs}
                        data-movie-id={movie.id}
                >🖤</button>}
                        <div className="card-body">
                            <h5 className="card-title">{movie.title.substring(0,15)}...</h5>
                            <p className="card-text">{movie.overview.substring(0,100)}...</p>
                            {/*<Link to={`/detalle?movieID=${movie.id}`} className="btn btn-primary">See more</Link>*/}
                        </div>
                    </div>    
                </div>
                )
            })}
            </div>
            </>
    )
}

export default Favoritos;