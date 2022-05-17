import React from "react";

function RatingStars({ rating }) {
  const [filledStar, setFilledStar] = React.useState([]);
  const [blnakStar, setBlnakStar] = React.useState([]);

  //calculate the filled and blank stars
  React.useEffect(() => {
    let ratNO = Math.floor(rating);
    setFilledStar(Array(ratNO).fill(1));
    setBlnakStar(Array(5 - ratNO).fill(1));
  }, [rating]);
  return (
    <>
      {filledStar?.map((star, index) => (
        <i key={index} className="fas fa-star"></i>
      ))}
      {blnakStar?.map((star, index) => (
        <i key={index} className="far fa-star"></i>
      ))}
    </>
  );
}

export default RatingStars;
