import { useStars } from './StarsProvider';

function StarsInfo() {
    const { selectedStar } = useStars(); // Get selectedStar from context

    return (
        <div className="star-info">
            <div className="star-info-panel">
                {selectedStar ? (
                    <>
                        <h2>{selectedStar.properName}</h2>
                        <p><strong>Designations:</strong> {selectedStar.designations[0]}</p>
                        <p><strong>Distance from Sol:</strong> {Math.floor(selectedStar.distance)} parsecs</p>
                        <p><strong>Brightness</strong> {selectedStar.brightness}</p>
                        <p><strong>Magnitude:</strong> {selectedStar.brightness}</p>
                        <p><strong>Spectral Class:</strong> {selectedStar.spectralClass}</p>
                        <p><strong>Constellation:</strong> {selectedStar.constellation}</p>
                        <p><strong>Name Origin:</strong> {selectedStar.nameOrigin}</p>
                    </>
                ) : (
                    <h2>Select a star</h2>
                )}
            </div>
        </div>
    );
}

export default StarsInfo;
