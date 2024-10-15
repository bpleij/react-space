import React, { useEffect, useRef } from 'react';
import { useStars } from './StarsProvider';

function StarDisplay() {
    const { stars } = useStars();
    const starRefs = useRef([]);

    function scaleBrightness(brightness) {
        const minBrightness = 4;
        const maxBrightness = 7;
        const normalized = (brightness - minBrightness) / (maxBrightness - minBrightness);
        const scaled = Math.pow(normalized, 2);
        return 0.1 + scaled * (2 - 0.1);
    }

    // Loading the material and geometry for each star directly in the returned element causes issues in some browsers,
    // setting them in a useEffect after the elements exist seems to resolve the issue 
    useEffect(() => {
        starRefs.current.forEach((starEl, index) => {
            if (starEl) {
                const star = stars[index];
                starEl.setAttribute('geometry', `primitive: sphere; radius: ${star.radius / 100}`);
                starEl.setAttribute('material', `emissive: ${star.color}; emissiveIntensity: ${scaleBrightness(star.brightness)}`);
            }
        });
    }, [stars]);

    return (
        <a-entity id="star-container">
            {stars.map((star, index) => (
                <a-entity
                    key={index}
                    ref={(el) => (starRefs.current[index] = el)}
                    id={star.properName || `star-${index}`}
                    position={star.position}
                    distance={star.distance}
                ></a-entity>
            ))}
        </a-entity>
    );
}

export default StarDisplay;
