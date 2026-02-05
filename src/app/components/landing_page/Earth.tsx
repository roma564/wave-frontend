'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export const Earth: React.FC = () => {
  const earthRef = useRef<any>(null);

  const albedo = useTexture('/textures/Night_Lights.jpg');

  useFrame((state) => {
    if (!earthRef.current) return;
    earthRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  return (
    <group>
    {/* Земля */}
    <mesh ref={earthRef}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial map={albedo} />
    </mesh>

    {/* Світло, яке стоїть на місці */}
    <directionalLight position={[5, 3, 5]} intensity={2} color="white" />
      <ambientLight intensity={0.3} />

    </group>

  );
};
