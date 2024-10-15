// StarContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import starData from '../data/bsc5p_3d.json';
import starsSpectral from '../data/bsc5p_spectral_extra.json';
import starDesignations from '../data/bsc5p_names.json';
import iauData from '../data/iau_data.json';

// Create Context
const StarContext = createContext();

// Provider Component
export function StarProvider({ children }) {
    const [stars, setStars] = useState([]);
    const [selectedStar, setSelectedStar] = useState(null);

    useEffect(() => {
        const starProperties = starData.map((star, index) => {
            const spectral = starsSpectral[index];
            const designations = starDesignations[index].n

            let iauStarData;
            for (let name of designations) {
                if (name.startsWith('HIP ')) {
                    const hipNumber = name.slice(4);
                    console.log(parseInt(hipNumber));
                    iauStarData = iauData.find(iau => iau.HIP === parseInt(hipNumber));
                    break;
                }
            };
            let isNamed = false;
            if (iauStarData?.['Proper Name']) {
                isNamed = true;
            }
            return {
                designations: designations,
                named: isNamed,
                properName: iauStarData?.['Proper Name'] || designations[0],
                position: `${star.x || 0} ${star.y || 0} ${star.z || 0}`,
                radius: spectral.b,
                brightness: spectral.b,
                color: spectral.g,
                distance: star.p,
                spectralClass: spectral.s,
                constellation: iauStarData?.['Constellation'] || 'Unknown',
                nameOrigin: iauStarData?.['Origin'] || 'Unknown',
            };
        })

        setStars(starProperties);
    }, []);

    return (
        <StarContext.Provider value={{stars, setStars, selectedStar, setSelectedStar}}>
            {children}
        </StarContext.Provider>
    );
}

// Custom Hook to Access Star Data
export function useStars() {
    return useContext(StarContext);
}
