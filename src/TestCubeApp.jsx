
// // src/App.js
// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Text, Environment } from '@react-three/drei';
// import * as THREE from 'three';

// const Cell = ({ position, label, color, onCubeClick }) => (
//   <mesh position={position} onClick={() => onCubeClick(label)}>
//     <planeGeometry args={[1, 1]} />
//     {/* <meshBasicMaterial color={color} side={2} /> */}
//     <meshStandardMaterial color="silver" metalness={1} roughness={0.25} />
//     {/* <meshBasicMaterial color='silver' side={2} /> */}
//     <lineSegments>
//       <edgesGeometry args={[new THREE.PlaneGeometry(1, 1)]} />
//       <lineBasicMaterial color={'black'} linewidth={2} />
//     </lineSegments>
//     <Text
//       position={[0, 0, 0.01]}
//       fontSize={0.3}
//     //   color="black"
//       color="white"
//       anchorX="center"
//       anchorY="middle"
//     >
//       {label}
//     </Text>
//   </mesh>
// );

// const Face = ({ position, rotation, labels, color, onCubeClick }) => (
//   <group position={position} rotation={rotation}>
//     {labels.map((label, index) => (
//       <Cell
//         key={index}
//         position={[
//           ((index % 3) - 1) * 1,
//           (1 - Math.floor(index / 3)) * 1,
//           0,
//         ]}
//         onCubeClick={onCubeClick}
//         label={label}
//         color={color}
//       />
//     ))}
//   </group>
// );

// const Cube = () => {
//   const faces = [
//     { position: [0, 0, 1.5], rotation: [0, 0, 0], labels: ['XA1', 'YA1', 'ZA1', 'XB1', 'YB1', 'ZB1', 'XC1', 'YC1', 'ZC1'], color: 'red' },
//     { position: [0, 0, -1.5], rotation: [0, Math.PI, 0], labels: ['XC3', 'YC3', 'ZC3', 'XC2', 'YC2', 'ZC2', 'XC1', 'YC1', 'ZC1'], color: 'skyblue' },
//     { position: [1.5, 0, 0], rotation: [0, Math.PI / 2, 0], labels: ['ZC1', 'ZC2', 'ZC3', 'ZB1', 'ZB2', 'ZB3', 'ZA1', 'ZA2', 'ZA3'], color: 'blue' },
//     { position: [-1.5, 0, 0], rotation: [0, -Math.PI / 2, 0], labels: ['ZA1', 'ZA2', 'ZA3', 'ZB1', 'ZB2', 'ZB3', 'ZC1', 'ZC2', 'ZC3'], color: 'green' },
//     { position: [0, 1.5, 0], rotation: [-Math.PI / 2, 0, 0], labels: ['XA1', 'XB1', 'XC1', 'YA1', 'YB1', 'YC1', 'ZA1', 'ZB1', 'ZC1'], color: 'yellow' },
//     { position: [0, -1.5, 0], rotation: [Math.PI / 2, 0, 0], labels: ['XA3', 'XB3', 'XC3', 'YA3', 'YB3', 'YC3', 'ZA3', 'ZB3', 'ZC3'], color: 'purple' },
//   ];

//   const handleClickedCube = (payload) => {
//     console.log("single clicked", payload);
//   }

//   return (
//     <>
//       {faces.map((face, index) => (
//         <Face
//           key={index}
//           position={face.position}
//           rotation={face.rotation}
//           labels={face.labels}
//           color={face.color}
//           onCubeClick={handleClickedCube}
//         />
//       ))}
//     </>
//   );
// };

// const App = () => (
//   <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
//     <ambientLight intensity={0.5} />
//     <pointLight position={[10, 10, 10]} />
//       <directionalLight position={[5, 5, 5]} />
//     <Cube />
//     <Environment preset="sunset" />
//     <OrbitControls />
//   </Canvas>
// );

// export default App;



import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Cell = ({ position, label, color, onCubeClick }) => (
  <mesh position={position} onClick={(e) => { e.stopPropagation(); onCubeClick(label); }}>
    <planeGeometry args={[1, 1]} />
    <meshStandardMaterial color="silver" metalness={1} roughness={0.25} />
    <lineSegments>
      <edgesGeometry args={[new THREE.PlaneGeometry(1, 1)]} />
      <lineBasicMaterial color={'black'} linewidth={2} />
    </lineSegments>
    <Text
      position={[0, 0, 0.01]}
      fontSize={0.3}
      color="white"
      anchorX="center"
      anchorY="middle"
    >
      {label}
    </Text>
  </mesh>
);

const Face = ({ position, rotation, labels, color, onCubeClick }) => (
  <group position={position} rotation={rotation}>
    {labels.map((label, index) => (
      <Cell
        key={index}
        position={[
          ((index % 3) - 1) * 1,
          (1 - Math.floor(index / 3)) * 1,
          0,
        ]}
        onCubeClick={onCubeClick}
        label={label}
        color={color}
      />
    ))}
  </group>
);

const Cube = () => {
  const faces = [
    { position: [0, 0, 1.5], rotation: [0, 0, 0], labels: ['XA1', 'YA1', 'ZA1', 'XB1', 'YB1', 'ZB1', 'XC1', 'YC1', 'ZC1'], color: 'red' },
    { position: [0, 0, -1.5], rotation: [0, Math.PI, 0], labels: ['XC3', 'YC3', 'ZC3', 'XC2', 'YC2', 'ZC2', 'XC1', 'YC1', 'ZC1'], color: 'skyblue' },
    { position: [1.5, 0, 0], rotation: [0, Math.PI / 2, 0], labels: ['ZC1', 'ZC2', 'ZC3', 'ZB1', 'ZB2', 'ZB3', 'ZA1', 'ZA2', 'ZA3'], color: 'blue' },
    { position: [-1.5, 0, 0], rotation: [0, -Math.PI / 2, 0], labels: ['ZA1', 'ZA2', 'ZA3', 'ZB1', 'ZB2', 'ZB3', 'ZC1', 'ZC2', 'ZC3'], color: 'green' },
    { position: [0, 1.5, 0], rotation: [-Math.PI / 2, 0, 0], labels: ['XA1', 'XB1', 'XC1', 'YA1', 'YB1', 'YC1', 'ZA1', 'ZB1', 'ZC1'], color: 'yellow' },
    { position: [0, -1.5, 0], rotation: [Math.PI / 2, 0, 0], labels: ['XA3', 'XB3', 'XC3', 'YA3', 'YB3', 'YC3', 'ZA3', 'ZB3', 'ZC3'], color: 'purple' },
  ];

  const handleClickedCube = (label) => {
    console.log("Single clicked:", label);
  }

  return (
    <>
      {faces.map((face, index) => (
        <Face
          key={index}
          position={face.position}
          rotation={face.rotation}
          labels={face.labels}
          color={face.color}
          onCubeClick={handleClickedCube}
        />
      ))}
    </>
  );
};

const App = () => (
  <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <directionalLight position={[5, 5, 5]} />
    <Cube />
    <Environment preset="sunset" />
    <OrbitControls />
  </Canvas>
);

export default App;