'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Earth } from './Earth';

const SpatialCanvas: React.FC = () => {
  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden glow ">
      <Canvas className="bg-transparent" camera={{ position: [0, 3, 7], fov: 45 }}>
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} />
        <Earth />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default SpatialCanvas;
