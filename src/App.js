import './App.css';
import 'aframe';

import  { StarProvider }  from './Stars/StarsProvider';
import Stars3D from './Stars/Stars3D'
import StarList from './Stars/StarsList'
import StarsFilter from './Stars/StarsFilter'
import StarsInfo from './Stars/StarsInfo'

import Sky from './Aframe/Sky'
import Camera from './Aframe/Camera'

function App() {
  return (
    <StarProvider >
      {/* HTML Overlay */}
      <div className='html-overlay'>
        <StarsFilter />
        <StarList />
        <StarsInfo />
      </div>
      {/* A-Frame Scene */}
      <a-scene>
        <Stars3D />
        <Sky />
        <Camera />
      </a-scene>
    </StarProvider>
  );
}

export default App;
