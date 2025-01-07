import React from "react";
function Caste({ casts }) {
    return (
        <>
            <div className="casteContainer">
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">

                    {casts.reduce((resultArreay, item, index) => {
    const chunkIndex = Math.floor(index / 5);
    // Create a new chunk if it doesn't exist
    if (!resultArreay[chunkIndex]) {
        resultArreay[chunkIndex] = []; // Start a new chunk
    }
    // Add item to the current chunk
    resultArreay[chunkIndex].push(item);
    return resultArreay;
}, []).map((castGroup, groupIndex) => (
    <div
        key={groupIndex} // Ensure unique key for each slide
        className={`carousel-item ${groupIndex === 0 ? "active" : ""}`} // Add "active" only to the first slide
    >
        <div className="d-flex justify-content-center"> {/* Flex container for alignment */}
            {castGroup.map((cast, index) => (
                <div 
                    key={cast.caste_id || index} 
                    className="text-center mx-3" // Center-align text and add spacing
                >
                    <img
                        src={cast.caste_image_url}
                        width="100px"
                        style={{ borderRadius: "50%",  border:"4px solid #2e1065"}}
                        className="d-block mx-auto" // Center the image horizontally
                        alt={`Slide ${groupIndex + 1} - Cast ${index + 1}`}
                    />
                    <p style={{ marginTop: "10px", fontSize: "0.9rem", fontWeight: "bold", color:"#f8fafc" }}>
                        {cast.caste_name}
                    </p>
                </div>
            ))}
        </div>
    </div>
))}





                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

        </>
    )
}
export default Caste;