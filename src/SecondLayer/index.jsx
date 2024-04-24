import { Stack } from "@mui/material";



const SecondLayerLayout = () => {
    return (
        <>
            <Stack direction={'row'} sx={{bgcolor:'green', height: '100%'}}>
                {/* left side */}
                <Stack
                sx={{
                    bgcolor: 'red', 
                    height: '100%', 
                    width: '60%',
                    p: 3,
                    }}
                >f
                
                </Stack>



                {/* right side */}
                <Stack
                sx={{
                    bgcolor: 'yellowgreen', 
                    height: '100%', 
                    width: '40%',
                    p: 3,
                    }}
                >f
                
                </Stack>
            </Stack>
        </>
    );
};

export default SecondLayerLayout;