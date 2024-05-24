import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

const Cube = () => {
  const meshRef = useRef();

  // Rotate the cube on each frame
//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += 0.01;
//       meshRef.current.rotation.y += 0.01;
//     }
//   });

  return (
    <mesh ref={meshRef} scale={[3, 3, 3]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="silver" metalness={1} roughness={0.25} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Cube />
      <Environment preset="sunset" />
      <OrbitControls />
    </Canvas>
  );
};

export default App;