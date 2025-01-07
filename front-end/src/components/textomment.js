import React from "react";
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
function TextComment(){
    return(
        <>
        <div className="container textReview">
            <div className="row">
                <div className="col-10 icon-textarea-container">
                <span className="comment-icon"><CommentIcon/></span>
                <textarea name="textComment" id="" rows={6}></textarea>
                <span className="textLogo"><SendIcon/> </span>

                </div>
                
            </div>
        </div>
        </>
    );
}
export default TextComment;