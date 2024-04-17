/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Box, Environment, Html, OrbitControls, RenderTexture, Stats, Text } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import TWEEN from '@tweenjs/tween.js'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js'
import { ColorConverter } from 'three/examples/jsm/math/ColorConverter'

// function SingleCube({ position, geometry, onClick }) {
//     const textCanvas = document.createElement('canvas');
//     const contextCanvas = textCanvas.getContext('2d');
//     const x = textCanvas.width / 2;
//     const y = textCanvas.height / 2;
//     contextCanvas.fillRect(0, 0, 600, 600);
//     contextCanvas.fillStyle = "white";
//     contextCanvas.font = 'bold 20px Arial';
//     contextCanvas.strokeStyle = '#ffffff';
//     contextCanvas.textAlign = 'center';
//     contextCanvas.shadowColor = '#ffffff';
//     contextCanvas.fillText('Simple Text', x, y,);

//     //     strDataURI = canvas.toDataURL("image/jpeg");
//     // imag = new Image();
//     // imag.src = strDataURI;
//     // const mesh = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( imag.src ) } );
//     const textTextture = new THREE.CanvasTexture(textCanvas,
//         ColorConverter.setHSV(new THREE.Color('green'), 1, 1, 1)
//     );
//     // const textTextture = new THREE.CanvasTexture(textCanvas);

//     // console.log(contextCanvas)

//     // THREE.ImageUtils.crossOrigin = '';
//     // // var texture = THREE.ImageUtils.loadTexture('./assets/cam.jpg');
//     // let texture = THREE.ImageUtils.loadTexture('./assets/cam.jpg');
//     // texture.anisotropy = Renderer.getMaxAnisotropy();


//     const loaders = new THREE.TextureLoader();
//     const _img_texture = loaders.load('/public/assets/cam.jpg');
//     // const cubeMaterial = new THREE.MeshStandardMaterial({ map: _img_texture });
//     // console.log(texture)

//     // const _imgLoader = useLoader(TextureLoader, '/public/assets/cam.jpg');


//     const textRef = useRef();

//     return (
//         <mesh position={position} geometry={geometry} onClick={onClick} scale={1.5}>
//             {[...Array(6).keys()].map((i) => (
//                 <meshStandardMaterial key={i} attach={`material-${i}`}
//                 // // map={texture}
//                 // // {...cubeMaterial[i]}
//                 // map={textTextture}
//                 // // color={'green'}
//                 // blendColor={'#000000'}
//                 // // aoMapIntensity={10}
//                 //  />
//                 >
//                     <RenderTexture attach="map" anisotropy={1}>
//                         <color attach="background" args={['#ffffff']} />
//                         <ambientLight intensity={0.5} />
//                         <Text ref={textRef} fontSize={4} color="#000000">
//                             hello
//                         </Text>
//                     </RenderTexture>
//                 </meshStandardMaterial>
//             ))}
//         </mesh>
//     )
// }

function Cube({ setStep }) {
    const ref = useRef();
    const roundedBoxGeometry = useMemo(() => {
        return new RoundedBoxGeometry(1, 1, 1, 1, 0.05)
    }, []);

    // console.log("RoundedBoxGeometry", roundedBoxGeometry)

    const [showSingleCube, setShowSingleCube] = useState(false)
    const [singleCubePosition, setSingleCubePosition] = useState([0, 0, 0]);


    const [dbClickTimer, setDbClickTimer] = useState(null);

    const handleCubeletClick = (position, exactPosition) => {

        console.log("exactPosition", exactPosition);
        // setSingleCubePosition(position);
        if (dbClickTimer) {
            clearTimeout(dbClickTimer);
            setDbClickTimer(null);

            // setShowSingleCube(!showSingleCube);

            setStep('secondtLayer')
        } else {
            const timer = setTimeout(() => {
                setDbClickTimer(null);
            }, 200);
            setDbClickTimer(timer);
        }
    }


    useFrame(() => {
        TWEEN.update()
    });

    useEffect(() => {
        return () => {
            clearTimeout(dbClickTimer);
        };
    }, []);

    return (
        <>
            {/* {showSingleCube ? (
                <SingleCube
                    position={singleCubePosition}
                    geometry={new RoundedBoxGeometry(2, 2, 2, 1, 0.05)}
                    onClick={() => handleCubeletClick(singleCubePosition)}
                />
            ) : ( */}
            <group ref={ref}>
                {[...Array(3).keys()].map((x, i) =>
                    [...Array(3).keys()].map((y, j) =>
                        [...Array(3).keys()].map((z, k) => (
                            <Cubelet
                                indexes={[i, j, k]}
                                positionss={[x, y, z]}
                                key={x + y * 3 + z * 9}
                                position={[x - 1, y - 1, z - 1]}
                                geometry={roundedBoxGeometry}
                                onClick={() => handleCubeletClick([x - 1, y - 1, z - 1], [x, y, z])}
                            />
                        ))
                    )
                )}
            </group>
            {/* )} */}
        </>
    )
}

