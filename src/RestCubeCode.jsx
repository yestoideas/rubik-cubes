// import { Environment, OrbitControls, Stats } from '@react-three/drei'
// import { Canvas, useFrame } from '@react-three/fiber'
// import TWEEN from '@tweenjs/tween.js'
// // import { button, useControls } from 'leva'
// import { Suspense, useMemo, useRef, useState } from 'react'
// import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

// function Buttons({ cubeGroup }) {
//     const rotationGroup = useRef()

//     // useControls('Cube', {
//     //     'Left CW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'x', -0.5, 1)
//     //     }),
//     //     'Left CCW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'x', -0.5, -1)
//     //     }),
//     //     'Right CW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'x', 0.5, -1)
//     //     }),
//     //     'Right CCW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'x', 0.5, 1)
//     //     }),
//     //     'Back CW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'z', -0.5, 1)
//     //     }),
//     //     'Back CCW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'z', -0.5, -1)
//     //     }),
//     //     'Front CW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'z', 0.5, -1)
//     //     }),
//     //     'Front CCW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'z', 0.5, 1)
//     //     }),
//     //     'Top CW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'y', 0.5, -1)
//     //     }),
//     //     'Top CCW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'y', 0.5, 1)
//     //     }),
//     //     'Bottom CW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'y', -0.5, 1)
//     //     }),
//     //     'Bottom CCW': button(() => {
//     //         rotate(cubeGroup.current, rotationGroup.current, 'y', -0.5, -1)
//     //     })
//     // })

//     return (
//         <>
//             <group ref={rotationGroup} />
//         </>
//     )
// }

// function Cube() {
//     const ref = useRef();
//     const [selectedCubelet, setSelectedCubelet] = useState(null);

//     console.log('selectedCubelet', selectedCubelet)

//     const roundedBoxGeometry = useMemo(() => {
//         return new RoundedBoxGeometry(1, 1, 1, 1, 0.02)
//     }, [])

//     useFrame(() => {
//         TWEEN.update()
//     })

//     return (
//         <>
//             <group ref={ref}>
//                 {[...Array(3).keys()].map((x) =>
//                     [...Array(3).keys()].map((y) =>
//                         [...Array(3).keys()].map((z) => (
//                             <Cubelet key={x + y * 3 + z * 9} position={[x - 1, y - 1, z - 1]} geometry={roundedBoxGeometry} selectedCubelet={selectedCubelet} setSelectedCubelet={setSelectedCubelet} cubeletPosition={[x, y, z]} />
//                         ))
//                     )
//                 )}
//             </group>
//             <Buttons cubeGroup={ref} />
//         </>
//     )
// }

// // const colorSides = [
// //     [0, 1, 'darkorange'],
// //     [0, -1, 'whitesmoke'],
// //     [1, 1, 'skyblue'],
// //     [1, -1, 'yellow'],
// //     [2, 1, 'green'],
// //     [2, -1, 'blue']
// // ]

// function Cubelet({ position, geometry, selectedCubelet, setSelectedCubelet, cubeletPosition }) {
//     const isSelected = selectedCubelet && selectedCubelet.join() === cubeletPosition.join();

//     const handleClick = () => {
//         // console.log('update', cubeletPosition, selectedCubelet)
//         // setSelectedCubelet(isSelected ? null : cubeletPosition);
//         // console.log(isSelected ? null : cubeletPosition);
//         if (isSelected) {
//             setSelectedCubelet(null); // Reset the selected cubelet
//         } else {
//             setSelectedCubelet(cubeletPosition);
//         }
//     };
// console.log('bolu', isSelected)
//     return (
//         <>
//             <mesh onClick={handleClick} position={position} geometry={geometry} scale={isSelected ? 5 : 1}>
//                 {[...Array(6).keys()].map((i) => (
//                     <meshStandardMaterial
//                         key={i}
//                         attach={`material-${i}`}
//                         // color={position[colorSides[i][0]] === colorSides[i][1] ? colorSides[i][2] : `black`}
//                     />
//                 ))}
//             </mesh>
//         </>
//     )
// }

// function resetCubeGroup(cubeGroup, rotationGroup) {
//     rotationGroup.children
//         .slice()
//         .reverse()
//         .forEach(function (c) {
//             cubeGroup.attach(c)
//         })
//     rotationGroup.quaternion.set(0, 0, 0, 1)
// }

// function attachToRotationGroup(cubeGroup, rotationGroup, axis, limit) {
//     cubeGroup.children
//         .slice()
//         .reverse()
//         .filter(function (c) {
//             return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit
//         })
//         .forEach(function (c) {
//             rotationGroup.attach(c)
//         })
// }

