import React, { useState } from "react";
import SlideShow from "./slideShow";
import MonthAndYear from "./MonthYearDropdown";
import Header from "./header";
import Caste from "./caste";
import {useNavigate} from 'react-router-dom'
function Home() {
    const [movies, setMovies] = useState([]); // State to store fetched movies
    const [error, setError] = useState(""); // State to handle errors
    const navigate = useNavigate();

    function handleFind(month, year) {
        setError(""); // Clear previous errors
        setMovies([]); // Clear previous movies
        if (!month || !year) {
            alert("Please select a month and year");
            return;
        }
        // Fetch the MovieDetails from the backend
        fetch("https://moviereviewwebsite.onrender.com/api/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ month, year }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Added validation to ensure data is an array
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format");
                }
                setMovies(data); // Set the fetched movies to state
                console.log("Movies Data", data);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError("Error fetching movies"); // Set error state if fetch fails
            });
    }
    const handleReviewClick = (movieId) => {
        navigate(`/content/${movieId}`, { state: { movieId } });
    };


    return (
        <>
            <Header />
            <div className="homeContainer">
                <MonthAndYear onFind={handleFind} />
                <SlideShow />


                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <div className="contentAreaAndVideo">
                            <div className="mainContentArea">
                            <div className="contentArea" style={{ margin: "0px", width: "115vh" }}>

                                <div key={movie.id} className="moviePoster">
                                    {movie.poster_url ? (
                                        <img
                                            src={movie.poster_url}
                                            width="150px"
                                            alt={`${movie.title} Poster`}
                                        />
                                    ) : (
                                        <p>No Poster Available</p>
                                    )}
                                </div>
                                <div className="movieDetails">
                                    <ul>
                                        <li>Title: {movie.title}</li>
                                        <li>Director: {movie.director}</li>
                                        <li>Writer: {movie.writer}</li>
                                        <li>Casts: {movie.casts}</li>
                                    </ul>
                                    <p>{movie.description}</p>
                                </div>
                               
                               

                            </div>
                            <div className="reviewButton">
                                <button type="button" onClick={()=>handleReviewClick(movie.id)} class="btn btn-primary btn-lg">Large button</button>
                                </div>
                            </div>
                            
                            {/* Add Movie trailer*/}
                            <div className="trailerArea">
                                {movie.trailer_url && (
                                    <div className="movieTrailer" style={{ marginTop: "20px" }}>
                                        <iframe
                                            width="560"
                                            height="315"
                                            src={`https://www.youtube.com/embed/${movie.trailer_url}`}
                                            title={`${movie.title} Trailer`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}



                            </div>
                            {/* Render Casts */}
                            <div className="castes">
                                {movie.castes && movie.castes.length > 0 ? (
                                   <Caste
                                   casts={movie.castes}
                                   />
                                ) : (
                                    <p>Caste not found</p>
                                )}
                            </div>
                        </div>
                    ))


                ) : (
                    <p>No content to show</p>
                )}






            </div>
        </>
    );
}

export default Home;
