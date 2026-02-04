'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';

const Earth: React.FC = () => {
  const earthRef = useRef<any>(null);

  useFrame((state) => {
    if (!earthRef.current) return;
    const t = state.clock.getElapsedTime();
    earthRef.current.rotation.y = t * 0.15;
  });

  return (
    <group ref={earthRef}>
      {/* основна сфера-земля */}
      <mesh>
        <sphereGeometry args={[1.7, 64, 64]} />
        <meshStandardMaterial
          color="#1D4ED8"
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>
      {/* тонка "атмосфера" */}
      <mesh>
        <sphereGeometry args={[1.76, 32, 32]} />
        <meshStandardMaterial
          color="#60A5FA"
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
};

const EarthOrbit: React.FC = () => {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.3;
  });

  const satellites = Array.from({ length: 6 });

  return (
    <group ref={groupRef}>
      {satellites.map((_, i) => {
        const angle = (i / satellites.length) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={i}>
            {/* лінія звʼязку до Землі */}
            <Line
              points={[
                [x, 0, z],
                [0, 0, 0],
              ]}
              color="#4F46E5"
              lineWidth={1.5}
            />
            {/* "супутник" / вузол користувача */}
            <mesh position={[x, 0, z]}>
              <sphereGeometry args={[0.22, 24, 24]} />
              <meshStandardMaterial
                color="#E5E7EB"
                emissive="#6366F1"
                emissiveIntensity={0.7}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const SpatialCanvas: React.FC = () => {
  return (
    <div className="w-full h-80 rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
      <Canvas camera={{ position: [0, 3, 7], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} />
        <Earth />
        <EarthOrbit />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default SpatialCanvas;

