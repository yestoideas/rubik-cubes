import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import RubikCube from "./Cube";
import Scene from "./cubeFlow/Scene";
import Single2DCube from "./NewSingleFlow/Single2DCube";
import SecondLayer from "./SecondLayer/SecondLayer";
import ThirdLayer from "./ThirdLayer/ThirdLayer";
import InititalLoadingCube from "./components/InitialLoadingCube";
import { Box } from "@mui/material";
import SecondLayerLayout from "./SecondLayer";


const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState('firstLayer');
    // const [step, setStep] = useState('thirdLayer');
    const [activeValues, setActiveValues] = useState({});

    useEffect(() => {
        setIsLoading(true);
        // if(!isLoading) return;
        console.log('first')
        const timeout = setTimeout(() => {
            setIsLoading(false);
            console.log('second');
            setStep('thirdLayer');
        }, 5000);

        console.log('third')
        return () => clearTimeout(timeout);
    }, []);

    console.log("setup stepppp...", step)

    // return (
    //     <div style={{ height: "100%", width: '100%' }}>
    //         {/* {isLoading ? <InititalLoadingCube /> : */}
    //         <>
    //             {step === 'firstLayer' && !isLoading ? <RubikCube setStep={setStep} /> : <InititalLoadingCube />}
    //             {/* {step === 'firstLayer' && <RubikCube setStep={setStep} />} */}
    //             {/* <Single2DCube /> */}
    //             {step === 'secondtLayer' && <SecondLayer setStep={setStep} activeValues={activeValues} setActiveValues={setActiveValues} />}
    //             {step === 'thirdLayer' && <ThirdLayer setStep={setStep} activeValues={activeValues} setActiveValues={setActiveValues} />}
    //             {/* <ThirdLayer /> */}
    //         </>
    //         {/* } */}
    //     </div>
    // );

    //? second update
    // return (
    //     <div style={{ height: "100%", width: '100%' }}>
    //       {isLoading ? (
    //         <InititalLoadingCube />
    //       ) : (
    //         <>
    //           {step === 'firstLayer' && <RubikCube setStep={setStep} />}
    //           {step === 'secondtLayer' && (
    //             <SecondLayer
    //               setStep={setStep}
    //               activeValues={activeValues}
    //               setActiveValues={setActiveValues}
    //             />
    //           )}
    //           {step === 'thirdLayer' && (
    //             <ThirdLayer
    //               setStep={setStep}
    //               activeValues={activeValues}
    //               setActiveValues={setActiveValues}
    //             />
    //           )}
    //           {/* Render a fallback component or message if step doesn't match any condition */}
    //           {step !== 'firstLayer' &&
    //             step !== 'secondtLayer' &&
    //             step !== 'thirdLayer' && <div>Invalid step value</div>}
    //         </>
    //       )}
    //     </div>
    //   );

    //? third update
    // return (
    //     <div style={{ height: "100%", width: '100%' }}>
    //       {isLoading ? (
    //         <Box sx={{visibility: !isLoading && 'hidden', transition:'all 0.5s ease-in-out'}}><InititalLoadingCube /></Box>
    //       ) : (
    //         <>
    //           {step === 'firstLayer' && <RubikCube setStep={setStep} />}
    //           {/* Render SecondLayer only when the step is explicitly set to 'secondtLayer' */}
    //           {step === 'secondtLayer' && (
    //             <SecondLayer
    //               setStep={setStep}
    //               activeValues={activeValues}
    //               setActiveValues={setActiveValues}
    //             />
    //           )}
    //           {step === 'thirdLayer' && (
    //             <ThirdLayer
    //               setStep={setStep}
    //               activeValues={activeValues}
    //               setActiveValues={setActiveValues}
    //             />
    //           )}
    //           {/* Render a fallback component or message if step doesn't match any condition */}
    //           {step !== 'firstLayer' &&
    //             step !== 'secondtLayer' &&
    //             step !== 'thirdLayer' && <div>Invalid step value</div>}
    //         </>
    //       )}
    //     </div>
    //   );

    //? fourth 


    return (
        <div style={{ height: "100%", width: '100%' }}>
            <Box sx={{ position: 'absolute', left: '0', top: '0', height: '100%', width: '100%', transition: 'all 2s ease-in-out', visibility: isLoading ? 'visible' : 'hidden', zIndex: 1000 }}><InititalLoadingCube /></Box>
            <>
                {step === 'firstLayer' && <RubikCube setStep={setStep} setIsLoading={setIsLoading}  />}
                {step === 'secondtLayer' && (
                    <SecondLayerLayout activeValues={activeValues}  />
                )}
                {/* <SecondLayer
                  setStep={setStep}
                  activeValues={activeValues}
                  setActiveValues={setActiveValues}
                /> */}
                {step === 'thirdLayer' && (
                    <ThirdLayer
                        setStep={setStep}
                        activeValues={activeValues}
                        setActiveValues={setActiveValues}
                    />
                )}
                {step !== 'firstLayer' &&
                    step !== 'secondtLayer' &&
                    step !== 'thirdLayer' && <div>Invalid step value</div>}
            </>
        </div>
    );
};

export default App;