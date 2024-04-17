import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import RubikCube from "./Cube";
import Scene from "./cubeFlow/Scene";
import Single2DCube from "./NewSingleFlow/Single2DCube";
import SecondLayer from "./SecondLayer/SecondLayer";
import ThirdLayer from "./ThirdLayer/ThirdLayer";
import InititalLoadingCube from "./components/InitialLoadingCube";



// const Cube = () => {

//     const cubeRef = useRef();

//     useFrame((state, delta) => {
//         cubeRef.current.rotation.y += delta;
//     })


//     return (
//         <mesh ref={cubeRef}>
//             <OrbitControls />
//             <ambientLight />
//             <boxGeometry />
//             <meshStandardMaterial color="green" />
//         </mesh>
//     )
// }



const App = () => {
    const [step, setStep] = useState('firstLayer');
    const [activeValues, setActiveValues] = useState({});

    console.log(step)

    return (
        <div style={{height:"100%", width: '100%'}}>
            {/* {step === 'firstLayer' && <RubikCube setStep={setStep} />} */}
            {step === 'firstLayer' && <InititalLoadingCube setStep={setStep} />}
            {/* <Single2DCube /> */}
            {step === 'secondtLayer' && <SecondLayer setStep={setStep} activeValues={activeValues} setActiveValues={setActiveValues} />}
            {step === 'thirdLayer' && <ThirdLayer setStep={setStep} activeValues={activeValues} setActiveValues={setActiveValues} />}
            {/* <ThirdLayer /> */}
        </div>
    );
};

export default App;