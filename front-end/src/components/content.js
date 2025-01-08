import React, { useEffect, useState } from "react";
import Review from "./review";
import TextComment from './textomment';
import { Margin } from "@mui/icons-material";
import Header from "./header";
import { data, useParams } from "react-router-dom";


function Content() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [reviewDetails, setReviewDetails] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Fetch movie details when the component mounts
        fetch(`https://moviereviewwebsite.onrender.com/api/movies/${movieId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch movie details");
                }
                return response.json();
            })
            .then((data) => {
                setMovieDetails(data);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError("Failed to fetch movie details");
            });
    }, [movieId]);
    useEffect(() => {
        //Fetch review details from the database
        fetch(`https://moviereviewwebsite.onrender.com/api/moviereview/${movieId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch review details");
                }
                return response.json();
            })
            .then((data) => {
                setReviewDetails(data);
            })
            .catch((error) => {
                console.error("Error:", error);
                setError("Failed to fetch review details");
            });

    }, [movieId]);


    return (
        <>
            <Header />
            <div className="main">
                {error && (
                    <div>
                        <p>{error}</p>
                    </div>
                )}
                {movieDetails ? (

                    <div className="contentArea" style={{ margin: "auto", width :"100%", backgroundColor: "#020617", boxShadow: "0 4px 7px rgba(0, 0, 0, 0.1)" }}>

                        <div key={movieDetails.id} className="moviePoster">
                            {movieDetails.poster_url ? (
                                <img
                                    src={movieDetails.poster_url}
                                    width="150px"
                                    alt={`${movieDetails.title} Poster`}
                                />
                            ) : (
                                <p>No Poster Available</p>
                            )}
                        </div>
                        <div className="movieDetails">
                            <ul>
                                <li>Title: {movieDetails.title}</li>
                                <li>Director: {movieDetails.director}</li>
                                <li>Writer: {movieDetails.writer}</li>
                                <li>Casts: {movieDetails.casts}</li>
                            </ul>
                            <p>{movieDetails.description}</p>
                        </div>





                    </div>
                ) : (
                    !error && (
                        <div>
                            <p>No content to show</p>
                        </div>
                    )
                )}
                {reviewDetails && reviewDetails.length > 0 ? (
                    <div className="mainContent" style={{ backgroundColor: "#64748b", width: "98%", margin: "auto", padding: "1px 0px 8px 0px", boxShadow: "0 4px 7px rgba(0, 0, 0, 0.1)" , borderRadius:"5px"}}>
                   { reviewDetails.map((review) => (

                            <Review
                                // profile_img={review.user_img}
                                user_name={review.user_name}
                                review_id={review.review_id}
                                reviews={review.review}
                                review_date={review.review_date} />


                        ))}</div>

                ) : (
                    null
                )

                }







                <TextComment />



            </div >

        </>
    );
}

export default Content;
