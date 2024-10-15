// import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useStars } from './StarsProvider';

function StarsFilter() {
    const { stars, setStars } = useStars();
    const initialStars = useRef([]);
    const currentFilter = useRef('All');
    const currentSort = useRef('name');
    
    useEffect(() => {
        if (initialStars.current.length === 0 && stars.length > 0) {
            initialStars.current = stars;
            applyFiltersAndSort();
        }
    }, [stars]);

    const handleCatalogChange = (event) => {
        currentFilter.current = event.target.value;
        applyFiltersAndSort();
    };

    const handleSortChange = (event) => {
        currentSort.current = event.target.value;
        applyFiltersAndSort();
    };

    const applyFiltersAndSort = () => {
        const filteredStars = initialStars.current.filter((star) => {
            if (currentFilter.current === 'All') return true;
            for (let designation of star.designations) if (designation.startsWith(currentFilter.current)) return true;
            return false;
        });

        const sortedStars = filteredStars.sort((a, b) => {
            if (currentSort.current === 'name') {
                if (a.named && !b.named) return -1;
                if (!a.named && b.named) return 1;
                return a.properName.localeCompare(b.properName);
            }
            if (currentSort.current === 'brightness') {
                return b.brightness - a.brightness;
            }
            if (currentSort.current === 'distance') {
                return a.distance - b.distance;
            }
            return 0;
        });

        setStars(sortedStars);
    };

    return (
        <div className="star-filter">
            <div className="catalog-filter filter">
                <label htmlFor="star-filter">Catalog:</label>
                <select onChange={handleCatalogChange}>
                    <option value="All">All</option>
                    <option value="HIP">HIP</option>
                    <option value="Gaia DR1">Gaia DR1</option>
                    <option value="Gaia DR2">Gaia DR2</option>
                    <option value="Gaia DR3">Gaia DR3</option>
                    <option value="WEB">WEB</option>
                    <option value="TIC">TIC</option>
                    <option value="2MASS">2MASS</option>
                </select>
            </div>
            <div className="sort-filter filter">
                <label htmlFor="sort-filter">Sort by:</label>
                <select id="sort-filter" onChange={handleSortChange}>
                    {/* <option value="default">Default</option> */}
                    <option value="name">Name (A-Z)</option>
                    <option value="brightness">Brightness (Highest First)</option>
                    <option value="distance">Distance (Nearest First)</option>
                </select>
            </div>
        </div>
    );
}

export default StarsFilter;