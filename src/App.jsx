import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import SecondLayerLayout from "./SecondLayer";
import InititalLoadingCube from "./components/InitialLoadingCube";


const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState('first');
    const [activeValues, setActiveValues] = useState({});

    useEffect(() => {
        setIsLoading(true);

        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div style={{ height: "100%", width: '100%' }}>
            {step === "first" && <SecondLayerLayout activeValues={activeValues} />}
            <Box sx={{ position: 'absolute', left: '0', top: '0', height: '100%', width: '100%', transition: 'all 2s ease-in-out', visibility: isLoading ? 'visible' : 'hidden', zIndex: 1000 }}><InititalLoadingCube /></Box>
        </div>
    );
};

export default App;