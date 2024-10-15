import React, { useState } from 'react';
import { useStars } from './StarsProvider';

const PAGE_SIZE = 50; // Number of stars per page

function StarList() {
    const { stars, setSelectedStar } = useStars();
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(stars.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const currentStars = stars.slice(startIndex, startIndex + PAGE_SIZE);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleStarClick = (star) => {
        setSelectedStar(star); // Set the selected star
    };

    return (
        <div className="star-list">
            <div className="pagination-controls">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
                    {currentPage} of {totalPages}
                </span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            <div className="star-list-container">
            {currentStars.map((star, index )=> (
                <div key={index} className="star-list-item" onClick={() => handleStarClick(star)}>
                    <div className='star-list-name'>{star.properName}</div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default StarList;
