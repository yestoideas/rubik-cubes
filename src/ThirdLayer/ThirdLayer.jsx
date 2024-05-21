/* eslint-disable react/prop-types */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, Grid, IconButton, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
// import { cubeBgColors } from '../utils/cubeColors';

const useStyles = makeStyles({
    container: {
        display: 'flex !important',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    board: {
        width: '336px', 
        padding: '4px',
        backgroundColor: "white", 
    },
    box: {
        cursor: 'pointer',
        color: "black",
        width: '80px',
        height: '80px',
        alignItems: 'center',
        backgroundColor: 'gray',
    }
})
const secondArr = [
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'US', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'UK', },
    { value: 'UK', },
];



const ThirdLayer = ({ setActiveValues, setStep, activeValues }) => {
    const classes = useStyles();
    const [nextLayer, setNextLayer] = useState(true);

    const handleClick = (payload) => {
        console.log(payload)
        // setActiveValues(payload)
        // setStep('thirdLayer')
    };

    console.log('active valued from third layers', activeValues)

    const getBackHandler = () =>{
        setStep('secondtLayer')
    }

    return (
        <Container className={classes.container}>
            <Box>
                <IconButton onClick={getBackHandler}  sx={{ bgcolor: 'gray !important', color: '#ffffff' }}><ArrowBackIcon /> </IconButton>
                <Box className={classes.board} mt={3}>
                    <Grid container spacing={0.5}>
                        {activeValues?.overviews?.map((item, index) => (
                            <Grid key={index} item xs={3}>
                                <Stack
                                    onClick={() => handleClick(item)}
                                    className={classes.box}
                                    sx={{
                                        //   background: `radial-gradient(circle, hsla(313, 39%, 93%, 1) 0%, ${cubeBgColors[index]?.color} 0%, hsla(193, 81%, 84%, 1) 100%)`,
                                        // background: `${cubeBgColors[index]?.color}`,
                                    }}
                                    alignItems="center"
                                    justifyContent={"center"}
                                >
                                    {/* {item.value + '+' + activeValues.value} */}
                                    {item.title}
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default ThirdLayer