function Cubelet({ position, geometry, onClick, indexes, positionss }) {
    // console.log('position', positionss, "indexes", indexes);
    // console.log('position', position, "indexes", indexes);


    return (

        <mesh position={position} geometry={geometry} onClick={onClick} scale={[1, 1, 1]}>
            {[...Array(6).keys()].map((i) => (
                <meshStandardMaterial key={i} attach={`material-${i}`} />
            ))}
            {/* <Html occlude distanceFactor={3.5} position={[0, 0, 0.51]} transform>
        <span>xc1</span>
      </Html> */}
            {/* <Text
        position={[-1, 0.5, 0.5]} // Adjust for each face
        fontSize={0.1}
        anchorX="center"
        anchorY="middle"
        color={"black"}
        // material={{ color: 'black' }} // Adjust material properties
      >
        Bangladesh
      </Text> */}
            {/* <Text
        position={[0.5, 0.5, 0.1]} // Adjust for each face
        fontSize={0.1}
        anchorX="center"
        anchorY="middle"
        color={"black"}
        // material={{ color: 'black' }} // Adjust material properties
      >
        Bangladesh
      </Text> */}
            {/* <boxGeometry args={[1, 1, 1]} />
      */}

            {/* <meshStandardMaterial color="white" />
      <CubeLabel text="Front" position={[0, 0, 0.51]} rotation={[0, 0, 0]} />
      <CubeLabel text="Back" position={[0, 0, -0.51]} rotation={[0, Math.PI, 0]} />
      <CubeLabel text="Top" position={[0, 0.51, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <CubeLabel text="Bottom" position={[0, -0.51, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <CubeLabel text="Left" position={[-0.51, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <CubeLabel text="Right" position={[0.51, 0, 0]} rotation={[0, Math.PI / 2, 0]} />  */}
            {/* <meshStandardMaterial color="white" />
      <CubeLabel text="Front" position={[-3, 0, 0.51]} rotation={[0, 0, 0]} /> */}
            {/* <CubeLabel text="Back" position={[0, 0, -0.51]} rotation={[0, Math.PI, 0]} />
      <CubeLabel text="Top" position={[0, 0.51, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <CubeLabel text="Bottom" position={[0, -0.51, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <CubeLabel text="Left" position={[-0.51, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <CubeLabel text="Right" position={[0.51, 0, 0]} rotation={[0, Math.PI / 2, 0]} />  */}
        </mesh>
    )
}
const colorGrades = {
    XA1:[-8,-5,-3,-2,-1,2,0,3,1,-4,1],
    XB1:[-7,-4,-2,-1,0,3,1,4,2,-2,2],
    XC1:[-6,-3,-1,0,1,4,2,5,3,-1,3],
    YA1:[-6,-3,-1,0,1,3,2,4,2,2,3],
    YB1:[-5,-2,0,1,2,4,3,5,3,3,4],
    YC1:[-4,-1,1,2,3,5,4,6,4,4,5],
    ZA1:[-8,-4,-2,-1,0,2,1,3,1,-3,2],
    ZB1:[-7,-3,-1,0,1,3,2,4,2,-1,3],
    ZC1:[-6,-2,0,1,2,4,3,5,3,0,4],
};