// function animateRotationGroup(rotationGroup, axis, multiplier) {
//     new TWEEN.Tween(rotationGroup.rotation)
//         .to(
//             {
//                 [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier
//             },
//             250
//         )
//         .easing(TWEEN.Easing.Cubic.InOut)
//         .start()
// }

// function rotate(cubeGroup, rotationGroup, axis, limit, multiplier) {
//     if (!TWEEN.getAll().length) {
//         resetCubeGroup(cubeGroup, rotationGroup)
//         attachToRotationGroup(cubeGroup, rotationGroup, axis, limit)
//         animateRotationGroup(rotationGroup, axis, multiplier)
//     }
// }

// function RubikCube() {
//     return (
//         <Canvas style={{width:"100vw", height:"100vh"}} camera={{ position: [3, 3, 3] }}>
//             <Suspense>
//                 <Environment preset="forest" />
//             </Suspense>
//             <Cube />
//             <OrbitControls target={[0, 0, 0]} />
//             <Stats />
//         </Canvas>
//     )
// }

// export default RubikCube;



//! sigle cube 


const colorSides = [
    [0, 1, 'darkorange'],
    [0, -1, 'whitesmoke'],
    [1, 1, 'skyblue'],
    [1, -1, 'yellow'],
    [2, 1, 'green'],
    [2, -1, 'blue']
]

import { ContactShadows, Dodecahedron, Environment, OrbitControls, PerspectiveCamera, RenderTexture, Stats, Text } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import TWEEN from '@tweenjs/tween.js'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import * as THREE from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import Renderer from 'three/examples/jsm/renderers/common/Renderer'
import { ColorConverter } from 'three/examples/jsm/math/ColorConverter';

function SingleCube({ position, geometry, onClick }) {
    // const imgBit = new THREE.ImageBitmapLoader();
    // imgBit.path = './assets/cam.jpg';
    // console.log(imgBit)

    const loader = new THREE.TextureLoader();
    // const [texture, setTexture] = useState(null);
    // // useEffect(() => {
    // //     const loadTexture = () => {
    // //       new THREE.ImageBitmapLoader()
    // //         .load(`./assets/cam.jpg?${performance.now()}`, (imageBitmap) => {
    // //           const texture = new THREE.CanvasTexture(imageBitmap);
    // //           texture.colorSpace = THREE.SRGBColorSpace;
    // //           setTexture(texture);
    // //           console.log('Texture loaded successfully');
    // //         })
    // //         // .catch((e) => {
    // //         //   console.error('Error loading texture:', e);
    // //         //   setTexture(null);
    // //         // });
    // //     };

    // //     loadTexture();
    // //   }, []);

    // // console.log(texture)
    // const img = loader.load('./assets/cam.jpg');
    const textCanvas = document.createElement('canvas');
    const contextCanvas = textCanvas.getContext('2d');
    const x = textCanvas.width / 2;
    const y = textCanvas.height / 2;
    contextCanvas.fillRect(0, 0, 600, 600);
    contextCanvas.fillStyle = "white";
    // contextCanvas.fillStyle= 'white';
    contextCanvas.font = 'bold 20px Arial';
    contextCanvas.strokeStyle = '#ffffff';
    contextCanvas.textAlign = 'center';
    contextCanvas.shadowColor = '#ffffff';
    // contextCanvas.back = 'bold 20px Arial';
    contextCanvas.fillText('Simple Text', x, y,);

    //     strDataURI = canvas.toDataURL("image/jpeg");
    // imag = new Image();
    // imag.src = strDataURI;
    // const mesh = new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( imag.src ) } );
    const textTextture = new THREE.CanvasTexture(textCanvas,
        ColorConverter.setHSV(new THREE.Color('green'), 1, 1, 1)
    );
    // const textTextture = new THREE.CanvasTexture(textCanvas);

    // console.log(contextCanvas)

    // THREE.ImageUtils.crossOrigin = '';
    // // var texture = THREE.ImageUtils.loadTexture('./assets/cam.jpg');
    // let texture = THREE.ImageUtils.loadTexture('./assets/cam.jpg');
    // texture.anisotropy = Renderer.getMaxAnisotropy();

    // var cubeMaterial = [
    //     new THREE.MeshBasicMaterial({
    //         map: texture //left
    //     }),
    //     new THREE.MeshBasicMaterial({
    //         color: 'orange' //right
    //     }),
    //     new THREE.MeshBasicMaterial({
    //         color: 'green' // top
    //     }),
    //     new THREE.MeshBasicMaterial({
    //         color: 'blue' // bottom
    //     }),
    //     new THREE.MeshBasicMaterial({
    //         color: 'pink' // front
    //     }),
    //     new THREE.MeshBasicMaterial({
    //         color: 'yellow' //back
    //     })
    // ];

    const loaders = new THREE.TextureLoader();
    const _img_texture = loaders.load('/public/assets/cam.jpg');
    // const cubeMaterial = new THREE.MeshStandardMaterial({ map: texture });
    // console.log(texture)

    // const cubeMaterial = [
    //     new THREE.MeshBasicMaterial({ map: texture }), 
    //     new THREE.MeshBasicMaterial({ color: 'orange' }),
    //     new THREE.MeshBasicMaterial({ color: 'green' }),
    //     new THREE.MeshBasicMaterial({ color: 'blue' }), 
    //     new THREE.MeshBasicMaterial({ color: 'pink' }), 
    //     new THREE.MeshBasicMaterial({ color: 'yellow' }), 
    //   ];


    // const _imgLoader = useLoader(TextureLoader, '/public/assets/cam.jpg');

    const textRef = useRef()
    // useFrame((state) => (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2));

    return (
        <mesh position={position} geometry={geometry} onClick={onClick} scale={1.5}>
            {[...Array(6).keys()].map((i) => (
                <meshStandardMaterial key={i} attach={`material-${i}`}
                // // map={texture}
                // // {...cubeMaterial[i]}
                // map={textTextture}
                // // color={'green'}
                // blendColor={'#000000'}
                // // aoMapIntensity={10}
                //  />
                >
                    <RenderTexture attach="map" anisotropy={1}>
                        <color attach="background" args={['#ffffff']} />
                        <ambientLight intensity={0.5} />
                        <Text ref={textRef} fontSize={4} color="#000000">
                            hello
                        </Text>
                    </RenderTexture>
                </meshStandardMaterial>
            ))}
        </mesh>
    )
}

