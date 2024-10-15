import { useEffect, useRef } from 'react';
import { useStars } from '../Stars/StarsProvider';
import * as THREE from 'three';

function Camera() {
    const { selectedStar } = useStars([]);
    const cameraRef = useRef();

    useEffect(() => {
        if (cameraRef.current) {
            if (selectedStar) {
                const [targetX, targetY, targetZ] = selectedStar.position.split(' ').map(parseFloat);
                const targetPosition = new THREE.Vector3(targetX, targetY, targetZ + 0.2);
                lerpToTarget(targetPosition);
            } else {
                const defaultPosition = new THREE.Vector3(0, 0, 0);
                lerpToTarget(defaultPosition);
            }
        }
    }, [selectedStar]);

    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const lerpToTarget = (targetPosition) => {
        if (!cameraRef.current) return;

        const duration = 1000; // Duration in ms for the lerp animation
        const startTime = performance.now();
        const startPosition = new THREE.Vector3().copy(cameraRef.current.object3D.position);

        const animate = () => {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
            const t = Math.min(elapsedTime / duration, 1); // Normalize time for smooth transition between 0 and 1
            const easedT = easeInOutCubic(t); // Apply easing function

            const lerpedPosition = new THREE.Vector3().lerpVectors(startPosition, targetPosition, easedT);
            cameraRef.current.object3D.position.copy(lerpedPosition);

            if (t < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <a-camera
            // ref={cameraRef}
            wasd-controls="fly: true; acceleration: 20"
        ></a-camera>
    );
}

export default Camera;
