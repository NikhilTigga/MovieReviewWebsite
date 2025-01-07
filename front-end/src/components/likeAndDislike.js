import React,{useEffect,useState} from "react";

import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import SouthIcon from '@mui/icons-material/South';
function LikeAndDislike(props) {
    const {reviewId}=props;
    const [likeCount,setLikeCount]=useState(1);
    const [dislikeCount, setDeslikeCount]=useState(1);
    const [error, setError]=useState(null);
    useEffect(()=>{
        //Ferch the like and deslike 
        fetch(`http://localhost:5000/api/like&deslike/${reviewId}`)
        .then((response)=>{
            if(!response.ok){
                throw new Error("Failt to fetch the like and dislike");
            }
            return response.json();
        })
        .then((data)=>{
            setLikeCount(data.like_count);
            setDeslikeCount(data.dislike_count);

        })
        .catch((err)=>{
            setError(err.message);
        });
    },[reviewId]);
    return (

        <>
            <div className="likesAndComments">

                <img className="reviewLogo" src="https://e7.pngegg.com/pngimages/366/812/png-clipart-rotten-tomatoes-film-review-computer-icons-critic-tomato-rotten-tomatoes-film-thumbnail.png" alt="rottonTomatoImg" width={"20px"} />


                <span><NorthRoundedIcon sx={{ color: '#365314' }} /></span>
                <span>{likeCount}</span>
                <span><SouthIcon sx={{ color: '#365314' }} /></span>
                <span>{dislikeCount}</span>


            </div>

        </>
    );
    
}
export default LikeAndDislike;