import { Environment, OrbitControls, Stats } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import TWEEN from '@tweenjs/tween.js'
// import { button, useControls } from 'leva'
import React, { Suspense, useMemo, useRef, useState } from 'react'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

function Buttons({ cubeGroup }) {
    const rotationGroup = useRef()

    // useControls('Cube', {
    //     'Left CW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'x', -0.5, 1)
    //     }),
    //     'Left CCW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'x', -0.5, -1)
    //     }),
    //     'Right CW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'x', 0.5, -1)
    //     }),
    //     'Right CCW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'x', 0.5, 1)
    //     }),
    //     'Back CW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'z', -0.5, 1)
    //     }),
    //     'Back CCW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'z', -0.5, -1)
    //     }),
    //     'Front CW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'z', 0.5, -1)
    //     }),
    //     'Front CCW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'z', 0.5, 1)
    //     }),
    //     'Top CW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'y', 0.5, -1)
    //     }),
    //     'Top CCW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'y', 0.5, 1)
    //     }),
    //     'Bottom CW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'y', -0.5, 1)
    //     }),
    //     'Bottom CCW': button(() => {
    //         rotate(cubeGroup.current, rotationGroup.current, 'y', -0.5, -1)
    //     })
    // })

    return (
        <>
            <group ref={rotationGroup} />
        </>
    )
}

function Cube() {
    const ref = useRef();
    const [selectedCubelet, setSelectedCubelet] = useState(null);

    console.log(selectedCubelet)

    const roundedBoxGeometry = useMemo(() => {
        return new RoundedBoxGeometry(1, 1, 1, 1, 0.02)
    }, [])

    useFrame(() => {
        TWEEN.update()
    })

    return (
        <>
            <group ref={ref}>
                {[...Array(3).keys()].map((x) =>
                    [...Array(3).keys()].map((y) =>
                        [...Array(3).keys()].map((z) => (
                            <Cubelet key={x + y * 3 + z * 9} position={[x - 1, y - 1, z - 1]} geometry={roundedBoxGeometry} selectedCubelet={selectedCubelet} setSelectedCubelet={setSelectedCubelet} cubeletPosition={[x, y, z]} />
                        ))
                    )
                )}
            </group>
            <Buttons cubeGroup={ref} />
        </>
    )
}

// const colorSides = [
//     [0, 1, 'darkorange'],
//     [0, -1, 'whitesmoke'],
//     [1, 1, 'skyblue'],
//     [1, -1, 'yellow'],
//     [2, 1, 'green'],
//     [2, -1, 'blue']
// ]

function Cubelet({ position, geometry, selectedCubelet, setSelectedCubelet, cubeletPosition }) {
    const isSelected = selectedCubelet && selectedCubelet.join() === cubeletPosition.join();

    const handleClick = () => {
        setSelectedCubelet(isSelected ? null : cubeletPosition);
    };
console.log(isSelected)
    return (
        <>
            <mesh onClick={handleClick} position={position} geometry={geometry} scale={isSelected ? 5 : 1}>
                {[...Array(6).keys()].map((i) => (
                    <meshStandardMaterial
                        key={i}
                        attach={`material-${i}`}
                        // color={position[colorSides[i][0]] === colorSides[i][1] ? colorSides[i][2] : `black`}
                    />
                ))}
            </mesh>
        </>
    )
}

function resetCubeGroup(cubeGroup, rotationGroup) {
    rotationGroup.children
        .slice()
        .reverse()
        .forEach(function (c) {
            cubeGroup.attach(c)
        })
    rotationGroup.quaternion.set(0, 0, 0, 1)
}

function attachToRotationGroup(cubeGroup, rotationGroup, axis, limit) {
    cubeGroup.children
        .slice()
        .reverse()
        .filter(function (c) {
            return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit
        })
        .forEach(function (c) {
            rotationGroup.attach(c)
        })
}

function animateRotationGroup(rotationGroup, axis, multiplier) {
    new TWEEN.Tween(rotationGroup.rotation)
        .to(
            {
                [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier
            },
            250
        )
        .easing(TWEEN.Easing.Cubic.InOut)
        .start()
}

function rotate(cubeGroup, rotationGroup, axis, limit, multiplier) {
    if (!TWEEN.getAll().length) {
        resetCubeGroup(cubeGroup, rotationGroup)
        attachToRotationGroup(cubeGroup, rotationGroup, axis, limit)
        animateRotationGroup(rotationGroup, axis, multiplier)
    }
}

function RubikCube() {
    return (
        <Canvas style={{width:"100vw", height:"100vh"}} camera={{ position: [3, 3, 3] }}>
            <Suspense>
                <Environment preset="forest" />
            </Suspense>
            <Cube />
            <OrbitControls target={[0, 0, 0]} />
            <Stats />
        </Canvas>
    )
}

export default RubikCube;