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
    const textCanvas = document.createElement('canvas');
    const contextCanvas = textCanvas.getContext('2d');
    const x = textCanvas.width / 2;
    const y = textCanvas.height / 2;
    contextCanvas.fillRect(0, 0, 600, 600);
    contextCanvas.fillStyle = "white";
    contextCanvas.font = 'bold 20px Arial';
    contextCanvas.strokeStyle = '#ffffff';
    contextCanvas.textAlign = 'center';
    contextCanvas.shadowColor = '#ffffff';
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


    const loaders = new THREE.TextureLoader();
    const _img_texture = loaders.load('/public/assets/cam.jpg');
    // const cubeMaterial = new THREE.MeshStandardMaterial({ map: _img_texture });
    // console.log(texture)

    // const _imgLoader = useLoader(TextureLoader, '/public/assets/cam.jpg');


    const textRef = useRef();

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

function Cube({setStep}) {
    const ref = useRef();
    const roundedBoxGeometry = useMemo(() => {
        return new RoundedBoxGeometry(1, 1, 1, 1, 0.05)
    }, [])

    const [showSingleCube, setShowSingleCube] = useState(false)
    const [singleCubePosition, setSingleCubePosition] = useState([0, 0, 0])

    const [dbClickTimer, setDbClickTimer] = useState(null);

    const handleCubeletClick = (position) => {
        if (dbClickTimer) {
            clearTimeout(dbClickTimer);
            setDbClickTimer(null);

            // setShowSingleCube(!showSingleCube);
            setSingleCubePosition(position);

            setStep('secondtLayer');
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

function RubikCube({setStep}) {
    return (
        <>
            {/* <img style={{width:"500px", height:"500px"}} src="/public/assets/cam.jpg" alt="" /> */}
            <Canvas style={{ width: '100vw', height: '100vh' }} camera={{ position: [3, 3, 3] }}>
                <ambientLight intensity={0.5} />
                <color attach="background" args={['#818589']} />
                {/* <color attach="background" args={['#ffffff']} /> */}
                <Suspense>
                    <Environment preset="forest" />
                </Suspense>
                <Cube setStep={setStep} />
                <OrbitControls target={[0, 0, 0]} />
                {/* <ContactShadows frames={1} position={[0, -0.5, 0]}  color="orange" /> */}
                <Stats />
            </Canvas>
        </>
    )
}

export default RubikCube