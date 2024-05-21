

/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Box, Environment, OrbitControls, Stats, Text } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import TWEEN from '@tweenjs/tween.js'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'


function Cube({ setStep, setIsLoading }) {
    const ref = useRef();
    const roundedBoxGeometry = useMemo(() => {
        return new RoundedBoxGeometry(1, 1, 1, 1, 0.05)
    }, []);

    const [dbClickTimer, setDbClickTimer] = useState(null);

    const handlePointerEnter = () => {
        setStep('secondtLayer');
        setIsLoading(true);
    }

    const handleCubeletClick = (first, position, exactPosition) => {
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
                                // onPointerEnter={handlePointerEnter}
                                onClick={() => handleCubeletClick([x - 1, y - 1, z - 1], [x, y, z])}
                            />
                        ))
                    )
                )}
            </group>
        </>
    )
}

function Cubelet({ position, geometry, onPointerEnter, onClick, indexes, positionss }) {
console.log(position)

    return (

        <mesh position={position} geometry={geometry} onPointerEnter={onPointerEnter} onClick={onClick} scale={[1, 1, 1]}>
            {[...Array(6).keys()].map((i) => (
                <>

                {/* <meshStandardMaterial key={i} attach={`material-${i}`} /> */}
                </>
            ))}
        </mesh>
    )
}


const cubeData = [
    // Front side data
    {
        text: 'XC1',
        anchorX: 'center',
        position: [-1, 1, 1.53],
        rotation: [0, 0, 0],
    },
    {
        text: 'XB1',
        anchorX: 'center',
        position: [-1, 0, 1.53],
        rotation: [0, 0, 0],
    },
    {
        text: 'XA1',
        anchorX: 'center',
        position: [-1, -1, 1.53],
        rotation: [0, 0, 0],
    },

    {
        text: 'YC1',
        anchorX: 'center',
        position: [0, 1, 1.53],
        rotation: [0, 0, 0],
    },
    {
        text: 'YB1',
        anchorX: 'center',
        position: [0, 0, 1.53],
        rotation: [0, 0, 0],
    },
    {
        text: 'YA1',
        anchorX: 'center',
        position: [0, -1, 1.53],
        rotation: [0, 0, 0],
    },

    {
        text: 'ZC1',
        anchorX: 'center',
        position: [1, 1, 1.53],
        rotation: [0, 0, 0],
    },
    {
        text: 'ZB1',
        anchorX: 'center',
        position: [1, 0, 1.53],
        rotation: [0, 0, 0],
    },

    {
        text: 'ZA1',
        anchorX: 'center',
        position: [1, -1, 1.53],
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


function RubikCube({ setStep, setIsLoading }) {
    return (
        <>
            <Canvas style={{ width: '100%', height: '100vh' }} orthographic camera={{ position: [2.5, 2, 5], left: -2, right: 2, top: 2, bottom: -2, zoom: 100 }}>
                <ambientLight intensity={0.005} />
                <color attach="background" args={['#818589']} />
                <Suspense>
                    <Environment preset="sunset" />
                </Suspense>
                <Cube setStep={setStep} setIsLoading={setIsLoading} />
                <OrbitControls target={[0, 0, 0]} />
                <Stats />
                <Box />
                <meshStandardMaterial color="white" />
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
            fontSize={0.13}
            fontWeight={800}
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
