import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createRef, useEffect, useRef, useState } from 'react';
import { red, teal } from '@mui/material/colors';
import { cubeBgColors } from '../utils/cubeColors';


const useStyles = makeStyles({
    container: {
        display: 'flex !important',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    board: {
        // width: '336px',
        // padding: '4px',
        // backgroundColor: "white",
        maxWidth: '768px', 
        width: '100%',
    },
    box: {
        cursor: 'pointer',
        color: "black",
        alignItems: 'center',
        textAlign: 'center'
        // backgroundColor: 'gray',
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

// const cubeArr = [

// ]

const cubeObj = [
    { title: 'Energy', value: -8 },
    { title: 'Materials', value: -5 },
    { title: 'Industrials', value: -3 },
    { title: 'Consumer Discretionar', value: -2 },
    { title: 'Consumer Staples', value: -1 },
    { title: 'Health Care', value: 2 },
    { title: 'Financials', value: 0 },
    { title: 'Information Technolog', value: 3 },
    { title: 'Communication Service', value: 1 },
    { title: 'Utilities', value: -4 },
    { title: 'Real Estate', value: 1 }
]










const getBackgroundColor = (value) => {
    const redValues = ['#FFDADA', '#FFBBBB', '#FF8B8B', '#FF4949', '#FF1111', '#FF0000', '#E70000', '#800000'];
    const greenValues = ['#DFFBCC', '#C0F89E', '#96F066', '#72E338', '#4CBB17', '#3CA10F', '#2F7A11', '#296113'];

    if (value === 0) {
        return '#ffffff';
    } else if (value < 0) {
        return redValues[Math.abs(value) - 1];
    } else {
        return greenValues[value - 1];
    }
    // const isDark = value < 0;
    // const density = Math.abs(value) * 100;
    // // const color = isDark ? 'red' : 'green';
    // const bgcolor = isDark ? red[density] : teal[density];
    // return bgcolor;
};


const SecondLayer = ({ setStep, setActiveValues }) => {
    const classes = useStyles();
    const [nextLayer, setNextLayer] = useState(true);
    const [boxHeight, setBoxHeight] = useState(80);

    const handleClick = (payload) => {
        setActiveValues(payload);
        setStep('thirdLayer')
    };

    const getBackHandler = () => {
        setStep('firstLayer')
    }

    const boxRefs = useRef([]);

    useEffect(() => {
      const widths = boxRefs.current.map((ref) => ref.current.getBoundingClientRect().width);
      const maxBoxWidth = Math.max(...widths);
      console.log(maxBoxWidth)
    //   setMaxWidth(maxBoxWidth);
    }, []);

    return (
        <Container className={classes.container}>
            <Box>
                <IconButton onClick={getBackHandler} sx={{ bgcolor: 'gray !important', color: '#ffffff' }}><ArrowBackIcon /> </IconButton>
                <Box className={classes.board} mt={3}>
                    <Grid container spacing={2}>
                        {cubeObj.map((item, index) => {
                            boxRefs.current[index] = boxRefs.current[index] || createRef();
                            return (
                            <Grid key={index} item xs={3}>
                                <Stack
                                    ref={boxRefs.current[index]}
                                    onClick={() => handleClick(item)}
                                    className={classes.box}
                                    sx={{
                                        background: getBackgroundColor(item.value),
                                        height: boxHeight, minWidth: 80,
                                        width: '100%',
                                        p: 0.5,
                                        display: 'flex',
                                        borderRadius: 2,
                                    }}
                                    alignItems="center"
                                    justifyContent={"center"}
                                >
                                    <Typography variant='body2'>{item.title}</Typography>
                                </Stack>
                            </Grid>
                        )})}
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SecondLayer