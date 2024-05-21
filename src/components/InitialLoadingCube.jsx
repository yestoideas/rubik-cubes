
// ... (rest of the code remains the same)

/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Box, Environment, OrbitControls, Stats } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import TWEEN from '@tweenjs/tween.js'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

function Cube({ setStep }) {
    const ref = useRef();
    const roundedBoxGeometry = useMemo(() => {
        return new RoundedBoxGeometry(1, 1, 1, 1, 0.05)
    }, []);

    const [animationStep, setAnimationStep] = useState(0); // 0: initial, 1: separated, 2: reposition, 3: zoom in, 4: merged

    useEffect(() => {
        const animationInterval = setInterval(() => {
            setAnimationStep((prevStep) => (prevStep + 1) % 4);
        }, 700); // Change this value to adjust the animation speed

        return () => clearInterval(animationInterval);
    }, []);

    useFrame(() => {
        TWEEN.update()

        // Separate cubes
        if (animationStep === 1) {
            ref.current.children.forEach((child, index) => {
                const x = (index % 3) - 1;
                const y = Math.floor((index / 3) % 3) - 1;
                const z = Math.floor(index / 9) - 1;

                const position = new THREE.Vector3(x * 2, y * 2, z * 2);
                new TWEEN.Tween(child.position)
                    .to({ x: position.x, y: position.y, z: position.z }, 1000)
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start();
            });
        }

        // Zoom in
        if (animationStep === 2) {
            ref.current.children.forEach((child) => {
                new TWEEN.Tween(child.scale)
                    .to({ x: 0.5, y: 0.5, z: 0.5 }, 1000)
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start();
            });
        }

        // Merge cubes
        if (animationStep === 3) {
            ref.current.children.forEach((child, index) => {
                const x = (index % 3) - 1;
                const y = Math.floor((index / 3) % 3) - 1;
                const z = Math.floor(index / 9) - 1;

                const position = new THREE.Vector3(x, y, z);
                new TWEEN.Tween(child.position)
                    .to({ x: position.x, y: position.y, z: position.z }, 1000)
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start();

                new TWEEN.Tween(child.scale)
                    .to({ x: 1, y: 1, z: 1 }, 1000)
                    .easing(TWEEN.Easing.Cubic.Out)
                    .start();
            });
        }
    });

    return (
        <>
            <group ref={ref}>
                {[...Array(3).keys()].map((x, i) =>
                    [...Array(3).keys()].map((y, j) =>
                        [...Array(3).keys()].map((z, k) => (
                            <Cubelet
                                key={x + y * 3 + z * 9}
                                position={[x - 1, y - 1, z - 1]}
                                geometry={roundedBoxGeometry}
                            />
                        ))
                    )
                )}
            </group>
        </>
    )
}

function Cubelet({ position, geometry }) {
    return (
        <mesh position={position} geometry={geometry}>
            {[...Array(6).keys()].map((i) => (
                <meshStandardMaterial key={i} attach={`material-${i}`} 
                // color={getFaceColor(i)} 

                />
            ))}
        </mesh>
    )
}


const getFaceColor = (index) => {
    switch (index) {
        case 0: // Front
            return '#9fa2a6';
        case 1: // Back
            return 'white';
        case 2: // Top
            return 'blue';
        case 3: // Bottom
            return 'goldenrod';
        case 4: // Left
            return 'black';
        case 5: // Right
            return 'red';
        default:
            return 'white';
    }
};


///! rest data...... start
function InititalLoadingCube({ setStep }) {
    
    return (
        <Box>
            {/* <Canvas style={{ width: '100vw', height: '100vh' }} orthographic camera={{ position: [2.5, 2, 5], left: -2, right: 2, top: 2, bottom: -2, zoom: 100 }}> */}
            <Canvas style={{ width: '100vw', height: '100vh' }} orthographic camera={{ position: [2.5, 2.5, 2.5], left: -2, right: 2, top: 2, bottom: -2, zoom: 80 }}>
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
            </Canvas>
        </Box>
    )
}

export default InititalLoadingCube;


