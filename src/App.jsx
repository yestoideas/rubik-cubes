import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import RubikCube from "./Cube";



const Cube = () => {

    const cubeRef = useRef();

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta;
    })


    return (
        <mesh ref={cubeRef}>
            <OrbitControls />
            <ambientLight />
            <boxGeometry />
            <meshStandardMaterial color="green" />
        </mesh>
    )
}



const App = () => {


    // <Canvas>
    //     <Cube />
    // </Canvas>
    return (
        <div style={{height:"100%"}}>
            <RubikCube />
        </div>
    );
};

export default App;