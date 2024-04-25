/* eslint-disable react/prop-types */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { cubeBgColors } from '../utils/cubeColors';

const useStyles = makeStyles({
    container: {
        display: 'flex !important',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },

    boxContainer: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gap: '2.5rem',
        justifyContent: 'center',
    },
    box: {
        cursor: 'pointer',
        color: "black",
        width: '100px',
        height: '100px',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '4px 5px 5px grey',
        borderRadius: '8px',
    }
});



const distributedCubeData = [
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
]

const SquareBoxes = ({ setActiveValues, onClickLabel, setStep, activeValues }) => {
    const classes = useStyles();
    const [nextLayer, setNextLayer] = useState(true);

    const handleClick = (payload) => {
        onClickLabel(payload);
    };

    console.log('active valued from third layers', activeValues)



    const getBackHandler = () => {
        setStep('secondtLayer')
    }

    return (
        <Box>
            {/* <IconButton onClick={getBackHandler}  sx={{ bgcolor: 'gray !important', color: '#ffffff' }}><ArrowBackIcon /> </IconButton> */}
            <Box className={classes.board} mt={3}>
                <Box direction={"row"} spacing={3} className={classes.boxContainer} >
                    {distributedCubeData.map((item, index) => (
                        <Box key={index}>
                            <Stack
                                onClick={() => handleClick(item)}
                                className={classes.box}
                                sx={{
                                    //   background: `radial-gradient(circle, hsla(313, 39%, 93%, 1) 0%, ${cubeBgColors[index]?.color} 0%, hsla(193, 81%, 84%, 1) 100%)`,
                                    background: `${cubeBgColors[index]?.color}`,
                                }}
                                alignItems="center"
                                justifyContent={"center"}
                            >
                                <Typography fontWeight={600} > {item.text} </Typography>
                            </Stack>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default SquareBoxes;