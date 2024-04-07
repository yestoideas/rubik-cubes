import { useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const CubeComponent = () => {
  const [hoveredCube, setHoveredCube] = useState(null);
  const texture = useLoader(TextureLoader, '/public/assets/cam.jpg');

  const handleCubeHover = (index) => {
    setHoveredCube(index);
  };

  const handleCubeUnhover = () => {
    setHoveredCube(null);
  };

  const renderCubes = () => {
    const cubes = [];
    const colors = ['pink', 'purple', 'green', 'blue'];

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const index = x * 9 + y * 3 + z;
          const color = colors[index % colors.length];
          const scale = hoveredCube === index ? 1.3 : 1;

          cubes.push(
            <mesh
              key={index}
              position={[x - 1, y - 1, z - 1]}
              scale={scale}
              onPointerOver={() => handleCubeHover(index)}
              onPointerOut={handleCubeUnhover}
            >
              <boxGeometry />
              <meshStandardMaterial color={color} map={texture} />
            </mesh>
          );
        }
      }
    }

    return cubes;
  };

  return <>{renderCubes()}</>;
};

export default CubeComponent;