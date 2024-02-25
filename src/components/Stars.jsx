import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const Stars = ({ initialRating, deviceId }) => {
    const [rating, setRating] = useState(() => {
        const storedRating = localStorage.getItem(`rating-${deviceId}`);
        return storedRating ? parseInt(storedRating) : initialRating;
    });
    const [hover, setHover] = useState(null);

    useEffect(() => {
        localStorage.setItem(`rating-${deviceId}`, String(rating));
    }, [rating, deviceId]);

    const handleClick = (ratingValue) => {
        setRating(ratingValue === rating ? 0 : ratingValue);
    };

    return (
        <div>
            {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                    <FaStar
                        key={i}
                        className="star"
                        color={(hover && ratingValue <= hover) || ratingValue <= rating ? "yellow" : "orange"}
                        size={30}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => handleClick(ratingValue === rating ? 0 : ratingValue)}
                    />
                );
            })}
            <p>I rate this Device {rating === 0 ? 'Not rated' : `${rating} stars`}</p>
        </div>
    );
};

export default Stars;