const cubeData = [
    // Front side data
    {
        text: 'XC1',
        anchorX: 'center',
        position: [-1, 1, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'XB1',
        anchorX: 'center',
        position: [-1, 0, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'XA1',
        anchorX: 'center',
        position: [-1, -1, 1.5],
        rotation: [0, 0, 0],
    },

    {
        text: 'YC1',
        anchorX: 'center',
        position: [0, 1, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'YB1',
        anchorX: 'center',
        position: [0, 0, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'YA1',
        anchorX: 'center',
        position: [0, -1, 1.5],
        rotation: [0, 0, 0],
    },

    {
        text: 'ZC1',
        anchorX: 'center',
        position: [1, 1, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'ZB1',
        anchorX: 'center',
        position: [1, 0, 1.5],
        rotation: [0, 0, 0],
    },

    {
        text: 'ZA1',
        anchorX: 'center',
        position: [1, -1, 1.5],
        rotation: [0, 0, 0],
    },


    // Left side data
    {
        text: 'C:\nSolutions',
        anchorX: 'right',
        position: [-1.8, 1, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'B:\nTransition',
        anchorX: 'right',
        position: [-1.8, 0, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'A:\nRisk\nreduction',
        anchorX: 'right',
        position: [-1.8, -1, 1.5],
        rotation: [0, 0, 0],
    },

    // Front-Down side data
    {
        text: 'X: Climate\nmitigation',
        anchorX: 'center',
        position: [-1, -1.7, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'Y: Climate\nadaptation',
        anchorX: 'center',
        position: [0, -1.7, 1.5],
        rotation: [0, 0, 0],
    },
    {
        text: 'Z: Biodiversity',
        anchorX: 'center',
        position: [1, -1.7, 1.5],
        rotation: [0, 0, 0],
    },

    // Right-Down side data
    {
        text: '3:\nSpend',
        anchorX: 'center',
        position: [2, -1.7, -1],
        rotation: [0, 0, -0.31],
    },
    {
        text: '2:\nLend',
        anchorX: 'center',
        position: [2, -1.7, 0],
        rotation: [0, 0, -0.31],
    },
    {
        text: '1:\nInvest',
        anchorX: 'center',
        position: [2, -1.7, 1],
        rotation: [0, 0, -0.31],
    },
];


function RubikCube({ setStep }) {
    const texts = 'Risk\nreduction';
    return (
        <>
            {/* <img style={{width:"500px", height:"500px"}} src="/public/assets/cam.jpg" alt="" /> */}
            {/* <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [3, 3, 3] }}> */}
            {/* <Canvas style={{ width: '100vw', height: '100vh' }} orthographic camera={{ position: [-2, 3, 4], left: -2, right: 2, top: 2, bottom: -2 }}> */}
            {/* <Canvas style={{ width: '100vw', height: '100vh' }} orthographic camera={{ position: [-3, 2, 5], left: -2, right: 2, top: 2, bottom: -2, zoom: 100 }}> */}
            {/* <Canvas style={{ width: '100vw', height: '100vh' }} orthographic camera={{ position: [-3, 2, 5], left: -2, right: 2, top: 2, bottom: -2, zoom: 100 }}> */}
            <Canvas style={{ width: '100vw', height: '100vh' }} orthographic camera={{ position: [2.5, 2, 5], left: -2, right: 2, top: 2, bottom: -2, zoom: 100 }}>
                <ambientLight intensity={0.5} />
                <color attach="background" args={['#818589']} />
                {/* <color attach="background" args={['#ffffff']} /> */}
                <Suspense>
                    <Environment preset="sunset" />
                </Suspense>
                <Cube setStep={setStep} />
                <OrbitControls target={[0, 0, 0]} />
                {/* <ContactShadows frames={1} position={[0, -0.5, 0]}  color="orange" /> */}
                <Stats />
                <Box />
                <meshStandardMaterial color="white" />
                <>
                    {/* left */}
                </>
                <>
                    {/* bottom */}
                </>
                <>
                    {/* right */}
                    {/* <CubeLabel anchorX={'right'} text="Solutions" position={[-1.8, 1, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'right'} text="Transition" position={[-1.8, 0, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'right'} text={texts} position={[-1.8, -1, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'center'} text="Climate mitigation" position={[1, -1.7, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'center'} text="Climate adaptation" position={[0, -1.7, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'center'} text="Biodiversity" position={[-1, -1.7, 1.5]} rotation={[0, 0, 0]} />
                    <CubeLabel anchorX={'center'} text="Spend" position={[2, -1.7, -1]} rotation={[0, 0, -0.31]} />
                    <CubeLabel anchorX={'center'} text="Lend" position={[2, -1.7, 0]} rotation={[0, 0, -0.31]} />
                    <CubeLabel anchorX={'center'} text="Invest" position={[2, -1.7, 1]} rotation={[0, 0, -0.31]} />

                     */}

                </>
                {cubeData.map((cube, index) => (
                    <CubeLabel
                        key={index}
                        anchorX={cube.anchorX}
                        text={cube.text}
                        position={cube.position}
                        rotation={cube.rotation}
                    />
                ))}
            </Canvas>
        </>
    )
}

export default RubikCube;

const CubeLabel = ({ text, position, rotation, anchorX }) => {
    return (
        <Text
            position={position}
            rotation={rotation}
            fontSize={0.12}
            color="black"
            anchorX={anchorX}
            anchorY="middle"
            remove={true}
            whiteSpace='pre-wrap'
        >
            {text}
        </Text>
    )
}

//? prev code end













// /* eslint-disable react/no-unknown-property */
// /* eslint-disable react/prop-types */
// import { Box, Environment, Html, OrbitControls, RenderTexture, Stats, Text } from '@react-three/drei'
// import { Canvas, useFrame } from '@react-three/fiber'
// import TWEEN from '@tweenjs/tween.js'
// import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
// import * as THREE from 'three'
// import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
// import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js'
// import { ColorConverter } from 'three/examples/jsm/math/ColorConverter'

// function Cube({ setStep }) {
//     const ref = useRef();
//     const roundedBoxGeometry = useMemo(() => {
//         return new RoundedBoxGeometry(1, 1, 1, 1, 0.05)
//     }, []);

//     const [animationStep, setAnimationStep] = useState(0); // 0: initial, 1: separated, 2: reposition, 3: zoom in, 4: merged

//     const handleCubeletClick = () => {
//         setAnimationStep((prevStep) => (prevStep + 1) % 5);
//     }

//     useFrame(() => {
//         TWEEN.update()

//         // Separate cubes
//         if (animationStep === 1) {
//             ref.current.children.forEach((child, index) => {
//                 const x = (index % 3) - 1;
//                 const y = Math.floor((index / 3) % 3) - 1;
//                 const z = Math.floor(index / 9) - 1;

//                 const position = new THREE.Vector3(x * 2, y * 2, z * 2);
//                 new TWEEN.Tween(child.position)
//                     .to({ x: position.x, y: position.y, z: position.z }, 1000)
//                     .easing(TWEEN.Easing.Cubic.Out)
//                     .start();
//             });
//         }

//         // Reposition cubes
//         if (animationStep === 2) {
//             ref.current.children.forEach((child, index) => {
//                 const x = Math.random() * 4 - 2;
//                 const y = Math.random() * 4 - 2;
//                 const z = Math.random() * 4 - 2;

//                 const position = new THREE.Vector3(x, y, z);
//                 new TWEEN.Tween(child.position)
//                     .to({ x: position.x, y: position.y, z: position.z }, 1000)
//                     .easing(TWEEN.Easing.Cubic.Out)
//                     .start();
//             });
//         }

//         // Zoom in
//         if (animationStep === 3) {
//             ref.current.children.forEach((child) => {
//                 new TWEEN.Tween(child.scale)
//                     .to({ x: 0.5, y: 0.5, z: 0.5 }, 1000)
//                     .easing(TWEEN.Easing.Cubic.Out)
//                     .start();
//             });
//         }

//         // Merge cubes
//         if (animationStep === 4) {
//             ref.current.children.forEach((child, index) => {
//                 const x = (index % 3) - 1;
//                 const y = Math.floor((index / 3) % 3) - 1;
//                 const z = Math.floor(index / 9) - 1;

//                 const position = new THREE.Vector3(x, y, z);
//                 new TWEEN.Tween(child.position)
//                     .to({ x: position.x, y: position.y, z: position.z }, 1000)
//                     .easing(TWEEN.Easing.Cubic.Out)
//                     .start();

//                 new TWEEN.Tween(child.scale)
//                     .to({ x: 1, y: 1, z: 1 }, 1000)
//                     .easing(TWEEN.Easing.Cubic.Out)
//                     .start();
//             });
//         }
//     });

//     return (
//         <>
//             <group ref={ref} onClick={handleCubeletClick}>
//                 {[...Array(3).keys()].map((x, i) =>
//                     [...Array(3).keys()].map((y, j) =>
//                         [...Array(3).keys()].map((z, k) => (
//                             <Cubelet
//                                 key={x + y * 3 + z * 9}
//                                 position={[x - 1, y - 1, z - 1]}
//                                 geometry={roundedBoxGeometry}
//                             />
//                         ))
//                     )
//                 )}
//             </group>
//         </>
//     )
// }

// function Cubelet({ position, geometry }) {
//     return (
//         <mesh position={position} geometry={geometry}>
//             {[...Array(6).keys()].map((i) => (
//                 <meshStandardMaterial key={i} attach={`material-${i}`} />
//             ))}
//         </mesh>
//     )
// }
