import React from "react"

import LikeAndDislike from "./likeAndDislike";






function Review(props) {
    return (
        <>
     
            <div className="container">
                <div className="row">
                    <div className="col-2 profileImage">

                        <img src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" width={"80px"} alt="profileImage" />


                    </div>
                    <div className="col-10">
                        <div className="row nameAndDate">
                            <div className="col-12">
                                <span>{props.user_name}</span></div>
                            <div className="col-12"><span>{props.review_date}</span></div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 reviewContent">
                        <p>{props.reviews}

                            <i class="fas fa-arrow-up"></i>
                        </p>

                    </div>
                </div>
                <div className="row">
                    <div className="col-12 criticRating">
                       <LikeAndDislike
                       reviewId={props.review_id}
                       ></LikeAndDislike>
                    </div>
                </div>
                
            </div>
            
        </>
    );
}
export default Review;