import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CubeComponent from './CubeComponent';

const Scene = () => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [5, 5, 5] }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CubeComponent />
    </Canvas>
  );
};

export default Scene;