function Cube() {
    const ref = useRef();
    const roundedBoxGeometry = useMemo(() => {
        return new RoundedBoxGeometry(1, 1, 1, 1, 0.02)
    }, [])

    const [showSingleCube, setShowSingleCube] = useState(false)
    const [singleCubePosition, setSingleCubePosition] = useState([0, 0, 0])

    const [dbClickTimer, setDbClickTimer] = useState(null);

    const handleCubeletClick = (position) => {
        if (dbClickTimer) {
            clearTimeout(dbClickTimer);
            setDbClickTimer(null);
            setShowSingleCube(!showSingleCube);
            setSingleCubePosition(position);
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
            {showSingleCube ? (
                <SingleCube
                    position={singleCubePosition}
                    geometry={new RoundedBoxGeometry(2, 2, 2, 1, 0.05)}
                    onClick={() => handleCubeletClick(singleCubePosition)}
                />
            ) : (
                <group ref={ref}>
                    {[...Array(3).keys()].map((x) =>
                        [...Array(3).keys()].map((y) =>
                            [...Array(3).keys()].map((z) => (
                                <Cubelet
                                    key={x + y * 3 + z * 9}
                                    position={[x - 1, y - 1, z - 1]}
                                    geometry={roundedBoxGeometry}
                                    onClick={() => handleCubeletClick([x - 1, y - 1, z - 1])}
                                />
                            ))
                        )
                    )}
                </group>
            )}
        </>
    )
}

function Cubelet({ position, geometry, onClick }) {

    return (
        <mesh position={position} geometry={geometry} onClick={onClick}>
            {[...Array(6).keys()].map((i) => (
                <meshStandardMaterial key={i} attach={`material-${i}`} />
            ))}
        </mesh>
    )
}

function RubikCube() {
    return (
        <>
            {/* <img style={{width:"500px", height:"500px"}} src="/public/assets/cam.jpg" alt="" /> */}
            <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [3, 3, 3] }}>
                <ambientLight intensity={1} />
                <color attach="background" args={['#818589']} />
                {/* <color attach="background" args={['#ffffff']} /> */}
                <Suspense>
                    <Environment preset="forest" />
                </Suspense>
                <Cube />
                <OrbitControls target={[0, 0, 0]} />
                {/* <ContactShadows frames={1} position={[0, -0.5, 0]}  color="orange" /> */}
                <Stats />
            </Canvas>
        </>
    )
}

export default RubikCube