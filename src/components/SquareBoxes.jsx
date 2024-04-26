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
        // gridTemplateColumns: 'auto auto auto',
        gridTemplateColumns: 'auto auto auto auto auto auto',
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
    // 1
    {text: 'XC1',},
    {text: 'XB1',},
    {text: 'XA1',},
    {text: 'YC1',},
    {text: 'YB1',},
    {text: 'YA1',},
    {text: 'ZC1',},
    {text: 'ZB1',},
    {text: 'ZA1',},

    // 2
    {text: 'XC2',},
    {text: 'XB2',},
    {text: 'XA2',},
    {text: 'YC2',},
    {text: 'YB2',},
    {text: 'YA2',},
    {text: 'ZC2',},
    {text: 'ZB2',},
    {text: 'ZA2',},

    // 2
    {text: 'XC3',},
    {text: 'XB3',},
    {text: 'XA3',},
    {text: 'YC3',},
    {text: 'YB3',},
    {text: 'YA3',},
    {text: 'ZC3',},
    {text: 'ZB3',},
    {text: 'ZA3',},
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